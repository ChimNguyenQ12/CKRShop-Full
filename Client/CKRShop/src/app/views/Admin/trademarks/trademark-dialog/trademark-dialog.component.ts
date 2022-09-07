import { ApiService } from './../../../../Services-Admin/services-trademark/api.service';
import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-trademark-dialog',
  templateUrl: './trademark-dialog.component.html',
  styleUrls: ['./trademark-dialog.component.scss']
})
export class TrademarkDialogComponent implements OnInit {
  ProductType: any[] = [];
  CheckExistsUser: any;
  CheckExistsEmail: any;
  ListTrademark: any;
  statusList = [1, 2];
  trademarkForm !: FormGroup;
  actionBtn: string = "Add";
  @Output() public onUploadFinished = new EventEmitter();
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    private http: HttpClient,
    private dialogRef: MatDialogRef<TrademarkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
  ) { }

  ngOnInit(): void {
    this.getAllTrademarks();
    this.getAllProductTypes();
    this.trademarkForm = this.formBuilder.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      productTypeId: ['', Validators.required]
    });
    if (this.editData) {
      this.actionBtn = "Update";
      this.trademarkForm.controls['name'].setValue(this.editData.name);
      this.trademarkForm.controls['status'].setValue(this.editData.status);
      this.trademarkForm.controls['productTypeId'].setValue(this.editData.productTypeId);
    }

  }
  showSuccessAlert() {
    Swal.fire('Successful!', 'Trademark Added Successfully!', 'success')
  }
  showSuccessAlertUpdate() {
    Swal.fire('Successful!', 'Trademark Updated Successfully!', 'success')
  }
  showErrorAlert() {
    Swal.fire('Error!', 'Something Went Wrong!', 'error')
  }
  showExistsTrademark() {
    Swal.fire('Error!', 'Trademark Already Exists!', 'warning')
  }
  addtrademark() {
    if (!this.editData) {
      let CheckExists = false;
      this.ListTrademark.forEach(element => {
        if (this.trademarkForm.value.name == element.name && this.trademarkForm.value.productTypeId == element.productTypeId) {
          this.showExistsTrademark();
          CheckExists = true;
        }

      })
      if (CheckExists == false) {
        this.api.postTrademark(this.trademarkForm.value).subscribe({
          next: (res) => {
            this.showSuccessAlert()
            this.trademarkForm.reset();
            this.dialogRef.close('save');
          },
          error: (err) => {
            this.showErrorAlert();
          }
        })
      }
    } else {
      this.updatetrademark();
    }

  }
  getAllTrademarks() {
    this.api.getAllTrademarks().subscribe({
      next: (res) => {
        this.ListTrademark = res;
      },
      error: (err) => {
        this.showErrorAlert();
      }
    })
  }
  getAllProductTypes() {
    this.api.getAllCategories().subscribe({
      next: (res) => {
        this.ProductType = res;
        console.log(this.ProductType);
      },
      error: (err) => {
        this.showErrorAlert();
      }
    })
  }
  updatetrademark() {
    this.api.updateTrademark(this.trademarkForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          this.showSuccessAlertUpdate();
          this.trademarkForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          this.showErrorAlert();
        }
      })
  }
}
