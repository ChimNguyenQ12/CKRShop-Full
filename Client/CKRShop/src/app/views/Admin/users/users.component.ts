import { Router } from '@angular/router';
import { ResetPasswordDialogComponent } from './reset-password-dialog/reset-password-dialog.component';
import { RegisterAdminDialogComponent } from './register-admin-dialog/register-admin.component';
import { UserUpdateDialogComponent } from './user-update-dialog/user-update-dialog.component';
import { ApiService } from 'src/app/Services-Admin/services-user/api.service';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  isAdmin= true;
  username: any;
  listUser: any;
  listUserRole: any[] = [];
  listRole: any[] = [];
  title = 'Material';
  displayedColumns: string[] = ['avatar', 'userName', 'fullName', 'phoneNumber', 'role', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;
  public response!: { dbPath: '' };
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog, private api: ApiService, private router: Router) {
  }

  openDialog() {
    this.dialog.open(UserDialogComponent, {
      width: "30%",
      position: {
        top: '8%',
        left: '40%'
      }
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.getAllUsers();
        this.getAllRoles();
        this.getAllUserRoles();
      }
    });
  }
  RegisterAdmin() {
    this.dialog.open(RegisterAdminDialogComponent, {
      width: "30%",
      position: {
        top: '8%',
        left: '40%'
      }
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.getAllUsers();
        this.getAllRoles();
        this.getAllUserRoles();
      }
    });
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
      text: 'This user will not access client side!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete User!',
      cancelButtonText: 'No, Keep User',
    }).then((result) => {

      if (result.isConfirmed) {

        this.api.deleteUser(id)
          .subscribe({
            next: (res) => {
              this.getAllUsers();
            },
            error: (err) => {
              this.showErrorAccessAlert();
            }
          })

      } else if (result.isDismissed) {

        console.log('user is safe!');

      }
    })

  }
  ngOnInit(): void {
    this.getAllUsers();
    this.getAllRoles();
    this.getAllUserRoles();
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
        error: (err: HttpErrorResponse) => console.log(err)
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
  editUser(row: any) {
    this.dialog.open(UserUpdateDialogComponent, {
      width: '30%',
      data: row,
      position: {
        top: '8%',
        left: '40%'
      }
    }).afterClosed().subscribe(val => {
      if (val == 'update') {
        this.getAllUsers();
        this.getAllRoles();
      }
    })
  }
  deleteUser(id: string) {
    this.ConfirmDelete(id);

  }
  refreshForm() {
    this.getAllUsers();
    this.getAllRoles();
    this.getAllUserRoles();
  }
  resetPassword(row: any) {
    this.dialog.open(ResetPasswordDialogComponent, {
      width: '30%',
      data: row,
      position: {
        top: '8%',
        left: '40%'
      }
    }).afterClosed().subscribe(val => {
      if (val == 'reset') {
        this.getAllUsers();
      }
    })

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public createImgPath = (serverPath: string) => {
    if (serverPath == null) {
      serverPath = "no_image.jpg";
      return `https://localhost:44302/api/Upload/GetImageUser?name=${serverPath}`;
    }
    let ImageName = serverPath.replace("C:\\fakepath\\", "");
    if (ImageName == "")
      ImageName = "no_image.jpg";
    return `https://localhost:44302/api/Upload/GetImageUser?name=${ImageName}`;

  }
}



