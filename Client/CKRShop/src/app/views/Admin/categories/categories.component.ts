import { Router } from '@angular/router';
import { ApiService } from '../../../Services-Admin/services-category/api.service';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  title = 'Material';
  product: any[] = [];
  displayedColumns: string[] = ['name', 'status', 'createdAt', 'action'];
  dataSource!: MatTableDataSource<any>;
  public response!: { dbPath: '' };
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog, private api: ApiService, private router: Router) {
  }
  openDialog() {
    this.dialog.open(CategoryDialogComponent, {
      width: "30%",
      position: {
        top: '8%',
        left: '40%'
      }
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.getAllCategories();
      }
    });
  }
  showErrorAlert() {
    Swal.fire('Waiting...', 'Something Went Wrong!', 'error')
  }
  showSuccessAlert() {
    Swal.fire('Successful!', 'Category Deleted Successfully!', 'success')
  }
  ConfirmDelete(id) {
    Swal.fire({
      title: 'Are You Sure?',
      text: 'You will not be able to recover this Category!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete Category!',
      cancelButtonText: 'No, Keep Category',
    }).then((result) => {

      if (result.isConfirmed) {

        this.api.deleteCategory(id)
          .subscribe({
            next: (res) => {
              this.getAllCategories();
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
    this.getAllCategories();
  }

  getAllCategories() {
    this.api.getAllCategories().subscribe({
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
  refreshForm() {
    this.getAllCategories();
  }
  editProductType(row: any) {
    this.dialog.open(CategoryDialogComponent, {
      width: '30%',
      data: row,
      position: {
        top: '8%',
        left: '40%'
      }
    }).afterClosed().subscribe(val => {
      if (val == 'update') {
        this.getAllCategories();
      }
    })
  }
  deleteProductType(id: string) {
    this.ConfirmDelete(id);

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}



