import { ApiService } from '../../../../Services-Admin/services-advertisement/api.service';
import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-advertisement-dialog',
  templateUrl: './advertisement-dialog.component.html',
  styleUrls: ['./advertisement-dialog.component.scss']
})
export class AdvertisementDialogComponent implements OnInit {
  Advertisement: any[] = [];
  CategoryName: any[] = [];
  progress !: number;
  message !: string;
  srcResult: any = null;
  statusList = [1, 2];
  advertisementForm !: FormGroup;
  actionBtn: string = "Add";
  @Output() public onUploadFinished = new EventEmitter();
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    private http: HttpClient,
    private dialogRef: MatDialogRef<AdvertisementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
  ) { }

  ngOnInit(): void {
    this.getAllImageTypes();
    this.getAllAdvertisement();
    this.getAllImageTypes();
    this.advertisementForm = this.formBuilder.group({
      imageTypeId: ['', Validators.required],
      status: ['', Validators.required],
      image: ['', Validators.required],

    });
    if (this.editData) {
      this.actionBtn = "Update";
      this.advertisementForm.controls['imageTypeId'].setValue(this.editData.imageTypeId);
      this.advertisementForm.controls['status'].setValue(this.editData.status);
      this.advertisementForm.controls['image'].setValue(this.editData.image);

    }

  }
  showSuccessAlert() {
    Swal.fire('Successful!', 'Image Added Successfully!', 'success')
  }
  showSuccessAlertUpdate() {
    Swal.fire('Successful!', 'Image Updated Successfully!', 'success')
  }
  showErrorAlert() {
    Swal.fire('Error!', 'Something Went Wrong!', 'error')
  }
  getAllAdvertisement() {
    this.api.getAllAdvertisements().subscribe({
      next: (res) => {
        this.Advertisement = res;
      }
    })
  }
  addAdvertisement() {
    this.getAllImageTypes();
    this.getAllImageTypes();
    if (!this.editData) {
      if (this.advertisementForm.valid) {
        this.api.postAdvertisement(this.advertisementForm.value).subscribe({
          next: (res) => {
            this.showSuccessAlert()
            this.advertisementForm.reset();
            this.dialogRef.close('save');
          },
          error: (err) => {
            this.showErrorAlert();
          }
        })
      }
    }
    else {
      this.updateAdvertisement();
    }

  }
  getAllImageTypes() {
    this.api.getAllImageTypes().subscribe({
      next: (res) => {
        this.CategoryName = res;
        //   for (let a of this.CategoryName) {
        //     for (let b of this.Advertisement) {
        //       if (a.id == b.imageTypeId) {
        //         b.Advertisement = a.typeName;
        //         console.log(b.Advertisement);
        //       }
        //     }
        //   }
        console.log(this.CategoryName);
      },
      error: (err) => {
        this.showErrorAlert();
      }
    })
  }

  updateAdvertisement() {
    this.getAllImageTypes();
    this.getAllImageTypes();
    this.api.updateAdvertisement(this.advertisementForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          this.showSuccessAlertUpdate();
          this.advertisementForm.reset();
          this.dialogRef.close('update');
          this.getAllImageTypes();
          this.getAllImageTypes();
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
            this.advertisementForm.controls['image'].setValue(fileToUpload.name);
            // Suc manh toi thuong
            this.message = 'Upload success.';

            this.onUploadFinished.emit(event.body);
          }
        },
        error: (err: HttpErrorResponse) => console.log(err)
      });
  }


}
