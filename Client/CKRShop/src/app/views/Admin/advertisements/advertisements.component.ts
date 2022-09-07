import { ApiService } from '../../../Services-Admin/services-advertisement/api.service';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdvertisementDialogComponent } from './advertisement-dialog/advertisement-dialog.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-Advertisements',
  templateUrl: './Advertisements.component.html',
  styleUrls: ['./Advertisements.component.scss']
})
export class AdvertisementsComponent implements OnInit {
  Category: any;
  title = 'Material';
  AdvertisementType: any[] = [];
  displayedColumns: string[] = ['image', 'imageTypeId', 'status', 'createdAt', 'action'];
  dataSource!: MatTableDataSource<any>;
  public response!: { dbPath: '' };
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog, private api: ApiService, private router: Router) {
  }
  openDialog() {
    this.dialog.open(AdvertisementDialogComponent, {
      width: "30%",
      position: {
        top: '8%',
        left: '40%'
      }
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.getAllAdvertisements();
        this.getAllImageTypes();
        this.getAllImageTypes();
        this.getAllImageTypes();
      }
    });
  }
  showSuccessAlert() {
    Swal.fire('Successful!', 'Image Deleted Successfully!', 'success')
  }
  showErrorAlert() {
    Swal.fire('Waiting...', 'Something Went Wrong!', 'error')
  }
  ConfirmDelete(id) {
    Swal.fire({
      title: 'Are You Sure?',
      text: 'You will not be able to recover this Image!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete Image!',
      cancelButtonText: 'No, Keep Image',
    }).then((result) => {

      if (result.isConfirmed) {
        this.api.deleteAdvertisement(id)
          .subscribe({
            next: (res) => {
              this.getAllAdvertisements();
            },
            error: (err) => {
              this.showErrorAlert();
            }
          })
        this.showSuccessAlert();

      } else if (result.isDismissed) {

        console.log('Advertisement is safe!');

      }
    })

  }
  ngOnInit(): void {
    this.getAllImageTypes();
    this.getAllImageTypes();
    this.getAllAdvertisements();
    this.getAllImageTypes();
    this.getAllImageTypes();
  }

  getAllAdvertisements() {
    this.getAllImageTypes();
    this.getAllImageTypes();
    this.api.getAllAdvertisements().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.AdvertisementType = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        this.showErrorAlert();
      }
    })
  }
  getAllImageTypes() {
    this.api.getAllImageTypes().subscribe({
      next: (res) => {
        this.Category = res;

        for (let a of this.Category) {
          for (let b of this.AdvertisementType) {
            if (a.id == b.imageTypeId) {
              b.AdvertisementType = a.typeName;
            }
          }
        }
      },
      error: (err) => {
        this.showErrorAlert();
      }
    })
  }
  refreshForm() {
    this.getAllAdvertisements();
    this.getAllImageTypes();
  }
  editAdvertisement(row: any) {
    this.dialog.open(AdvertisementDialogComponent, {
      width: '30%',
      data: row,
      position: {
        top: '8%',
        left: '40%'
      }
    }).afterClosed().subscribe(val => {
      if (val == 'update') {
        this.getAllImageTypes();
        this.getAllImageTypes();
        this.getAllAdvertisements();
        this.getAllImageTypes();
        this.getAllImageTypes();
      }
    })
  }
  deleteAdvertisement(id: string) {
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
      ImageName = "1.jpg";
    return `https://localhost:44302/api/Upload/GetImageAdvertisement?name=${ImageName}`;

  }
}



