import { ApiService } from 'src/app/Services-Admin/services-user-statistics/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'user-statistics.component.html',
  styleUrls: ['user-statistics.component.scss']
})
export class UserStatisticsComponent implements OnInit {
  constructor(private router: Router, private api: ApiService, private JwtHelper: JwtHelperService) {

  }
  numberUsers: any;
  numberStaffs: any;
  numberActive: any;
  numberInactive: any;
  numberLock: any;
  userData = [];

  getCountUsers() {
    this.api.getCountUsers().subscribe({
      next: (res) => {
        this.numberUsers = res;
      },
      error: (err) => {

      }
    })
  }
  getCountStaffs() {
    this.api.getCountStaffs().subscribe({
      next: (res) => {
        this.numberStaffs = res;
      },
      error: (err) => {

      }
    })
  }
  getCountActive() {
    this.api.getCountActive().subscribe({
      next: (res) => {
        this.numberActive = res;
      },
      error: (err) => {

      }
    })
  }
  getCountInactive() {
    this.api.getCountInactive().subscribe({
      next: (res) => {
        this.numberInactive = res;
      },
      error: (err) => {

      }
    })
  }
  getCountLock() {
    this.api.getCountLock().subscribe({
      next: (res) => {
        this.numberLock = res;
        this.userData = [
          { name: "Users", value: this.numberUsers },
          { name: "Staffs", value: this.numberStaffs },
          { name: "Users Active", value: this.numberActive },
          { name: "User Inactive", value: this.numberInactive },
          { name: "User is Locked", value: this.numberLock }
        ];
      },
      error: (err) => {

      }
    })
  }
  ngOnInit(): void {
    this.getCountUsers();
    this.getCountStaffs();
    this.getCountActive();
    this.getCountInactive();
    this.getCountLock();
  }
}
