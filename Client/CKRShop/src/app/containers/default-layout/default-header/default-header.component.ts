import { ApiService } from 'src/app/Services-Admin/services-user/api.service';
import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {
  checkStatus = "success"
  isLockAccount = "Lock Account";
  listRole: any;
  roleCurrent: any;
  userRole: any;
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

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService, private api: ApiService, private router: Router, private JwtHelper: JwtHelperService) {
    super();
    this.isUserAuthenticated();
    if (this.isUserAuthenticated) {
      this.getUserRole();
      this.getRole();
      this.getUser();
    }

  }
  isUserAuthenticated() {
    const token: string = localStorage.getItem("jwt");
    if (token && !this.JwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {

      return false;
    }
  }

  logOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    this.router.navigate(['login'])
  }

  getUser() {
    this.userName = localStorage.getItem("username");
    this.api.getUserByUsername(this.userName).subscribe({
      next: (res) => {
        this.user = res;
        this.userId = this.user.id;
        this.userName = this.user.userName;
        this.fullName = this.user.fullName;
        this.email = this.user.email;
        this.phoneNumber = this.user.phoneNumber;
        this.address = this.user.address;
        this.avatar = this.user.avatar;
        this.status = this.user.status;
        if (this.status == 4) {
          this.isLockAccount = "Unlock Account";
          this.checkStatus = "danger";
        }
        else {
          this.isLockAccount = "Lock Account";

        }
      },
      error: (err) => {

      }
    })
  }
  getRole() {
    this.getUserRole();
    this.api.getAllRoles().subscribe({
      next: (res) => {
        this.listRole = res;
        for (let a of this.userRole) {
          if (a.userId == this.userId) {
            for (let c of this.listRole) {
              if (a.roleId == c.id) {
                this.roleCurrent = c.name;
              }
            }
          }
        }
      },
      error: (err) => {

      }
    })
  }
  getUserRole() {
    this.api.getAllUserRoles().subscribe({
      next: (res) => {
        this.userRole = res;

      },
      error: (err) => {

      }
    })
  }
  logAccount() {
    if (this.status == 1) {
      this.status = 4;
      const credentials = {
        'fullname': this.fullName,
        'email': this.email,
        'address': this.address,
        'avatar': this.avatar,
        'role': this.roleCurrent,
        'phoneNumber': this.phoneNumber,
        'status': 4,
      }
      this.api.updateUser(credentials, this.userId).subscribe({
        next: (res) => {
          localStorage.removeItem("jwt");
          localStorage.removeItem("username");
          this.router.navigate(['login'])
        },
        error: (err) => {

        }
      })
    }
    else if (this.status == 4) {
      console.log(1);
      const credentials = {
        'fullname': this.fullName,
        'email': this.email,
        'address': this.address,
        'avatar': this.avatar,
        'role': this.roleCurrent,
        'phoneNumber': this.phoneNumber,
        'status': 1,
      }
      this.api.updateUser(credentials, this.userId).subscribe({
        next: (res) => {
          localStorage.removeItem("jwt");
          localStorage.removeItem("username");
          this.router.navigate(['login'])
        },
        error: (err) => {

        }
      })
    }

  }


  public createImgPath = () => {
    if (this.avatar == null) {
      this.avatar = "no_image.jpg";
      return `https://localhost:44302/api/Upload/GetImageUser?name=${this.avatar}`;
    }
    let ImageName = this.avatar.replace("C:\\fakepath\\", "");
    if (ImageName == "")
      ImageName = "no_image.jpg";
    return `https://localhost:44302/api/Upload/GetImageUser?name=${ImageName}`;

  }
}

