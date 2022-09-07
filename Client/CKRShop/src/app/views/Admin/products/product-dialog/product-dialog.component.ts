import { ApiService } from 'src/app/Services-Admin/services-product/api.service';
import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {
  public Editor = ClassicEditor;
  ProductTypeCurrent: any;
  Check: boolean = true;
  ProductTypeIdValue: string;
  ListTrademark: any[] = [];
  CheckExistsUser: any;
  CheckExistsEmail: any;
  ListProduct: any;
  progress !: number;
  message !: string;
  srcResult: any = null;
  productType: any[] = [];
  statusList = [1, 2, 3, 4, 5, 6];
  productForm !: FormGroup;
  actionBtn: string = "Add";
  empList: Array<string> = [];
  @Output() public onUploadFinished = new EventEmitter();
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    private http: HttpClient,
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
  ) { }

  ngOnInit(): void {

    this.getAllProductTypes();
    this.getAllProducts();
    this.getAllTrademarks();
    this.productForm = this.formBuilder.group({
      sku: ['', Validators.required],
      name: ['', Validators.required],
      productTypeId: ['', Validators.required],
      status: ['', Validators.required],
      stock: ['', Validators.required,],
      branch: ['', Validators.required],
      price: ['', Validators.required],
      description: ['',],
      image: ['',],
    });
    if (this.editData) {
      this.actionBtn = "Update";
      this.productForm.controls['sku'].setValue(this.editData.sku);
      this.productForm.controls['name'].setValue(this.editData.name);
      this.productForm.controls['productTypeId'].setValue(this.editData.productTypeId);
      this.productForm.controls['status'].setValue(this.editData.status);
      this.productForm.controls['stock'].setValue(this.editData.stock);
      this.productForm.controls['branch'].setValue(this.editData.branch);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['description'].setValue(this.editData.description);
      // Get old image, unless error api cause url image  = ""
      this.productForm.controls['image'].setValue(this.editData.image);

    }

    if (this.productForm.controls['sku'].value != "") {
      this.Check = false;
    }
    this.ProductTypeCurrent = this.editData.productTypeId;
    this.getAllProductTypes();
    this.getAllProducts();
    this.getAllTrademarks();
  }
  showSuccessAlert() {
    Swal.fire('Successful!', 'Product Added Successfully!', 'success')
  }
  showSuccessAlertUpdate() {
    Swal.fire('Successful!', 'Product Updated Successfully!', 'success')
  }
  showErrorAlert() {
    Swal.fire('Error!', 'Something Went Wrong!', 'error')
  }
  showExistsProduct() {
    Swal.fire('Error!', 'SKU Already Exists!', 'warning')
  }
  addProduct() {

    if (!this.editData) {
      console.log(this.editData)
      let CheckExistsSku = false;
      this.ListProduct.forEach(element => {
        if (this.productForm.value.sku == element.sku) {
          this.showExistsProduct();
          CheckExistsSku = true;
        }

      })
      if (CheckExistsSku == false) {
        console.log(this.productForm.value)
        this.api.postProduct(this.productForm.value).subscribe({
          next: (res) => {
            this.showSuccessAlert()
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: (err) => {
            this.showErrorAlert();
          }
        })
      }
    }
    else {

      this.updateProduct();
    }

  }
  getAllProductTypes() {
    this.api.getCategories().subscribe({
      next: (res) => {
        this.productType = res;
      },
      error: (err) => {
        this.showErrorAlert();
      }
    })
  }
  getAllProducts() {
    this.api.getProducts().subscribe({
      next: (res) => {
        this.ListProduct = res;
      },
      error: (err) => {
        this.showErrorAlert();
      }
    })
  }
  getValue(onChangeValue) {
    this.ProductTypeIdValue = onChangeValue;
    this.getAllTrademarks();
  }
  getAllTrademarks() {
    if (this.ProductTypeIdValue == null) {
      this.ProductTypeIdValue = this.ProductTypeCurrent;
    }
    this.api.getAllTrademarks(this.ProductTypeIdValue).subscribe({
      next: (res) => {
        this.ListTrademark = res;
      },
      error: (err) => {

      }
    })
  }
  updateProduct() {

    this.api.updateProduct(this.productForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          this.showSuccessAlertUpdate();
          this.productForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          this.showErrorAlert();
        }
      })
  }
  //test 
  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
  //test
  jpgInputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
  }

  //real
  uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    for (let a of files) {
      this.empList.push(a.name);
      console.log(this.empList.toString());

    }
    this.productForm.controls['image'].setValue(this.empList.toString());
    let filesToUpload: File[] = files;
    const formData = new FormData();

    Array.from(filesToUpload).map((file, index) => {
      return formData.append('file' + index, file, file.name);

    });
    this.http.post('https://localhost:44302/api/Upload/UploadProduct', formData, { reportProgress: true, observe: 'events' })
      .subscribe(
        {
          next: (event) => {
            if (event.type === HttpEventType.UploadProgress)
              this.progress = Math.round(100 * event.loaded / event.total);
            else if (event.type === HttpEventType.Response) {
              this.message = 'Upload success.';
              this.onUploadFinished.emit(event.body);
            }
          },
          error: (err: HttpErrorResponse) => console.log(err)
        });

    // let fileToUpload = <File>files[0];
    // const formData = new FormData();
    // formData.append('file' +index, fileToUpload, fileToUpload.name);

    // this.api.uploadFile(formData, { reportProgress: true, observe: 'events' })
    //   .subscribe({
    //     next: (event) => {
    //       if (event.type === HttpEventType.UploadProgress) {
    //         if (event.total) {
    //           const total: number = event.total;
    //           this.progress = Math.round(100 * event.loaded / total);
    //         }
    //       }
    //       else if (event.type === HttpEventType.Response) {
    //         // Suc manh toi thuong
    //         this.productForm.controls['image'].setValue(fileToUpload.name);
    //         // Suc manh toi thuong
    //         this.message = 'Upload success.';

    //         this.onUploadFinished.emit(event.body);
    //       }
    //     },
    //     error: (err: HttpErrorResponse) => console.log(err)
    //   });
  }


}
