import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Product } from '../../../_models/product';
import { ApiService } from '../../../Services-Client/services-product/api.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['../css/owl.carousel.css',
    '../css/responsive.css',
    '../css/style.css'
  ]
})
export class ProductsComponent {
  products$: Observable<Product[]>;
  idUserLogin: any;
  title: any="All Products";
  allwishlist :  any[] = [];
  username: any;
  public checklist : any[];
  bestsaleproducts$: Observable<Product[]>;
  invalidLogin: boolean;
  constructor(private cartSrv : ApiService,private route: Router, private http: HttpClient,) {
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


    this.checklist=[
      {id:1, value:"All Products", isSelected:true},
      {id:2, value:"New Products", isSelected:false},
      {id:3, value:"Best Sell Products", isSelected:false},
      {id:4, value:"Ascending Price", isSelected:false},
      {id:5, value:"Descending Price", isSelected:false},
    ];
  }

  isAllSelected(item){
    this.checklist.forEach(val=>{
      if(val.id==item.id) val.isSelected = !val.isSelected;
      else{
        val.isSelected=false;
      }
    });
    this.checklist.forEach(val=>{
      console.log(item.id);
      if(item.id=="2") 
      {
        this.title="All New Products"
        this.products$ = this.cartSrv.getAllNewProducts();
      }
      else if(item.id=="3"){
        this.title="All Best Seller Products"
        this.products$ = this.cartSrv.getAllBestSellerProducts();
      }
      else if(item.id=="1")
      {
        this.title="All Products"
        this.products$ = this.cartSrv.getProducts();
      }
      else if(item.id=="4")
      {
        this.title="All Ascending Products"
        this.products$ = this.cartSrv.GetAllAscendingProducts();
      }
      else if(item.id=="5")
      {
        this.title="All Descending Products"
        this.products$ = this.cartSrv.GetAllDescendingProducts();
      }else 
      {
        this.title="All Products"
        this.products$ = this.cartSrv.getProducts();
      }
    });
   
  }

  ngOnInit(): void {
    this.getAllWishlist();
    this.products$ = this.cartSrv.getProducts();
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
checkboxcheck(){
  var News = <HTMLInputElement> document.getElementById("cbNews");
  var BestSell = <HTMLInputElement> document.getElementById("cbBestSell");
  var Ascending = <HTMLInputElement> document.getElementById("cbAscending");
  var Descending = <HTMLInputElement> document.getElementById("cbDescending");

  if(News.checked)
  {
    BestSell.checked = false;
    Ascending.checked=false;
    Descending.checked=false;
  }

  if(BestSell.checked)
  {
    News.checked = false;
    Ascending.checked=false;
    Descending.checked=false;
  }

  if(Ascending.checked)
  {
    News.checked = false;
    BestSell.checked=false;
    Descending.checked=false;
  }

  if(Descending.checked)
  {
    News.checked = false;
    Ascending.checked=false;
    BestSell.checked=false;
  }
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
