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
  isAdmin = false;
  username: any;
  statusList = [1, 2, 3];
  actionBtn: string = "Add";
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    private http: HttpClient,
    private dialogRef: MatDialogRef<ResetPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
  ) { }

  ngOnInit(): void {
    this.getUserLogin();
    this.userForm = this.formBuilder.group({
      userName: [''],
      passwordHash: ['', Validators.required],
      confirmPassword: ['',]
    });
    if (this.editData) {
      this.userForm.controls['userName'].setValue(this.editData.userName);
    }

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
    if (this.userForm.value.passwordHash != this.userForm.value.confirmPassword) {
      //this.showNotMatchAlert();
      this.CheckMatchPass = true;
    }
    else {
      this.api.changePassword(this.userForm.value, this.editData.id)
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
  /// Check Role User Login
  getUserLogin() {
    this.username = localStorage.getItem("username");
    if (this.username == this.editData.userName) {
      this.isAdmin = true;
    }
  }
}
