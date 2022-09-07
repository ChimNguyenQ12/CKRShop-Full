import { ApiService } from './../../../Services-Admin/services-product-statistics/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'product-statistics.component.html',
  styleUrls: ['product-statistics.component.scss']
})
export class ProductStatisticsComponent implements OnInit {
  constructor(private api: ApiService, private router: Router, private JwtHelper: JwtHelperService) {
  }
  productData = [
  ];
  BestSelling = [
  ];
  countProduct: any;
  categoryName: any;
  ngOnInit(): void {
    this.getProduct();
    this.getCategory();
    this.getBestSelling();
  }

  getProduct() {
    this.api.getProducts().subscribe({
      next: (res) => {
        res.forEach(item => {
          this.productData.push({
            "name": item.name,
            "value": item.stock,
          })
        });
        this.productData = [...this.productData];
      },
      error: (err) => {

      }
    })
  }
  getBestSelling() {
    this.api.getBestSellingProduct().subscribe({
      next: (res) => {
        res.forEach(item => {
          this.BestSelling.push({
            "name": item.product.name,
            "value": item.quantity,
          })
        });
        this.BestSelling = [...this.BestSelling];
      },
      error: (err) => {

      }
    })
  }
  getCategory() {
    this.api.getCategories().subscribe({
      next: (res) => {
        for (let a of res) {
          a.categoryName = a.name;
          console.log(a.categoryName);
        }
      },
      error: (err) => {

      }
    })
  }
}
