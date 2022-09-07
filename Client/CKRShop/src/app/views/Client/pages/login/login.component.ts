import Swal from 'sweetalert2';
import { ApiService } from 'src/app/Services-Admin/services-user/api.service';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isAdmin: any;
  invalidLogin: boolean;
  username: any;
  listUser: any;
  listUserRole: any[] = [];
  listRole: any[] = [];
  credentials: any;
  constructor(private route: Router, private http: HttpClient, private api: ApiService) {
  }
  ConfirmAdmin() {
    Swal.fire({
      title: 'Waiting...',
      text: 'Do you want access to CMS?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes, go to CMS!',
      cancelButtonText: 'No, Keep me Client',
    }).then((result) => {

      if (result.isConfirmed) {
        this.route.navigate(['/admin']);
      } else if (result.isDismissed) {
        this.route.navigate(['/home']);
      }
    })

  }
  login(form: NgForm) {
    this.credentials = {
      'username': form.value.username,
      'password': form.value.password
    }
    this.getAllUsers();
    this.getAllUserRoles();
    this.getAllRoles();
    this.username = this.credentials.username;
    for (let a of this.listUser) {
      if (a.userName == this.username) {
        for (let b of this.listUserRole) {
          if (a.id == b.userId) {
            for (let c of this.listRole) {
              if (c.id == b.roleId) {
                if (c.name == "Staff" || c.name == "Admin") {
                  this.isAdmin = true;
                  console.log(this.isAdmin);
                }
              }
            }
          }
        }
      }
      else{
        this.invalidLogin = true;
      }
    }
    for (let a of this.listUser) {
      if (a.userName == this.credentials.username) {
        console.log(this.isAdmin);
        if (this.isAdmin == true) {
          this.http.post("https://localhost:44302/api/authenticate/login", this.credentials)
            .subscribe({
              next: (res) => {
                const token = (<any>res).token;
                localStorage.setItem("jwt", token);
                localStorage.setItem("username", this.credentials.username);
                localStorage.setItem("jwt-client", token);
                localStorage.setItem("username-client", this.credentials.username);
                this.invalidLogin = false;
                this.ConfirmAdmin()
              },
              error: (err) => {
                console.log(1);
                this.invalidLogin = true;
              }
            }
            )
        }
        else {
          if (a.emailConfirmed == false) {
            Swal.fire('Waiting...', 'Please confirm email and login again!', 'info');
          }
          else if (a.emailConfirmed == true) {
            console.log(3);
            this.http.post("https://localhost:44302/api/authenticate/login", this.credentials)
              .subscribe({
                next: (res) => {
                  const token = (<any>res).token;
                  localStorage.setItem("jwt-client", token);
                  localStorage.setItem("username-client", this.credentials.username);
                  this.invalidLogin = false;
                  this.route.navigate(['/home']);
                },
                error: (err) => {
                  console.log(1);
                  this.invalidLogin = true;
                }
              }
              )
          }
        }
      }
    }
  }
  getAllUsers() {
    this.api.getAllUsersClient().subscribe({
      next: (res) => {
        this.listUser = res;
      },
      error: (erer) => {

      }
    })
  }
  /// Check Role User Login
  getUserLogin() {
    this.username = this.credentials.username;
    for (let a of this.listUser) {
      if (a.userName == this.username) {
        for (let b of this.listUserRole) {
          if (a.id == b.userId) {
            for (let c of this.listRole) {
              if (c.id == b.roleId) {
                if (c.name == "Staff" || c.name == "Admin") {
                  this.isAdmin = true;
                  console.log(this.isAdmin);
                }
                else this.isAdmin = false;
              }
            }
          }
        }
      }
    }
  }
  getAllUserRoles() {
    this.api.getAllUserRoles().subscribe({
      next: (res) => {
        this.listUserRole = res;
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
      }
    })
  }
}
