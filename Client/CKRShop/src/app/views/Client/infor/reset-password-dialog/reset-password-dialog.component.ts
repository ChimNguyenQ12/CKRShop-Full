import { ApiService } from '../../../../Services-Admin/services-user/api.service';
import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.scss']
})
export class ResetPasswordDialogComponent implements OnInit {
  CheckMatchPass: boolean = false;
  userForm !: FormGroup;
  password: string;
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    private http: HttpClient,
    private dialogRef: MatDialogRef<ResetPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
  ) { }

  ngOnInit(): void {

    this.userForm = this.formBuilder.group({
      passwordCurrent: ['',],
      passwordHash: ['', Validators.required],
      confirmPassword: ['',]
    });
  }
  showSuccessAlert() {
    Swal.fire('Successful!', 'Password Changed Successfully!', 'success')
  }
  showSuccessAlertUpdate() {
    Swal.fire('Successful!', 'User Updated Successfully!', 'success')
  }
  showErrorAlert() {
    Swal.fire('Error!', 'Something Went Wrong!', 'error')
  }
  showNotMatchAlert() {
    Swal.fire('Error!', 'Password Does Not Match!', 'error')
  }
  showErrorAccessAlert() {
    Swal.fire('Waiting...', 'Please Contact Admin!', 'info')
  }
  resetPassword() {
    var username = localStorage.getItem("username-client");
    if (this.userForm.value.passwordHash != this.userForm.value.confirmPassword) {
      //this.showNotMatchAlert();
      this.CheckMatchPass = true;
    }
    else {

      this.api.changePasswordClient(this.userForm.value, username)
        .subscribe({
          next: (res) => {
            this.showSuccessAlert()
            this.userForm.reset();
            this.dialogRef.close('save');
          },
          error: (err) => {
            this.showErrorAccessAlert();
          }
        })
    }
  }
}
