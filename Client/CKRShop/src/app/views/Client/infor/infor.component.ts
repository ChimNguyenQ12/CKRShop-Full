import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services-Admin/services-user/api.service';
import Swal from 'sweetalert2';
import { ResetPasswordDialogComponent } from '../../Client/infor/reset-password-dialog/reset-password-dialog.component';

@Component({
  selector: 'app-infor',
  templateUrl: './infor.component.html',
  styleUrls: ['./infor.component.scss']
})
export class InforComponent {
  progress !: number;
  message !: string;
  username: any;
  fullname: any;
  phone: any;
  address: any;
  email: any;
  avatar: any;
  role: any;
  id: any;
  credentials: any;
  constructor(private dialog: MatDialog, private route: Router, private api: ApiService, private http: HttpClient) {
    this.getAllUsers();
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

  update(form: NgForm) {
    console.log(this.email);
    if (form.value.fullname != '') {
      this.fullname = form.value.fullname;
    }
    if (form.value.fullname == '') {
      form.value.fullname = this.fullname;
    }
    if (form.value.phone != '') {
      this.phone = form.value.phone;
    }
    if (form.value.phone == '') {
      form.value.phone = this.phone;
    }
    if (form.value.address != '') {
      this.address = form.value.address;
    }
    if (form.value.address == '') {
      form.value.address = this.address;
    }
    this.credentials = {
      'fullname': form.value.fullname,
      'email': this.email,
      'phoneNumber': this.phone,
      'address': this.address,
      'avatar': this.avatar,
      'status': 1,
    }
    this.api.updateUser(this.credentials, this.id).subscribe({
      next: (res) => {
        Swal.fire('Successful!', 'Update Successfully!', 'success');
      },
      error: (err) => {
      }
    })
  }
  getAllUsers() {
    var username = localStorage.getItem("username-client");
    this.api.getAllUsersClient().subscribe({
      next: (res) => {
        for (let a of res) {
          if (a.userName == username) {
            this.id = a.id;
            this.username = a.userName;
            this.address = a.address;
            this.email = a.email;
            this.phone = a.phoneNumber;
            this.fullname = a.fullName;
            this.avatar = a.avatar;
            console.log(a);
          }
        }
      },
      error: (err) => {

      }
    })
  }
  changePass() {
    this.dialog.open(ResetPasswordDialogComponent, {
      width: '30%',
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


  uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.api.uploadFile(formData, { reportProgress: true, observe: 'events' })
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            if (event.total) {
              const total: number = event.total;
              this.progress = Math.round(100 * event.loaded / total);
            }
          }
          else if (event.type === HttpEventType.Response) {
            // Suc manh toi thuong
            this.avatar = fileToUpload.name;

            // Suc manh toi thuong
            this.message = 'Upload success.';

          }
        },
        error: (err: HttpErrorResponse) => console.log(err)
      });
  }
}
