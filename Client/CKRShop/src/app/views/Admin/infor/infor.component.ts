import { ApiService } from 'src/app/Services-Admin/services-user/api.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-infor',
  templateUrl: './infor.component.html',
  styleUrls: ['./infor.component.scss']
})
export class InforComponent {
  roleCurrent: any;
  userId: any;
  userRole: any;
  userCurrent: any;
  fullName: any;
  userName: any;
  email: any;
  phoneNumber: any;
  address: any;
  avatar: any;
  role: any;
  constructor(private route: Router, private http: HttpClient, private api: ApiService, private router: Router) {
    this.getUserRole();
    this.getRole();
    this.getUser();
    this.getUserRole();
    this.getRole();
  }

  getUser() {
    this.userName = localStorage.getItem("username");
    this.api.getUserByUsername(this.userName).subscribe({
      next: (res) => {
        this.userCurrent = res;
        this.userId = this.userCurrent.id;
        this.userName = this.userCurrent.userName;
        this.fullName = this.userCurrent.fullName;
        this.email = this.userCurrent.email;
        this.phoneNumber = this.userCurrent.phoneNumber;
        this.address = this.userCurrent.address;
        this.avatar = this.userCurrent.avatar;
      },
      error: (err) => {

      }
    })
  }
  getRole() {
    this.getUserRole();
    this.api.getAllRoles().subscribe({
      next: (res) => {
        this.role = res;
        for (let a of this.userRole) {
          if (a.userId == this.userId) {
            for (let c of this.role) {
              if (a.roleId == c.id) {
                this.roleCurrent = c.name;
                console.log(this.roleCurrent);
                if (this.roleCurrent == "Customer") {
                  Swal.fire('Error!', 'You do not have access!', 'error');
                  localStorage.clear();
                  this.router.navigate(["/login"]);
                }
              }
            }
          }
        }
      },
      error: (err) => {

      }
    })
  }
  getUserRole() {
    this.api.getAllUserRoles().subscribe({
      next: (res) => {
        this.userRole = res;
      },
      error: (err) => {

      }
    })
  }
  logOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    this.router.navigate(['login'])
  }

  public createImgPath = () => {
    if (this.avatar == null) {
      this.avatar = "no_image.jpg";
      return `https://localhost:44302/api/Upload/GetImageUser?name=${this.avatar}`;
    }
    let ImageName = this.avatar.replace("C:\\fakepath\\", "");
    if (ImageName == "")
      ImageName = "no_image.jpg";
    return `https://localhost:44302/api/Upload/GetImageUser?name=${ImageName}`;

  }
}
