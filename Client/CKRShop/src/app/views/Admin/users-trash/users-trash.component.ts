import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services-Admin/services-user/api.service';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users-trash',
  templateUrl: './users-trash.component.html',
  styleUrls: ['./users-trash.component.scss']
})
export class UserTrashComponent implements OnInit {
  userInfor: any;
  user: any;
  userCurrent: any;
  userId: any;
  checkLogin = true;
  fullName: any;
  userName: any;
  email: any;
  phoneNumber: any;
  address: any;
  avatar: any;
  status: any;
  isAdmin: any = true;
  username: any;
  listUser: any;
  listUserRole: any[] = [];
  listRole: any[] = [];
  title = 'Material';
  displayedColumns: string[] = ['avatar', 'userName', 'fullName', 'phoneNumber', 'role', 'createdAt', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;
  public response!: { dbPath: '' };
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog, private api: ApiService, private router: Router) {
  }
  showSuccessAlert() {
    Swal.fire('Successful!', 'User Restored Successfully!', 'success')
  }
  showSuccessDelete() {
    Swal.fire('Successful!', 'User Deleted Successfully!', 'success')
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
      text: 'You will not be able to recover this User!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete User!',
      cancelButtonText: 'No, Keep User',
    }).then((result) => {

      if (result.isConfirmed) {

        this.api.deleteUserTrash(id)
          .subscribe({
            next: (res) => {
              this.getAllUsersRemove();
            },
            error: (err) => {
              this.showErrorAccessAlert();
            }
          })
        this.showSuccessDelete();
      } else if (result.isDismissed) {

        console.log('user is safe!');

      }
    })

  }
  ConfirmRestore(id) {
    Swal.fire({
      title: 'Are You Sure?',
      text: 'This user will be restore!',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes, Restore User!',
      cancelButtonText: 'No, Keep User',
    }).then((result) => {
      if (result.isConfirmed) {
        for (let a of this.userInfor) {
          if (a.id == id) {
            this.userId = a.id;
            this.fullName = a.fullName;
            this.email = a.email;
            this.phoneNumber = a.phoneNumber;
            this.address = a.address;
            this.avatar = a.avatar;
            this.status = a.status;
          }
        }
        const credentials = {
          'fullName': this.fullName,
          'email': this.email,
          'address': this.address,
          'avatar': this.avatar,
          'role': this.listUser.id,
          'phoneNumber': this.phoneNumber,
          'status': 1,
        }
        console.log(credentials);
        this.api.updateUser(credentials, id)
          .subscribe({
            next: (res) => {
              this.getAllUsersRemove();
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
    this.getAllUsersRemove();
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
  getAllUsersRemove() {
    this.api.getAllUsersRemove().subscribe({
      next: (res) => {
        this.listUser = res;
        this.userInfor = res;
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

  deleteUser(id: string) {
    this.ConfirmDelete(id);

  }
  restoreUser(id: string) {
    this.ConfirmRestore(id);
  }
  refreshForm() {
    this.getAllUsersRemove();
    this.getAllRoles();
    this.getAllUserRoles();
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



