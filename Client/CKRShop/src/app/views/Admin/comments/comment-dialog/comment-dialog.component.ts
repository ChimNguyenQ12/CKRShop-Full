import { ApiService } from './../../../../Services-Admin/services-comment/api.service';
import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent implements OnInit {
  user: any[] = [];
  product: any[] = [];
  fullname: any[] = [];
  statusList = [1, 2];
  commentForm !: FormGroup;
  @Output() public onUploadFinished = new EventEmitter();
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    private http: HttpClient,
    private dialogRef: MatDialogRef<CommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllProducts();
    this.commentForm = this.formBuilder.group({
      userId: ['',],
      content: ['',],
      status: ['',],
      fullname: ['',],
      id: ['',],
      createdAt: ['',]
    });
    if (this.editData) {
      this.commentForm.controls['status'].setValue(this.editData.status);
      this.commentForm.controls['content'].setValue(this.editData.content);
      this.commentForm.controls['userId'].setValue(this.editData.userId);
      this.commentForm.controls['fullname'].setValue(this.editData.fullname);
      this.commentForm.controls['id'].setValue(this.editData.id);
      this.commentForm.controls['createdAt'].setValue(this.editData.createdAt);

    }

  }
  showSuccessAlertUpdate() {
    Swal.fire('Successful!', 'Comment Updated successfully!', 'success')
  }
  showErrorAlert() {
    Swal.fire('Error!', 'Something went wrong!', 'error')
  }
  updateComment() {
    this.api.updateComment(this.commentForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          this.showSuccessAlertUpdate();
          this.commentForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          this.showErrorAlert();
        }
      })
  }
  getAllUsers() {
    this.api.getAllUsers().subscribe({
      next: (res) => {
        this.user = res;
        for (let a of this.user) {
          if (this.editData.userId == a.id) {
            this.user = a.userName;
            this.fullname = a.fullName;
          }
        }
      },
      error: (err) => {
        this.showErrorAlert();
      }
    })
  }
  getAllProducts() {
    console.log(this.editData.product['id']);
    this.api.getAllProducts().subscribe({
      next: (res) => {
        this.product = res;
        for (let a of this.product) {
          if (this.editData.product['id'] == a.id) {
            this.product = a.name;
          }
        }
      },
      error: (err) => {
        this.showErrorAlert();
      }
    })
  }

}
