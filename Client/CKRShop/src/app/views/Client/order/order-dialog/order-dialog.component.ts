import { ApiService } from './../../../../Services-Admin/services-order/api.service';
import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss']
})
export class OrderDialogComponent implements OnInit {
  checkStatus = false;
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
    private dialogRef: MatDialogRef<OrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
  ) { }

  ngOnInit(): void {
    this.checkStatus = false;
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
    if (this.editData.status == 4 || this.editData.status == 5 || this.editData.status == 6) {
      this.checkStatus = true;
    }
  }
  showSuccessAlertUpdate() {
    Swal.fire('Successful!', 'Order Updated successfully!', 'success')
  }
  showSuccessAlertCanceled() {
    Swal.fire('Successful!', 'Order Canceled successfully!', 'success')
  }
  showErrorAlert() {
    Swal.fire('Error!', 'Something went wrong!', 'error')
  }
  ConfirmCancel() {
    Swal.fire({
      title: 'Are You Sure?',
      text: 'This order will be cancelled!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Cancel Order!',
      cancelButtonText: 'No, Keep Order',
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.cancelOrder(this.editData.id)
          .subscribe({
            next: (res) => {
              this.getAllUsers();
              this.orderForm.reset();
              this.dialogRef.close('update');
            },
            error: (err) => {
              this.showErrorAlert();
            }
          })
        this.showSuccessAlertCanceled();

      } else if (result.isDismissed) {

        console.log('Product is safe!');

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
  cancelOrder() {
    this.ConfirmCancel();
  }
  public createImgPath = (serverPath: string) => {
    if (serverPath == null) {
      serverPath = "no_image.jpg";
      return `https://localhost:44302/api/Upload/GetImageProduct?name=${serverPath}`;
    }
    let ImageName = serverPath.replace("C:\\fakepath\\", "");
    if (ImageName == "")
      ImageName = "no_image.jpg";
    return `https://localhost:44302/api/Upload/GetImageProduct?name=${ImageName}`;

  }
}
