import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Product } from '../../../_models/product';
import { Invoice } from '../../../_models/invoice';
import { InvoiceDetail } from '../../../_models/invoicedetail';
import { User } from '../../../_models/user';
import { ApiService } from '../../../Services-Client/services-product/api.service';
import { Observable } from 'rxjs';
import { Coupon } from '../../../_models/coupon';
import { Guid } from 'guid-typescript';
import Swal from 'sweetalert2';
import { DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';
import { render} from 'creditcardpayments/creditCardPayments';
import { cibWindows } from '@coreui/icons';
@Component({
  selector: 'app-products',
  templateUrl: './checkout.component.html',
  styleUrls: ['../css/owl.carousel.css',
    '../css/responsive.css',
    '../css/style.css'
  ]
})
export class CheckoutComponent implements OnInit {
  province : string;
  spacebetween : string =", ";
  iscouponfalse : boolean = false;
  itemsinCart: number;
  products: Product[];
  products$: Observable<Product[]>;
  coupon : any;
  username: any;
  usernamelocalstorage: any;
  user$: Observable<User[]>;
  iscoupon : boolean = false;
  total: number;
  checkLogin = false;
  invoice: Invoice[];
  userid: string;
  invalidLogin: boolean;
  userList: any[];
  idUserLogin: any;
  idInvoice: number;
  discount : boolean = false;
  ShippingAddress: string = "";
  allcoupon :  Coupon[] = [];
  ShippingPhone: string = "";
  couponinput : any;
  discountpercent : any;
  applycoupon : boolean = false;
  constructor(private routeC: ActivatedRoute, private cartSrv: ApiService, private route: Router, private http: HttpClient,) {
    // render({
    //   id: "#paypal-button",
    //   currency:"USD",
    //   value:"100.00",
    //   onApprove:(details)=>{
    //     alert("Transaction Successfull");
    //   }
    // });
    this.CartDetails();
    this.Total();
    this.username = localStorage.getItem("username-client");
    this.products$ = this.cartSrv.getAllProductsClient();
    this.coupon = this.cartSrv.getAllCoupon();
    if (this.username != null) {
      this.checkLogin = true;
    }
    this.cartSrv.getAllUsers().subscribe({
      next: (res) => {
        for (let a of res) {
          if (a.userName == this.username) {
            this.idUserLogin = a.id;
          }
        }
      }
    });


     this.cartSrv.getLatestInvoice().subscribe({
      next: (res) => {
        console.log(res);
        for (let a of res) {
          // if (a.id === undefined) {
          //   this.idInvoice = 1;
          // }
          // else {
            this.idInvoice = parseInt(a.id) + 1;
            console.log(this.idInvoice);
          // }
        }
      }
    });
  }
  @ViewChild('paypalRef', {static:true}) private paypalRef : ElementRef;
  ngOnInit(): void {
   


    window.paypal.Buttons(
      {
        style:{
          layout:'horizontal',
          color:'blue',
          shape:'rect',
          label:'paypal',
        },     
        createOrder:(data,actions)=>{
          return actions.order.create({
            purchase_units:[
              {
                amount:{
                  value:this.total,
                  currency_code:'USD',
                }
              }
            ]
          })
        },
        onApprove:(data,actions)=>{
            this._makePurchase();
            setTimeout(()=>{                           // <<<---using ()=> syntax
              this._makeInvoiceDetail();
          }, 3000)            
          return actions.order.capture().then(function(details){             
            Swal.fire('Transaction Completed', 'success'); 
            
          });
        },
        onError:error=>{
          console.log(error);
        },
        onCancel: function(data){       
        },
      }).render(this.paypalRef.nativeElement);
    this.getAllCoupon();
    this.cartSrv.cartItems.subscribe(cartitems => {
      //Get all items in cart
      this.products = cartitems;
    })
    this.cartSrv.cartItems.subscribe(d => {
      //Get total amount of items in cart
      this.itemsinCart = d.length;
    })
  }
  getAllCoupon() {


    this.cartSrv.getAllCoupon().subscribe({
      next: (res) => {

        this.allcoupon = res;
      },
      error: (err) => {

      }
    })
  }

  purchase(){
    this.ShippingAddress = (<HTMLInputElement>document.getElementById("ShippingAddress")).value;
    this.ShippingPhone = (<HTMLInputElement>document.getElementById("ShippingPhone")).value;
    if(this.ShippingAddress =="" || this.ShippingPhone=="")
    {
      Swal.fire('Enter full information, please', 'warning');   
    }
    else
    {
      this._makePurchase();
      setTimeout(()=>{                           // <<<---using ()=> syntax
      this._makeInvoiceDetail();
  }, 3000)   
    }
         
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
  getCartDetails: any[];
  CartDetails() {
    if (localStorage.getItem('cart')) {
      this.getCartDetails = JSON.parse(localStorage.getItem('cart'));
    }
  }
  Total(): void {
    this.total = this.getCartDetails[0].qty * this.getCartDetails[0].price;
    for (let i = 1; i < this.getCartDetails.length; i++) {
      this.total = this.getCartDetails[i].qty * this.getCartDetails[i].price + this.total;
    }
  }

  _makePurchase() {
    this.province = (<HTMLInputElement>document.getElementById("slProvince")).value;
    this.ShippingAddress = (<HTMLInputElement>document.getElementById("ShippingAddress")).value;
    let address =  (this.ShippingAddress.concat(this.spacebetween.toString())).concat(this.province.toString());
    this.ShippingPhone = (<HTMLInputElement>document.getElementById("ShippingPhone")).value;
    console.log(address);
     let x: Partial<Invoice> = { userid: this.idUserLogin, shippingAddress: address, shippingPhone: this.ShippingPhone, total: this.total };
     this.cartSrv.makePurchase(x);


  }
  _makeInvoiceDetail() {
    for (let i = 0; i < this.getCartDetails.length; i++) {
      let product: Partial<any> = { "sku": this.getCartDetails[i].sku, "name": this.getCartDetails[i].name, "branch": this.getCartDetails[i].branch, "description": this.getCartDetails[i].description, "price": this.getCartDetails[i].price, "productTypeId": this.getCartDetails[i].productTypeId, "image": this.getCartDetails[i].image, "createdAt": this.getCartDetails[i].createdAt, "status": this.getCartDetails[i].status, "stock": this.getCartDetails[i].stock - this.getCartDetails[i].qty };
      console.log(product);
      console.log(this.getCartDetails[i].id);
      this.cartSrv.updateProductCheckout(product, this.getCartDetails[i].id);
      let detail: Partial<InvoiceDetail> = { invoiceid: this.idInvoice, productid: this.getCartDetails[i].id, quantity: this.getCartDetails[i].qty, unitprice: this.getCartDetails[i].price };
      this.cartSrv.makeInvoiceDetail(detail);
    }
  }
  couponclick(){
    this.iscoupon=true;
  }

  dontusecouponclick(){
    this.iscoupon=false;
    this.applycoupon=false;
    this.discount =false;
    this.discountpercent = 0;
    this.Total();
  }


  coupondiscount(){
  
    this.couponinput = (<HTMLInputElement>document.getElementById("CouponCode")).value
    for (let i = 0; i < this.allcoupon.length; i++) {
      if( this.couponinput == this.allcoupon[i].code)
      {
        this.applycoupon=true;
        this.discount=true;
        this.iscouponfalse = false;
        this.discountpercent = this.allcoupon[i].discount;
        this.total = this.total * this.discountpercent / 100;
      }
      else{
        this.iscouponfalse = true;
      }
    }
   
  }

  public createImgPath = (serverPath: string) => {
    let ImageName = serverPath.replace("C:\\fakepath\\", "");
    if (ImageName == "")
      ImageName = "1.jpg";
    return `https://localhost:44302/api/Upload/GetImageProduct?name=${ImageName}`;

  }
  _emptyCart() {
    this.cartSrv.emptyCart();
  }

  _removeCartItem(id: Guid) {
    this.cartSrv.removeCartItem(id);
  }
}
