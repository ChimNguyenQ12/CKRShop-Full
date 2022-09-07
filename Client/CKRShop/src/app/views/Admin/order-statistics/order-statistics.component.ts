import { ApiService } from 'src/app/Services-Admin/services-order-statistics/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'order-statistics.component.html',
  styleUrls: ['order-statistics.component.scss']
})
export class OrderStatisticsComponent implements OnInit {
  constructor(private router: Router, private api: ApiService, private JwtHelper: JwtHelperService) {

  }
  numberOders: any;
  numberUserBuy: any;
  numberTotal: any;
  numberProductBuy: any;
  orderData = [];

  getCountOrders() {
    this.api.CountOrder().subscribe({
      next: (res) => {
        this.numberOders = res;
      },
      error: (err) => {

      }
    })
  }
  getCountUserBuy() {
    this.api.CountUserBuy().subscribe({
      next: (res) => {
        this.numberUserBuy = res;
      },
      error: (err) => {

      }
    })
  }
  getCountTotal() {
    this.api.CountTotal().subscribe({
      next: (res) => {
        this.numberTotal = res;
      },
      error: (err) => {

      }
    })
  }
  getCountProductBuy() {
    this.api.CountProductBuy().subscribe({
      next: (res) => {
        this.numberProductBuy = res;
        this.orderData = [
          { name: "Number of Orders", value: this.numberOders },
          { name: "Number of Shoppers", value: this.numberUserBuy },
          { name: "Total Revenue ", value: this.numberTotal },
          { name: "Number of Products Sold", value: this.numberProductBuy },
        ];
      },
      error: (err) => {

      }
    })
  }
  ngOnInit(): void {
    this.getCountOrders();
    this.getCountUserBuy();
    this.getCountTotal();
    this.getCountProductBuy();
  }
}
