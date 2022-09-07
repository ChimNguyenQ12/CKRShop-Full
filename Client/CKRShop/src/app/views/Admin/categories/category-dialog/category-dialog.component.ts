import { ApiService } from './../../../../Services-Admin/services-category/api.service';
import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {
  CheckExistsUser: any;
  CheckExistsEmail: any;
  ListCategory: any;
  statusList = [1, 2];
  categoryForm !: FormGroup;
  actionBtn: string = "Add";
  @Output() public onUploadFinished = new EventEmitter();
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    private http: HttpClient,
    private dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
  ) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
    });
    if (this.editData) {
      this.actionBtn = "Update";
      this.categoryForm.controls['name'].setValue(this.editData.name);
      this.categoryForm.controls['status'].setValue(this.editData.status);
    }

  }
  showSuccessAlert() {
    Swal.fire('Successful!', 'Category Added Successfully!', 'success')
  }
  showSuccessAlertUpdate() {
    Swal.fire('Successful!', 'Category Updated Successfully!', 'success')
  }
  showErrorAlert() {
    Swal.fire('Error!', 'Something Went Wrong!', 'error')
  }
  showExistsCategory() {
    Swal.fire('Error!', 'Category Already Exists!', 'warning')
  }
  addcategory() {
    if (!this.editData) {
      let CheckExists = false;
      this.ListCategory.forEach(element => {
        if (this.categoryForm.value.name == element.name) {
          this.showExistsCategory();
          CheckExists = true;
        }

      })
      console.log(CheckExists);
      if (CheckExists == false) {
        this.api.postCategory(this.categoryForm.value).subscribe({
          next: (res) => {
            this.showSuccessAlert()
            this.categoryForm.reset();
            this.dialogRef.close('save');
          },
          error: (err) => {
            this.showErrorAlert();
          }
        })
      }
    } else {
      this.updatecategory();
    }

  }
  getAllCategories() {
    this.api.getAllCategories().subscribe({
      next: (res) => {
        this.ListCategory = res;
      },
      error: (err) => {
        this.showErrorAlert();
      }
    })
  }
  updatecategory() {
    this.api.updateCategory(this.categoryForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          this.showSuccessAlertUpdate();
          this.categoryForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          this.showErrorAlert();
        }
      })
  }
}
