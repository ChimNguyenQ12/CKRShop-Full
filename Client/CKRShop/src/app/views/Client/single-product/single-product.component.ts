import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Product } from '../../../_models/product';
import { ApiServiceComment } from './../../../Services-Client/services-comment/api.service';
import { ApiService } from '../../../Services-Client/services-product/api.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-products',
  templateUrl: './single-product.component.html',
  styleUrls: ['../css/owl.carousel.css',
    '../css/responsive.css',
    '../css/style.css'
  ]
})
export class SingleProductComponent implements OnInit {
  checkTyped = false;
  content: string;
  userCurrent: string;
  userId: string;
  listComment: any[] = [];
  listUser: any[] = [];
  product: Product;
  id: any;
  checkstock = true;
  allwishlist :  any[] = [];
  username: any;
  idUserLogin: any;
  description: string;
  slides: any[] = new Array(3).fill({ id: -1, src: '', title: '', subtitle: '' });
  invalidLogin: boolean;
  constructor(private routeC: ActivatedRoute,private apiCmt: ApiServiceComment, private cartSrv: ApiService, private route: Router, private http: HttpClient,) {
   this.CartDetails();
    this.loadProduct();
    this.username = localStorage.getItem("username-client");
    this.cartSrv.getAllUsers().subscribe({
      next: (res) => {
        console.log(res);
        for (let a of res) {
          if (a.userName == this.username) {
            this.idUserLogin = a.id;
          }
        }
      }
    });   
  }

  ngOnInit(): void {
    this.getAllWishlist();
    this.getAllUsers();
    this.getAllComments();

  }

  loadProduct() {

    //We access the id passed in route. Over here
    this.id = this.routeC.snapshot.paramMap.get("id");
    console.log(this.id);
    // this.cartSrv.getProduct(Guid.parse(String(+this.routeC.snapshot.paramMap.get('id')))).subscribe(product => {
    //   this.product = product;
    // })

    this.cartSrv.getProduct(this.id).subscribe(product => {
      this.product = product;
      var image = this.product.image.split(",");
      for (let i = 0; i < image.length; i++) {
        this.slides[i] = {
          src: this.createImgPath(image[i]),
        };
      }
      if (this.product.stock == 0) {
        this.checkstock = false;
      }
      this.description = this.product.description.replace("<p>", "").replace("</p>", "");
    });

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
  //Function to add Product to cart
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
  getAllComments() {
    this.apiCmt.getAllComments(this.id).subscribe({
      next: (res) => {
        this.listComment = res;
      },
      error: (err) => {

      }
    })
  }
  getAllUsers() {
    var username;
    if (localStorage.getItem("username-client") != null) {
      username = localStorage.getItem("username-client")
    }
    else if (localStorage.getItem("username") != null) {
      username = localStorage.getItem("username");
    }
    this.apiCmt.getAllUsers().subscribe({
      next: (res) => {
        this.listUser = res;
        for (let a of this.listUser) {
          if (a.userName == username) {
            this.userCurrent = a.avatar;
            this.userId = a.id;
          }
        }
      },
      error: (err) => {

      }
    })
  }

  add(form: NgForm) {
    this.checkTyped = false;
    this.content = form.value.content;
    if (this.content) {
      this.checkTyped = true;
    }
    const data = {
      "UserId": this.userId,
      "Content": this.content,
      "ProductId": this.id
    }
    this.apiCmt.addComment(data).subscribe({
      next: (res) => {
        this.getAllComments();
      }
      , error: (err) => {
      }
    })
    form.reset();
  }
}
