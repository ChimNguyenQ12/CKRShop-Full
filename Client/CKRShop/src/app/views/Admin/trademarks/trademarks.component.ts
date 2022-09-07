import { Router } from '@angular/router';
import { ApiService } from './../../../Services-Admin/services-trademark/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatToolbar } from '@angular/material/toolbar';
import { TrademarkDialogComponent } from './trademark-dialog/trademark-dialog.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-trademarks',
  templateUrl: './trademarks.component.html',
  styleUrls: ['./trademarks.component.scss']
})
export class TrademarksComponent implements OnInit {
  title = 'Material';
  trademark: any[] = [];
  category: any[] = [];
  displayedColumns: string[] = ['name', 'productTypeId', 'status', 'createdAt', 'action'];
  dataSource!: MatTableDataSource<any>;
  public response!: { dbPath: '' };
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog, private api: ApiService, private router: Router) {
  }
  openDialog() {
    this.dialog.open(TrademarkDialogComponent, {
      width: "30%",
      position: {
        top: '8%',
        left: '40%'
      }
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.getAllTrademarks();
        this.getAllProductTypes();
      }
    });
  }
  showErrorAlert() {
    Swal.fire('Waiting...', 'Something Went Wrong!', 'error')
  }
  showSuccessAlert() {
    Swal.fire('Successful!', 'Trademark Deleted Successfully!', 'success')
  }
  ConfirmDelete(id) {
    Swal.fire({
      title: 'Are You Sure?',
      text: 'You will not be able to recover this Trademark!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete Trademark!',
      cancelButtonText: 'No, Keep Trademark',
    }).then((result) => {

      if (result.isConfirmed) {

        this.api.deleteTrademark(id)
          .subscribe({
            next: (res) => {
              this.getAllTrademarks();
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

    this.getAllProductTypes();
    this.getAllProductTypes();
    this.getAllProductTypes();
    this.getAllTrademarks();

  }
  getAllTrademarks() {
    this.api.getAllTrademarks().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.trademark = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getAllProductTypes();

      },
      error: (err) => {
        this.showErrorAlert();
      }
    })
  }
  getAllProductTypes() {
    this.api.getAllCategories().subscribe({
      next: (res) => {
        this.category = res;
        for (let a of this.category) {
          for (let b of this.trademark) {
            if (a.id == b.productTypeId)
              b.category = a.name;
          }
        }
      },
      error: (err) => {
        this.showErrorAlert();
      }
    })
  }
  refreshForm() {
    this.getAllTrademarks();
    this.getAllProductTypes();
  }
  editTrademark(row: any) {
    this.dialog.open(TrademarkDialogComponent, {
      width: '30%',
      data: row,
      position: {
        top: '8%',
        left: '40%'
      }
    }).afterClosed().subscribe(val => {
      if (val == 'update') {
        this.getAllTrademarks();
        this.getAllProductTypes();
      }
    })
  }
  deleteTrademark(id: string) {
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



