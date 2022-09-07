import { Router } from '@angular/router';
import { ApiService } from '../../../Services-Admin/services-order/api.service';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatToolbar } from '@angular/material/toolbar';
import Swal from 'sweetalert2';
import { OrderConfirmedDialogComponent } from './order-confirmed-dialog/order-confirmed-dialog.component';
@Component({
  selector: 'app-orders-confirmed',
  templateUrl: './orders-confirmed.component.html',
  styleUrls: ['./orders-confirmed.component.scss']
})
export class OrdersConfirmedComponent implements OnInit {
  title = 'Material';
  user: any[] = [];
  displayedColumns: string[] = ['id', 'code', 'user.userName', 'shippingAddress', 'shippingPhone', 'total', 'issuedDate', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;
  public response!: { dbPath: '' };
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog, private api: ApiService, private router: Router) {
  }
  openDialog() {
    this.dialog.open(OrderConfirmedDialogComponent, {
      width: "30%",
      position: {
        top: '8%',
        left: '40%'
      }
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.getAllOrders();
        //this.getAllUsers();

      }
    });
  }
  showErrorAlert() {
    Swal.fire('Waiting...', 'Something Went Wrong!', 'error')
  }
  showSuccessAlert() {
    Swal.fire('Successful!', 'Comment Deleted Successfully!', 'success')
  }
  // ConfirmDelete(id) {
  //   Swal.fire({
  //     title: 'Are You Sure?',
  //     text: 'You will not be able to recover this Comment!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, Delete Comment!',
  //     cancelButtonText: 'No, Keep Comment',
  //   }).then((result) => {

  //     if (result.isConfirmed) {

  //       this.api.deleteComment(id)
  //         .subscribe({
  //           next: (res) => {
  //             this.getAllComments();
  //           },
  //           error: (err) => {
  //             this.showErrorAlert();
  //           }
  //         })
  //       this.showSuccessAlert();

  //     } else if (result.isDismissed) {

  //       console.log('Product is safe!');

  //     }
  //   })

  // }
  ngOnInit(): void {
    //this.getAllUsers();
    this.getAllOrders();
    //this.getAllUsers();
  }
  getAllOrders() {
    //this.getAllUsers();
    this.api.getAllOrdersConfirmed().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        this.showErrorAlert();
      }
    })
  }
  // getAllUsers() {
  //   this.api.getAllUsers().subscribe({
  //     next: (res) => {
  //       this.user = res;
  //       for (let a of this.user) {
  //         for (let b of this.comment) {
  //           if (a.id == b.userId) {
  //             b.user = a.userName;
  //           }
  //         }
  //       }
  //     },
  //     error: (err) => {

  //     }
  //   })
  // }
  refreshForm() {
    this.getAllOrders();
    //this.getAllUsers();
  }
  editComment(row: any) {
    this.dialog.open(OrderConfirmedDialogComponent, {
      width: '30%',
      data: row,
      position: {
        top: '8%',
        left: '40%'
      }
    }).afterClosed().subscribe(val => {
      if (val == 'update') {
        this.getAllOrders();
        //this.getAllUsers();
      }
    })
  }
  deleteComment(id: string) {
    //this.ConfirmDelete(id);

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}



