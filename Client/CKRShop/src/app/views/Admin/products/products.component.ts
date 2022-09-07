import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services-Admin/services-product/api.service';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],

})
export class ProductsComponent implements OnInit {
  productTypeId: any;
  trademark: any;
  price: any;
  stock: any;
  ProductTypeIdValue: string;
  ListTrademark: any[] = [];
  title = 'Material';
  product: any[] = [];
  productType: any[] = [];
  displayedColumns: string[] = ['image', 'sku', 'name', 'branch', 'stock', 'price', 'productTypeId', 'createdAt', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;
  public response!: { dbPath: '' };
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog, private api: ApiService, private router: Router) {
  }
  openDialog() {
    this.dialog.open(ProductDialogComponent, {
      width: "30%",
      position: {
        top: '8%',
        left: '40%'
      }
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.getAllProducts();
        this.getAllProductTypes();

      }
    });
  }
  showSuccessAlert() {
    Swal.fire('Successful!', 'Product Deleted Successfully!', 'success')
  }
  showErrorAlert() {
    Swal.fire('Waiting...', 'Something Went Wrong!', 'error')
  }
  ConfirmDelete(id) {
    Swal.fire({
      title: 'Are You Sure?',
      text: 'This product will not appear on the client side!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete Product!',
      cancelButtonText: 'No, Keep Product',
    }).then((result) => {

      if (result.isConfirmed) {

        this.api.deleteProduct(id)
          .subscribe({
            next: (res) => {
              this.getAllProducts();
            },
            error: (err) => {
              this.showErrorAlert();
            }
          })
        this.showSuccessAlert();

      } else if (result.isDismissed) {
        console.log('Product is safe!');
      }
    })

  }
  ngOnInit(): void {
    this.getAllProducts();
    this.getAllProductTypes();
  }

  getAllProducts() {
    this.getAllProductTypes();
    this.getAllProductTypes();

    this.api.getProducts().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.product = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        this.showErrorAlert();
      }
    })
  }
  getAllProductTypes() {
    this.api.getCategories().subscribe({
      next: (res) => {
        this.productType = res;
        // get name category by productId of product
        for (let a of this.productType) {
          for (let b of this.product) {
            if (a.id == b.productTypeId)
              b.productType = a.name;
          }
        }
      },
      error: (err) => {

      }
    })
  }
  search(form: NgForm) {
    this.productTypeId = form.value.productType;
    this.trademark = form.value.trademark;
    this.price = form.value.price;
    this.stock = form.value.stock;
    if (this.productTypeId === "") {
      Swal.fire('Waiting...!', 'You must select the product type!', 'info')
    }
    if (this.trademark === "") {
      Swal.fire('Waiting...!', 'You must select the trademark!', 'info')
    }
    if (this.price === "") {
      Swal.fire('Waiting...!', 'You must enter the price!', 'info')
    }
    if (this.stock === "") {
      Swal.fire('Waiting...!', 'You must enter the stock!', 'info')
    }
    if (this.productTypeId === "" && this.trademark === "" && this.price === "" && this.stock === "") {
      Swal.fire('Waiting...!', 'You must enter the entire text box!', 'info')
    }

    this.api.searchProduct(this.productTypeId, this.trademark, this.price, this.stock).subscribe({
      next: (res) => {
        console.log(res);
        this.getAllProductTypes();
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getAllProductTypes();
      }
      , error: (err) => {

      }
    })
  }
  refreshForm() {
    this.getAllProducts();
    this.getAllProductTypes();
  }
  getValue(deviceValue) {
    this.ProductTypeIdValue = deviceValue.value;
    this.getAllTrademarks();
  }
  getAllTrademarks() {
    console.log(this.ProductTypeIdValue);
    this.api.getAllTrademarks(this.ProductTypeIdValue).subscribe({
      next: (res) => {
        this.ListTrademark = res;
      },
      error: (err) => {

      }
    })
  }
  editProduct(row: any) {
    this.dialog.open(ProductDialogComponent, {
      width: '30%',
      data: row,
      position: {
        top: '8%',
        left: '40%'
      }
    }).afterClosed().subscribe(val => {
      if (val == 'update') {
        this.getAllProducts();
        this.getAllProductTypes();
        this.getAllProductTypes();

      }
    })
  }
  deleteProduct(id: string) {
    this.ConfirmDelete(id);

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public createImgPath = (serverPath: string) => {
    let ImageName = serverPath.replace("C:\\fakepath\\", "");
    if (ImageName == "")
      ImageName = "no_image.jpg";
    return `https://localhost:44302/api/Upload/GetImageProduct?name=${ImageName}`;

  }
}



