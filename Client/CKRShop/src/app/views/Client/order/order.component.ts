import { Router } from '@angular/router';
import { ApiService } from '../../../Services-Admin/services-order/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatToolbar } from '@angular/material/toolbar';
import Swal from 'sweetalert2';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  checkListOrder = false;
  checkStatus = false;
  listOrder: any;
  userId: string;
  username: string;
  listUser: any;
  title = 'Material';
  comment: any[] = [];
  user: any[] = [];
  displayedColumns: string[] = ['id', 'code', 'user.userName', 'shippingAddress', 'shippingPhone', 'total', 'issuedDate', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;
  public response!: { dbPath: '' };
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog, private api: ApiService, private router: Router) {
  }

  showErrorAlert() {
    Swal.fire('Waiting...', 'Something Went Wrong!', 'error')
  }
  showSuccessAlert() {
    Swal.fire('Successful!', 'Comment Deleted Successfully!', 'success')
  }

  getAllUsers() {
    this.listUser = false;
    this.checkStatus = false;
    this.api.getAllUsers().subscribe({
      next: (res) => {
        this.listUser = res;
        if (localStorage.getItem("username-client") != null) {
          this.username = localStorage.getItem("username-client")
        }
        else if (localStorage.getItem("username") != null) {
          this.username = localStorage.getItem("username");
        }
        else {
          this.router.navigate(['/'])
        }
        for (let a of this.listUser) {
          if (a.userName == this.username) {
            this.userId = a.id;
            console.log(this.userId);
            this.api.getAllOrdersClient().subscribe({
              next: (res) => {
                for (let b of res) {
                  if (b.userId == a.id) {
                    this.listOrder = res;
                    this.checkListOrder = true;
                    if (this.listUser == null) {
                      this.checkListOrder = false;
                    }
                  }
                }
              },
              error: (err) => {
                this.showErrorAlert();
              }
            })
          }
        }
      }
    })
  }
  ngOnInit(): void {
    this.getAllUsers();
  }
  detailOrder(row: any) {
    this.dialog.open(OrderDialogComponent, {
      width: '30%',
      data: row,
      position: {
        top: '8%',
        left: '35%'
      }
    }).afterClosed().subscribe(val => {
      if (val == 'update') {
        this.getAllUsers();
      }
    })
  }

  refreshForm() {

    this.getAllUsers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}



