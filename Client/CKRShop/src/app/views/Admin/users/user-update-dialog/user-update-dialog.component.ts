import { ApiService } from '../../../../Services-Admin/services-user/api.service';
import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-update-dialog',
  templateUrl: './user-update-dialog.component.html',
  styleUrls: ['./user-update-dialog.component.scss']
})
export class UserUpdateDialogComponent implements OnInit {
  createdAt:Date;
  listUser: any;
  listUserRole: any;
  isAdmin = false;
  isStaff = false;
  username: any;
  listRole: any;
  progress !: number;
  message !: string;
  srcResult: any = null;
  UserType: any[] = [];
  statusList = [1, 2, 3];
  userForm !: FormGroup;
  actionBtn: string = "Add";
  @Output() public onUploadFinished = new EventEmitter();
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    private http: HttpClient,
    private dialogRef: MatDialogRef<UserUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
  ) { }

  ngOnInit(): void {
    this.getAllRoles();
    this.getAllUsers();
    this.getAllUserRoles();
    this.userForm = this.formBuilder.group({
      userName: [''],
      fullName: [''],
      status: ['',],
      email: ['',],
      phoneNumber: ['',],
      address: [''],
      role: [''],
      avatar: ['',],
    });
    if (this.editData) {
      this.actionBtn = "Update";
      this.userForm.controls['userName'].setValue(this.editData.userName);
      this.userForm.controls['fullName'].setValue(this.editData.fullName);
      this.userForm.controls['avatar'].setValue(this.editData.avatar);
      this.userForm.controls['role'].setValue(this.editData.role);
      this.userForm.controls['address'].setValue(this.editData.address);
      this.userForm.controls['phoneNumber'].setValue(this.editData.phoneNumber);
      this.userForm.controls['email'].setValue(this.editData.email);
      this.userForm.controls['status'].setValue(this.editData.status);
    }
    this.createdAt = this.editData.createdAt;
  }

  showSuccessAlert() {
    Swal.fire('Successful!', 'User Added Successfully!', 'success')
  }

  showSuccessAlertUpdate() {
    Swal.fire('Successful!', 'User Updated Successfully!', 'success')
  }

  showErrorAlert() {
    Swal.fire('Waiting...', 'Something Went Wrong!', 'error')
  }

  showErrorAccessAlert() {
    Swal.fire('Waiting...', 'Please Contact Admin!', 'info')
  }


  /// Check Role User Login
  getUserLogin() {
    this.username = localStorage.getItem("username");
    if (this.username == this.editData.userName) {
      this.isAdmin = true;
    }
    for (let a of this.listUser) {
      if (a.userName == this.username) {
        for (let b of this.listUserRole) {
          if (a.id == b.userId) {
            for (let c of this.listRole) {
              if (c.id == b.roleId) {
                if (c.name == "Admin")
                  this.isAdmin = true;
                else if (c.name == "Staff") {
                  this.isStaff = true;
                }
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
        this.getUserLogin();
      },
      error: (err) => {
        this.showErrorAlert();
      }
    })
  }

  getAllUsers() {
    this.api.getAllUsers().subscribe({
      next: (res) => {
        this.listUser = res;
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
      },
      error: (err) => {
        this.showErrorAlert();
      }
    })
  }

  addUser() {
    if (!this.editData) {
      if (this.userForm.valid) {
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
    else {
      this.updateUser();
    }

  }

  updateUser() {
    console.log(this.userForm.value);
    this.api.updateUser(this.userForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          this.showSuccessAlertUpdate();
          this.userForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          this.showErrorAccessAlert();
        }
      })
  }

  // Upload
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
            this.userForm.controls['avatar'].setValue(fileToUpload.name);
            // Suc manh toi thuong
            this.message = 'Upload success.';

            this.onUploadFinished.emit(event.body);
          }
        },
        error: (err: HttpErrorResponse) => console.log(err)
      });
  }


}
