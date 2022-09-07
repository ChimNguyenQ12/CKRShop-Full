import { Router } from '@angular/router';
import { ApiService } from '../../../Services-Admin/services-image-type/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatToolbar } from '@angular/material/toolbar';
import { ImageTypeDialogComponent } from './image-type-dialog/image-type-dialog.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-image-types',
  templateUrl: './image-types.component.html',
  styleUrls: ['./image-types.component.scss']
})
export class ImageTypesComponent implements OnInit {
  title = 'Material';
  product: any[] = [];
  displayedColumns: string[] = ['typeName', 'status', 'createdAt', 'action'];
  dataSource!: MatTableDataSource<any>;
  public response!: { dbPath: '' };
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog, private api: ApiService, private router: Router) {
  }
  openDialog() {
    this.dialog.open(ImageTypeDialogComponent, {
      width: "30%",
      position: {
        top: '8%',
        left: '40%'
      }
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.getAllImageTypes();
        this.getAllImageTypes();

      }
    });
  }
  showErrorAlert() {
    Swal.fire('Waiting...', 'Something Went Wrong!', 'error')
  }
  showSuccessAlert() {
    Swal.fire('Successful!', 'Image Type Deleted Successfully!', 'success')
  }
  ConfirmDelete(id) {
    Swal.fire({
      title: 'Are You Sure?',
      text: 'You will not be able to recover this Image Type !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete Image Type !',
      cancelButtonText: 'No, Keep Image Type ',
    }).then((result) => {

      if (result.isConfirmed) {

        this.api.deleteImageType(id)
          .subscribe({
            next: (res) => {
              this.getAllImageTypes();
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
    this.getAllImageTypes();

  }
  getAllImageTypes() {
    this.api.getAllImageTypes().subscribe({
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
    this.getAllImageTypes();
  }
  editImageType(row: any) {
    this.dialog.open(ImageTypeDialogComponent, {
      width: '30%',
      data: row,
      position: {
        top: '8%',
        left: '40%'
      }
    }).afterClosed().subscribe(val => {
      if (val == 'update') {
        this.getAllImageTypes();
      }
    })
  }
  deleteImageType(id: string) {
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



