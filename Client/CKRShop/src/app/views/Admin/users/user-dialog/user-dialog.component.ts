import { ApiService } from './../../../../Services-Admin/services-user/api.service';
import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  CheckExistsUser: any;
  CheckExistsEmail: any;
  ListUser: any;
  progress !: number;
  message !: string;
  srcResult: any = null;
  UserType: any[] = [];
  statusList = [1, 2, 3, 4, 5];
  userForm !: FormGroup;
  actionBtn: string = "Add";
  @Output() public onUploadFinished = new EventEmitter();
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    private http: HttpClient,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.userForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
    });
    if (this.editData) {
      this.actionBtn = "Update";
      this.userForm.controls['userName'].setValue(this.editData.userName);
      this.userForm.controls['password'].setValue(this.editData.password);
      this.userForm.controls['email'].setValue(this.editData.email);
    }

  }
  showSuccessAlert() {
    Swal.fire('Successful!', 'User Added Successfully!', 'success')
  }
  showSuccessAlertUpdate() {
    Swal.fire('Successful!', 'User Updated Successfully!', 'success')
  }
  showErrorAlert() {
    Swal.fire('Error!', 'Something Went Wrong!', 'error')
  }
  showExistsUsername() {
    Swal.fire('Error!', 'Username Already Exists!', 'warning')
  }
  showExistsEmail() {
    Swal.fire('Error!', 'Email Already Exists!', 'warning')
  }

  addUser() {
    let CheckExists = false;
    this.ListUser.forEach(element => {
      if (this.userForm.value.userName == element.userName) {
        this.showExistsUsername();
        CheckExists = true;
      }
      if (this.userForm.value.email == element.email) {
        this.showExistsEmail();
        CheckExists = true;
      }

    })
    console.log(CheckExists);
    if (CheckExists == false) {
      this.api.postUser(this.userForm.value).subscribe({
        next: (res) => {
          this.showSuccessAlert()
          this.userForm.reset();
          this.dialogRef.close('save');
        },
        error: (err) => {
          this.showErrorAlert();
        }
      })
    }

  }

  getAllUsers() {
    this.api.getAllUsers().subscribe({
      next: (res) => {
        this.ListUser = res;
      },
      error: (err) => {
        this.showErrorAlert();
      }
    })
  }
}
