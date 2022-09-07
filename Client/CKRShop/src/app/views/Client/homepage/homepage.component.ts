import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from '../../../_models/product';
import { Image } from '../../../_models/image';
import { Wishlist } from '../../../_models/wishlist';
import { ApiService } from '../../../Services-Client/services-product/api.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-products',
  templateUrl: './homepage.component.html',
  styleUrls: ['../css/owl.carousel.css',
    '../css/responsive.css',
    '../css/style.css'
  ]
})
export class HomePageComponent {
  idUserLogin: any;
  allwishlist :  any[] = [];
  username: any;
  products$: Observable<Product[]>;
  imageComingProduct$: Observable<Image[]>;
  imageAboutUSBanner$: Observable<Image[]>;
  searchtext : any;
  constructor(private cartSrv : ApiService,private route: Router, private http: HttpClient,) {
    this.hi();
    this.CartDetails();
    this.username = localStorage.getItem("username-client");
    this.cartSrv.getAllUsers().subscribe({
      next: (res) => {
        console.log(res);
        for (let a of res) {
          if (a.userName == this.username) {
            this.idUserLogin = a.id;
            console.log(this.idUserLogin);
          }
        }
      }
    });
  }  
  ngOnInit(): void {
    this.getAllWishlist();
    this.products$ = this.cartSrv.getProducts();
    console.log(this.products$);
    this.imageComingProduct$=this.cartSrv.getImageComingProducts();
    this.imageAboutUSBanner$=this.cartSrv.getImageAboutUSBanner();
  }
  checkstock(stock){
    if(stock>0){
      return true;
    }
    else
    {
      return false
    }
  }
  hi() {
    if (!localStorage.getItem('a')) {
      localStorage.setItem('a', 'b')
      location.reload()
    } else {
      localStorage.removeItem('a');
    }
  }
  public createImgPath = (serverPath: string) => {
    let ImageName = serverPath.replace("C:\\fakepath\\", "");
    if (ImageName == "")
      ImageName = "1.jpg";
    return `https://localhost:44302/api/Upload/GetImageProduct?name=${ImageName}`;

  }
  public createImgAdPath = (serverPath: string) => {
    let ImageName = serverPath.replace("C:\\fakepath\\", "");
    if (ImageName == "")
      ImageName = "1.jpg";
    return `https://localhost:44302/api/Upload/GetImageAdvertisement?name=${ImageName}`;

  }

  addToWishlist(idproduct){
    if(this.allwishlist.length<1)
    {
        console.log("Hehe")
        let x: Partial<any> = { "UserId": this.idUserLogin, "ProductId":idproduct,"Status":"1" };
        console.log(x);
        this.cartSrv.postWishlist(x);
        this.getAllWishlist();
    }
    else
    {
      var a = 0;
      for(let i = 0;i<this.allwishlist.length;i++){
      if(this.allwishlist[i].product.id!=idproduct && this.allwishlist[i].status==1)
      {
        
      }
      else
      {
        Swal.fire('Product already exists in wishlist ', 'warning');
        a += 1;
        console.log(a);
      }
    }
    if(a==0)
    {
      let x: Partial<any> = { "UserId": this.idUserLogin, "ProductId":idproduct,"Status":"1" };
        console.log(x);
        this.cartSrv.postWishlist(x);
        this.getAllWishlist();
    }
    }
    
  }

  getAllWishlist() {
    this.cartSrv.getAllUsers().subscribe({
      next: (res) => {
        console.log(res);
        for (let a of res) {
          if (a.userName == this.username) {
            this.idUserLogin = a.id;
            console.log(this.idUserLogin);
            this.cartSrv.getAllWishlist(this.idUserLogin).subscribe({
              next: (res) => {
                this.allwishlist = res;
                console.log(res);
                console.log(this.allwishlist);
              },
              error: (err) => {
              }
            })
            break;
          }
        }
      }
    });
    
  }
  addToCart(product: Product)
  {
   
    let check =0;
    for (let i = 0; i < this.getCartDetails.length; i++) {
      if(product.id === this.getCartDetails[i].id)
      check++;
    }
    if(check>0)
    {
      for (let i = 0; i < this.getCartDetails.length; i++) {
        if (this.getCartDetails[i].id === product.id) {
          if (this.getCartDetails[i].qty < product.stock) {
            this.getCartDetails[i].qty = parseInt(this.getCartDetails[i].qty) + 1;
            Swal.fire('Quantity of product increase 1', 'success');
          }
          if (this.getCartDetails[i].qty >= this.getCartDetails[i].stock) {
            Swal.fire('Stock is over!', 'warning');
          }
        }
        else
        {
         
        }
      }
      localStorage.setItem('cart', JSON.stringify(this.getCartDetails));
    }
    else
    {
      product.qty=1;
      this.cartSrv.addItem(product);
      Swal.fire('Add to cart successfully', 'success');
      this.CartDetails();
    }

    
  }

  getCartDetails: any[];
  CartDetails() {
    if (localStorage.getItem('cart')) {
      this.getCartDetails = JSON.parse(localStorage.getItem('cart'));
      // console.log(this.getCartDetails);
    }
  }
}
