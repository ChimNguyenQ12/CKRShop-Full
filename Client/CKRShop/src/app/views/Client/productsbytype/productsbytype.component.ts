import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Product } from '../../../_models/product';
import { ApiService } from '../../../Services-Client/services-product/api.service';
import { Observable } from 'rxjs';
import { Type } from 'src/app/_models/type_product';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-products',
  templateUrl: './productsbytype.component.html',
  styleUrls: ['../css/owl.carousel.css',
    '../css/responsive.css',
    '../css/style.css'
  ]
})
export class ProductsByTypeComponent {
  products$: Observable<Product[]>;
  invalidLogin: boolean;
  type : Type;
  id : any;
  idUserLogin: any;
  allwishlist :  any[] = [];
  username: any;

  constructor(private routeC: ActivatedRoute,private cartSrv : ApiService,private route: Router, private http: HttpClient,) {
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
    this.loadProduct();
    this.getAllWishlist();  
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
  loadProduct() {
    //We access the id passed in route. Over here
    this.id = this.routeC.snapshot.paramMap.get("id");
    // this.cartSrv.getProduct(Guid.parse(String(+this.routeC.snapshot.paramMap.get('id')))).subscribe(product => {
    //   this.product = product;
    // })

    this.cartSrv.getAllProductsTypeID(this.id).subscribe(type=>{
      this.type = type;
    });

    this.products$ = this.cartSrv.getAllProductsTypeID(this.id);
  
  }
  public createImgPath = (serverPath: string) => {
    let ImageName = serverPath.replace("C:\\fakepath\\", "");
    if (ImageName == "")
      ImageName = "1.jpg";
    return `https://localhost:44302/api/Upload/GetImageProduct?name=${ImageName}`;

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
}
