import { ApiService } from 'src/app/Services-Admin/services-comment-statistics/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  templateUrl: 'comment-statistics.component.html',
  styleUrls: ['comment-statistics.component.scss']
})
export class CommentStatisticsComponent implements OnInit {
  constructor(private router: Router, private api: ApiService, private JwtHelper: JwtHelperService) {

  }
  numberComments: any;
  numberExisting: any;
  numberHidden: any;
  numberUserComment: any;
  numberDelete: any;
  commentData = [];
  checkNullComment = false;

  getCountComment() {
    this.api.getCountComments().subscribe({
      next: (res) => {
        this.numberComments = res;
      },
      error: (err) => {

      }
    })
  }
  getCountExisting() {
    this.api.getCountExisting().subscribe({
      next: (res) => {
        this.numberExisting = res;
      },
      error: (err) => {

      }
    })
  }
  getCountHidden() {
    this.api.getCountHidden().subscribe({
      next: (res) => {
        this.numberHidden = res;
      },
      error: (err) => {

      }
    })
  }
  getCountDelete() {
    this.api.getCountDelete().subscribe({
      next: (res) => {
        this.numberDelete = res;
      },
      error: (err) => {

      }
    })
  }
  getCountUserComment() {
    this.api.getCountUserComment().subscribe({
      next: (res) => {
        this.numberUserComment = res;
        this.commentData = [
          { name: "Comments", value: this.numberComments },
          { name: "Existing", value: this.numberExisting },
          { name: "Hidden", value: this.numberHidden },
          { name: "User Comment", value: this.numberUserComment },
          { name: "Deleted", value: this.numberDelete }
        ];
      },
      error: (err) => {

      }
    })
  }
  getAllComment() {
    this.api.getAllComment().subscribe({
      next: (res) => {
        if (res < 1) {
          Swal.fire('Oh..!', 'You dont have any comments', 'info')
          this.checkNullComment = true;
          this.router.navigate(['/comment'])
        }
      },
      error: (err) => {
        Swal.fire('Oh..!', 'You dont have any comments', 'info')
      }
    })
  }
  ngOnInit(): void {
    this.getAllComment();
    if (!this.checkNullComment) {
      this.getCountComment();
      this.getCountExisting();
      this.getCountHidden();
      this.getCountDelete();
      this.getCountUserComment();
    }

  }
}
