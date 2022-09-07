import { ApiService } from './../../../../Services-Admin/services-order/api.service';
import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-order-confirmed-dialog',
  templateUrl: './order-confirmed-dialog.component.html',
  styleUrls: ['./order-confirmed-dialog.component.scss']
})
export class OrderConfirmedDialogComponent implements OnInit {
  code: any;
  id: any;
  user: any[] = [];
  product: any[] = [];
  fullname: any[] = [];
  statusList = [1, 2, 3, 4, 5, 6, 7];
  orderForm !: FormGroup;
  @Output() public onUploadFinished = new EventEmitter();
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    private http: HttpClient,
    private dialogRef: MatDialogRef<OrderConfirmedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllProducts();
    this.orderForm = this.formBuilder.group({
      status: ['',],
      id: ['',],
      code: [''],
    });
    if (this.editData) {
      this.orderForm.controls['status'].setValue(this.editData.status);
      this.orderForm.controls['id'].setValue(this.editData.id);
      this.orderForm.controls['code'].setValue(this.editData.code);
    }

  }
  showSuccessAlertUpdate() {
    Swal.fire('Successful!', 'Order Updated successfully!', 'success')
  }
  showErrorAlert() {
    Swal.fire('Error!', 'Something went wrong!', 'error')
  }
  updateOrder() {
    console.log(this.editData.id);
    this.api.updateOrder(this.editData.id, this.orderForm.value)
      .subscribe({
        next: (res) => {
          this.showSuccessAlertUpdate();
          this.orderForm.reset();
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
    this.api.getAllOrdersDetail(this.editData.id).subscribe({
      next: (res) => {
        this.product = res;
        console.log(this.product);
      },
      error: (err) => {
        this.showErrorAlert();
      }
    })
  }

}
