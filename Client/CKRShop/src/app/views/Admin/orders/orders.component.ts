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
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  checkSearch = false;
  FromDate: Date;
  Total: number = 0;
  ToDate: Date;
  isAdmin = true;
  username: string;
  listUser: any;
  listUserRole: any;
  listRole: any;
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
  openDialog() {
    this.dialog.open(OrderDialogComponent, {
      width: "30%",
      position: {
        top: '8%',
        left: '40%'
      }
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.getAllOrders();

      }
    });
  }
  showErrorAlert() {
    Swal.fire('Waiting...', 'Something Went Wrong!', 'error')
  }
  showSuccessAlert() {
    Swal.fire('Successful!', 'Comment Deleted Successfully!', 'success')
  }
  ConfirmDelete(id) {
    Swal.fire({
      title: 'Are You Sure?',
      text: 'You will not be able to recover this invoice!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete Invoice!',
      cancelButtonText: 'No, Keep Invoice',
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteOrder(id)
          .subscribe({
            next: (res) => {
              this.getAllOrders();
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
    this.getAllOrders();
    this.getAllUsers();
    this.getAllUserRoles();
    this.getAllRoles();
    this.getUserLogin();
  }
  getAllOrders() {
    this.api.getAllOrders().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.comment = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        this.showErrorAlert();
      }
    })
  }
  /// Check Role User Login
  getUserLogin() {
    this.username = localStorage.getItem("username");
    for (let a of this.listUser) {
      if (a.userName == this.username) {
        for (let b of this.listUserRole) {
          if (a.id == b.userId) {
            for (let c of this.listRole) {
              if (c.id == b.roleId) {
                if (c.name == "Staff")
                  this.isAdmin = false;
              }
            }
          }
        }
      }
    }
  }
  getAllUsers() {
    this.api.getAllUsers().subscribe({
      next: (res) => {
        this.listUser = res;
      },
      error: (err) => {
        this.showErrorAlert();
      }
    })
  }
  getAllUserRoles() {
    this.api.getAllUserRoles().subscribe({
      next: (res) => {
        this.listUserRole = res;
        this.getUserLogin();
        for (let a of this.listUserRole) {
          for (let b of this.listUser) {
            if (a.userId == b.id) {
              // lay cac roleId dang co
              b.listUser = a.roleId;
              for (let c of this.listRole) {
                // so sanh roleId lay name role
                if (c.id == b.listUser) {
                  b.listUser = c.name;
                  // 7 dong code = 7 tieng :)
                }
              }
            }
          }

        }


      },
      error: (err) => {
        this.showErrorAlert();
      }
    })
  }
  getAllRoles() {
    this.api.getAllRoles().subscribe({
      next: (res) => {
        this.listRole = res;
        this.getAllUserRoles();
      },
      error: (err) => {
        this.showErrorAlert();
      }
    })
  }
  refreshForm() {
    this.checkSearch = false;
    this.getAllOrders();
    //this.getAllUsers();
  }
  editOrder(row: any) {
    this.dialog.open(OrderDialogComponent, {
      width: '30%',
      data: row,
      position: {
        top: '8%',
        left: '40%'
      }
    }).afterClosed().subscribe(val => {
      if (val == 'update') {
        this.getAllOrders();
      }
    })
  }
  deleteOrder(id: string) {
    this.ConfirmDelete(id);

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  search(form: NgForm) {
    this.checkSearch = false;
    this.FromDate = form.value.fromDate;
    this.ToDate = form.value.toDate;
    console.log(this.FromDate, this.ToDate);
    if (!this.FromDate) {
      Swal.fire('Waiting...!', 'You must select the from date!', 'info')
    }
    if (!this.ToDate) {
      Swal.fire('Waiting...!', 'You must select the to date!', 'info')
    }
    if (!this.ToDate && !this.FromDate) {
      Swal.fire('Waiting...!', 'You must enter the entire text box!', 'info')
    }

    this.api.searchOrder(this.FromDate, this.ToDate).subscribe({
      next: (res) => {
        console.log(res);
        if (res.length != 0) {
          this.checkSearch = true;
        }
        for (let a of res) {
          console.log(a.total);
          this.Total += a.total;
        }
        console.log(this.Total);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      , error: (err) => {
      }
    })
  }
}



