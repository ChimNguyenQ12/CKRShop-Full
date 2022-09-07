import { ApiService } from 'src/app/Services-Admin/services-product/api.service';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products-trash',
  templateUrl: './products-trash.component.html',
  styleUrls: ['./products-trash.component.scss'],

})
export class ProductTrashComponent implements OnInit {
  description: any;
  image: any;
  sku: any;
  name: any;
  branch: any;
  stock1: any;
  price1: any;
  productTypeId1: any;
  createdAt: any;
  status: any;
  productInfor: any;
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
  showSuccessAlert() {
    Swal.fire('Successful!', 'Product Restored Successfully!', 'success')
  }
  showSuccessDelete() {
    Swal.fire('Successful!', 'Product Deleted Successfully!', 'success')
  }
  showErrorAlert() {
    Swal.fire('Waiting...', 'Something Went Wrong!', 'error')
  }
  showErrorAccessAlert() {
    Swal.fire('Waiting...', 'Please Contact Admin!', 'info')
  }
  ConfirmDelete(id) {
    Swal.fire({
      title: 'Are You Sure?',
      text: 'You will not be able to restore this Product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete Product!',
      cancelButtonText: 'No, Keep Product',
    }).then((result) => {

      if (result.isConfirmed) {

        this.api.deleteProductTrash(id)
          .subscribe({
            next: (res) => {
              this.getAllProductsRemove();
            },
            error: (err) => {
              this.showErrorAccessAlert();
            }
          })
        this.showSuccessDelete();

      } else if (result.isDismissed) {
        console.log('Product is safe!');
      }
    })

  }
  ConfirmRestore(id) {
    Swal.fire({
      title: 'Are You Sure?',
      text: 'This product will be restore!',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes, Restore Product!',
      cancelButtonText: 'No, Keep Product',
    }).then((result) => {
      if (result.isConfirmed) {
        for (let a of this.productInfor) {
          if (a.id == id) {
            this.image = a.image;
            this.name = a.name;
            this.sku = a.sku;
            this.branch = a.branch;
            this.stock = a.stock;
            this.price = a.price;
            this.productTypeId1 = a.productTypeId;
            this.createdAt = a.createdAt;
            this.status = a.status;
            this.description = a.description;
          }
        }
        const credentials = {
          'name': this.name,
          'sku': this.sku,
          'image': this.image,
          'price': this.price,
          'stock': this.stock,
          'productTypeId': this.productTypeId1,
          'status': 1,
          'createdAt': this.createdAt,
          'branch': this.branch,
          'description': this.description
        }
        console.log(this.productInfor);
        this.api.updateProduct(credentials, id)
          .subscribe({
            next: (res) => {
              this.getAllProductsRemove();
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
    this.getAllProductsRemove();
    this.getAllProductTypes();
  }

  getAllProductsRemove() {
    this.getAllProductTypes();
    this.getAllProductTypes();

    this.api.getProductsRemove().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.product = res;
        this.productInfor = res;
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
    this.getAllProductsRemove();
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
  deleteProduct(id: string) {
    this.ConfirmDelete(id);

  }
  restoreProduct(id: string) {
    this.ConfirmRestore(id);

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
      ImageName = "1.jpg";
    return `https://localhost:44302/api/Upload/GetImageProduct?name=${ImageName}`;

  }
}



