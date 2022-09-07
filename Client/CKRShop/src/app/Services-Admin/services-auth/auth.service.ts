import { ApiService } from 'src/app/Services-Admin/services-user/api.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'
import Swal from 'sweetalert2';
@Injectable()
export class AuthService implements CanActivate {
  isCustomer = false;
  username: any;
  listUser: any;
  listUserRole: any[] = [];
  listRole: any[] = [];
  constructor(private router: Router, private api: ApiService, private jwtHelper: JwtHelperService) {
    this.getAllUsers();
    this.getAllRoles();
    this.getAllUserRoles();

  }
  canActivate() {
    const token = localStorage.getItem("jwt");
    this.api.getAllUsers().subscribe({
      next: (res) => {
        for (let a of res) {
          if (a.userName == localStorage.getItem("username")) {
            if (a.status == 3) {
              Swal.fire('Locked!', 'Account is locked, please contact admin!', 'info')
              this.router.navigate(['/login']);
            }

          }
        }
      }
    })
    if (this.isCustomer == true) {
      this.router.navigate(["/login"]);
      Swal.fire('Error!', 'You do not have access', 'error');
      return false;
    }
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      this.router.navigate(["/login"]);
      Swal.fire('Please login!', 'You do not have access', 'error');
      return false;

    }
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
                if (c.name == "Customer")
                  this.isCustomer = true;;
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
    })
  }
  getAllUserRoles() {
    this.api.getAllUserRoles().subscribe({
      next: (res) => {
        this.listUserRole = res;
        this.getUserLogin();
      },
    })
  }
  getAllRoles() {
    this.api.getAllRoles().subscribe({
      next: (res) => {
        this.listRole = res;
        this.getAllUserRoles();
      },
    })
  }
}