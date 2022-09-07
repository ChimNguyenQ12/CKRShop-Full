import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Product } from '../../../_models/product';
import { ApiService } from '../../../Services-Client/services-product/api.service';
import { Observable } from 'rxjs';
import { Guid } from 'guid-typescript';
@Component({
  selector: 'app-products',
  templateUrl: './cart.component.html',
  styleUrls: ['../css/owl.carousel.css',
    '../css/responsive.css',
    '../css/style.css'
  ]
})
export class CartComponent implements OnInit {
  itemsinCart: number;
  products: Product[];
  checkout = false;
  checkstock = false;
  total: number;
  item: Product;
  iscoupon : boolean = false;
  invalidLogin: boolean;
  constructor(private routeC: ActivatedRoute, private cartSrv: ApiService, private route: Router, private http: HttpClient,) {
    this.CartDetails();
    this.check();
    this.Total();
  }

  ngOnInit(): void {
    this.Total();
    this.cartSrv.cartItems.subscribe(cartitems => {
      //Get all items in cart
      this.products = cartitems;
    })
    this.cartSrv.cartItems.subscribe(d => {
      //Get total amount of items in cart
      this.itemsinCart = d.length;
    })

  }

  stockcheck(qty, stock){
    console.log(qty);
    console.log(stock);
    this.Total();
    if(qty==stock){
      return true;
    }
    else
    {
      return false;
    }
  }
  Total(): void {
    this.total = this.getCartDetails[0].qty * this.getCartDetails[0].price;
    for (let i = 1; i < this.getCartDetails.length; i++) {
      this.total = this.getCartDetails[i].qty * this.getCartDetails[i].price + this.total;
    }
  }

  addUp(id, qty): void {
    console.log(id);
    console.log(qty);
    this.Total();
    
    for (let i = 0; i < this.getCartDetails.length; i++) {
      console.log(this.getCartDetails[i]);
      if (this.getCartDetails[i].id === id) {
        if (this.getCartDetails[i].stock > qty) {
          this.getCartDetails[i].qty = parseInt(qty) + 1;
          this.Total();
        }
        if (this.getCartDetails[i].stock == qty) {
          this.checkstock = true;
          this.Total();
        }
      }
    }
    localStorage.setItem('cart', JSON.stringify(this.getCartDetails));
  }
  getCartDetails: any[];
  CartDetails() {
    if (localStorage.getItem('cart')) {
      this.getCartDetails = JSON.parse(localStorage.getItem('cart'));
      // console.log(this.getCartDetails);
    }
  }

  check() {
    if (this.getCartDetails.length > 0) {
      this.checkout = true;
    }
  }

  addDown(id, qty): void {
    console.log(id);
    console.log(qty);
    for (let i = 0; i < this.getCartDetails.length; i++) {
      console.log(this.getCartDetails[i]);
      if (this.getCartDetails[i].id === id) {
        if (this.getCartDetails[i].qty - 1 < 1) {
          this.getCartDetails[i].qty = 1;
          this.Total();
        }
        else {
          this.getCartDetails[i].qty = parseInt(qty) - 1;
          this.Total();
        }
      }
    }
    localStorage.setItem('cart', JSON.stringify(this.getCartDetails));
  }


  couponclick(){
    this.iscoupon=true;
  }

  login(form: NgForm) {
    const credentials = {
      'username': form.value.username,
      'password': form.value.password
    }
    this.http.post("https://localhost:44302/api/authenticate/login", credentials)
      .subscribe({
        next: (res) => {
          console.log(res);
          const token = (<any>res).token;
          localStorage.setItem("jwt", token);
          localStorage.setItem("username", credentials.username);
          this.invalidLogin = false;
          this.route.navigate(['/']);
        },
        error: (err) => {
          this.invalidLogin = true;
        }

      }
      )
  }
  public createImgPath = (serverPath: string) => {
    let ImageName = serverPath.replace("C:\\fakepath\\", "");
    if (ImageName == "")
      ImageName = "1.jpg";
    return `https://localhost:44302/api/Upload/GetImageProduct?name=${ImageName}`;

  }
  _emptyCart() {
    this.cartSrv.emptyCart();
    this.route.navigate(["/home/products"]).then(() => this.route.navigate(["/cart/"]));
  }

  _removeCartItem(id: Guid) {
    this.cartSrv.removeCartItem(id);
    this.route.navigate(["/home/products"]).then(() => this.route.navigate(["/cart/"]));
  }
  gotocheckout(){
    

    this.route.navigate(["/checkout/"]);
  }
}
