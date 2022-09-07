import { ApiService } from 'src/app/Services-Admin/services-user/api.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  invalidLogin: boolean;
  newPass: any;
  listUser: any;
  rePass: any;
  email: any;
  username: any;
  checkMatchPass = true;
  checkValidPassword = true;
  checkValidEmail = true;
  constructor(private route: Router, private http: HttpClient, private api: ApiService) {
    this.getAllUser();
  }
  register(form: NgForm) {
    this.getAllUser();
    this.checkMatchPass = true;
    this.rePass = form.value.repeatPassword;
    this.newPass = form.value.newPassword;
    this.email = form.value.email;
    this.username = form.value.username;
    for (let a of this.listUser) {
      if (a.userName == this.username) {
        Swal.fire('Waiting...', 'Username already exists!', 'info');
      }
      else if (a.email == this.email) {
        Swal.fire('Waiting...', 'Email already exists!', 'info');
      }
    }
    if (this.rePass != this.newPass) {
      this.checkMatchPass = false;
    }
    else {
      const credentials = {
        'username': form.value.username,
        'password': form.value.newPassword,
        'email': form.value.email,
      }
      this.api.registerUser(credentials)
        .subscribe({
          next: (res) => {
            console.log(res);
            Swal.fire('Successful!', 'Please confirm email and login!', 'success')
            //this.route.navigate(['/home/login']);
          },
          error: (err) => {
          }
        }
        )
    }
  }
  /// check password valid
  getValue(event) {
    var regex = new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$');
    var b = regex.test(event);
    if (event === "") {
      this.checkValidPassword = true;
      console.log(this.checkValidPassword)
    }
    else
      if (b == true) {
        this.checkValidPassword = true;
      }
      else this.checkValidPassword = false;
  }

  /// check email valid
  getValueEmail(event) {

    var regex = new RegExp('^(?=.*[a-z])(?=.*[0-9])(?=.*[a-z]).{8,}$');
    var b = regex.test(event);
    if (event === "") {
      this.checkValidEmail = true;
      console.log(this.checkValidEmail)
    }
    else
      if (b == true) {
        this.checkValidEmail = true;
      }
      else this.checkValidEmail = false;
  }
  getAllUser() {
    this.api.getAllUsersClient().subscribe({
      next: (res) => {
        this.listUser = res;
      },
      error: (err) => {

      }
    })
  }
}
