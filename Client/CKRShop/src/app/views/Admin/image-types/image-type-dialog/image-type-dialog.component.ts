import { ApiService } from './../../../../Services-Admin/services-image-type/api.service';
import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-image-type-dialog',
  templateUrl: './image-type-dialog.component.html',
  styleUrls: ['./image-type-dialog.component.scss']
})
export class ImageTypeDialogComponent implements OnInit {
  CheckExistsUser: any;
  CheckExistsEmail: any;
  ListImageType: any;
  statusList = [1, 2];
  imageTypeForm !: FormGroup;
  actionBtn: string = "Add";
  @Output() public onUploadFinished = new EventEmitter();
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    private http: HttpClient,
    private dialogRef: MatDialogRef<ImageTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
  ) { }

  ngOnInit(): void {
    this.getAllImageTypes();
    this.getAllImageTypes();
    this.imageTypeForm = this.formBuilder.group({
      typeName: ['', Validators.required],
      status: ['', Validators.required],
    });
    if (this.editData) {
      this.actionBtn = "Update";
      this.imageTypeForm.controls['typeName'].setValue(this.editData.typeName);
      this.imageTypeForm.controls['status'].setValue(this.editData.status);
    }

  }
  showSuccessAlert() {
    Swal.fire('Successful!', 'ImageType Added Successfully!', 'success')
  }
  showSuccessAlertUpdate() {
    Swal.fire('Successful!', 'ImageType Updated Successfully!', 'success')
  }
  showErrorAlert() {
    Swal.fire('Error!', 'Something Went Wrong!', 'error')
  }
  showExistsImageType() {
    Swal.fire('Error!', 'ImageType Already Exists!', 'warning')
  }
  addImageType() {
    if (!this.editData) {
      let CheckExists = false;
      this.ListImageType.forEach(element => {
        if (this.imageTypeForm.value.typeName == element.typeName) {
          this.showExistsImageType();
          CheckExists = true;
        }

      })
      if (CheckExists == false) {

        this.api.postImageType(this.imageTypeForm.value).subscribe({
          next: (res) => {
            this.showSuccessAlert()
            this.imageTypeForm.reset();
            this.dialogRef.close('save');
          },
          error: (err) => {
            this.showErrorAlert();
          }
        })
      }
    }
    else {
      this.updateImageType();
    }

  }
  getAllImageTypes() {
    this.api.getAllImageTypes().subscribe({
      next: (res) => {
        this.ListImageType = res;
      },
      error: (err) => {
        this.showErrorAlert();
      }
    })
  }
  updateImageType() {
    this.api.updateImageType(this.imageTypeForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          this.showSuccessAlertUpdate();
          this.imageTypeForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          this.showErrorAlert();
        }
      })
  }
}
