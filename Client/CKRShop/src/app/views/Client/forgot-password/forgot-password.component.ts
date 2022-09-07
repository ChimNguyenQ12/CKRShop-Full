import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services-Admin/services-user/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  emailCurrent: any;
  checkValidPassword = true;
  confirmPassowrd = true;
  confirmOtp = true;
  checkMatchPass: any;
  reset = 0;
  otpCurrent: any;
  newPassword: any;
  time: any = true;
  otpCheck: any = false;
  otp: any;
  email!: any;
  constructor(private route: Router, private api: ApiService, private http: HttpClient) { }
  showSuccessAlert() {
    Swal.fire('Successful!', 'OTP sent successfully in email!', 'success');
    this.otpCheck = true;
  }
  showErrorAlert() {
    Swal.fire('Error!', 'Please resent OTP code!', 'error')
  }
  showErrorAlertEmail() {
    Swal.fire('Error!', 'Email does not exist!', 'error')
  }
  showErrorAlertEmailNull() {
    Swal.fire('Error!', 'You must enter your email', 'error')
  }
  showErrorAlertNotMatchOtp() {
    Swal.fire('Error!', 'OTP code invalid', 'error')
  }
  showSuccessAlertResetPass() {
    Swal.fire({
      title: 'Successful!',
      text: 'Password reset successfully!',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Go to login!',
      cancelButtonText: 'Change again',
    }).then((result) => {
      if (result.isConfirmed) {
        this.route.navigate(['/home/login'])
      } else if (result.isDismissed) {

      }
    })
  }
  forgot(form: NgForm) {
    this.otpCheck = false;
    this.email = form.value.email;
    if (this.email === '') {
      this.showErrorAlertEmailNull();
    }
    else {
      this.api.forgotPassword(this.email, '')
        .subscribe({
          next: (res) => {
            console.log(res);
            this.showSuccessAlert()
            this.otpCurrent = res;
            this.emailCurrent = this.email;
          },
          error: (err) => {
            this.showErrorAlertEmail();
          }
        }
        )
    }

  }
  /// Resend OTP
  resend(form: NgForm) {
    this.time = false;
    this.otpCheck = true;
    this.api.forgotPassword(this.emailCurrent, '')
      .subscribe({
        next: (res) => {
          console.log(res);
          this.otpCurrent = res;
        },
        error: (err) => {
        }
      }
      )

    setTimeout(() => { this.time = true }, 15000);

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


  resetPass(form: NgForm) {
    this.confirmPassowrd = true;
    this.confirmOtp = true;
    this.reset = 0;
    this.otp = form.value.otp;
    this.newPassword = form.value.newPassword;
    this.confirmPassowrd = form.value.confirmPassword;

    if (this.otpCurrent != this.otp) {
      this.confirmOtp = false;
    }
    else
      if (this.newPassword != this.confirmPassowrd) {
        this.confirmPassowrd = false;
      }
      else {
        this.api.resetPassword(this.emailCurrent, this.otp, this.newPassword)
          .subscribe({
            next: (res) => {
              console.log(res);
              this.showSuccessAlertResetPass();
            },
            error: (err) => {
              this.showErrorAlert();
            }
          })
      }
  }
}
