import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Type } from '../../../_models/type_product';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/Services-Client/services-product/api.service';
import { Observable } from 'rxjs';
import Pusher from 'pusher-js';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['../css/owl.carousel.css',
    '../css/responsive.css',
    '../css/style.css'
  ]
})
export class IndexComponent {
  types$: Observable<Type[]>;
  itemsinCart: number;
  username: any;
  checkLogin = false;
  message = '';
  checkType = false;
  searchtext : any;
  messages = [{
    'username': '',
    'message': ''
  }]
  constructor(public cartSvc: ApiService, private router: Router, private http: HttpClient) {
    this.username = localStorage.getItem("username-client");
    if (this.username != null) {
      this.checkLogin = true;
      this.router.navigate(["/"]);
    }

  }
  changeType(id) {
    this.router.navigate(["/home/products"]).then(() => this.router.navigate(["/producttype/" + id]));

  }
  ngOnInit(): void {

    this.types$ = this.cartSvc.getAllProductsTypeClient();
    this.cartSvc.cartItems.subscribe(d => {
      //Get total amount of items in cart
      this.itemsinCart = d.length;
    })

    Pusher.logToConsole = true;

    const pusher = new Pusher('9b672baf68b7cd96a54e', {
      cluster: 'ap1'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data: any) => {
      this.messages.push(data);
    });
  }
  searchProduct(){
    this.searchtext = (<HTMLInputElement>document.getElementById("searchtext")).value;
    if(this.searchtext == "")
    {
      Swal.fire('Search Text Is Not Valid!', 'warning');
    }
    else
    {
      this.router.navigate(["/home/products"]).then(() => this.router.navigate(['/searchproducts/'+this.searchtext]));
      
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
  ConfirmLogout() {
    Swal.fire({
      title: 'Are You Sure?',
      text: 'Are you sure you will log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Logout!',
      cancelButtonText: 'No, Back to shop!',
    }).then((result) => {

      if (result.isConfirmed) {
        this.router.navigate(["/"]);
        localStorage.removeItem("jwt-client");
        localStorage.removeItem("username-client");
        this.hi();
      } else if (result.isDismissed) {
        this.router.navigate(["/"]);
        console.log('Hi!');

      }
    })
  }
  logout() {
    this.ConfirmLogout();
  }
  openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  closeForm() {
    document.getElementById("myForm").style.display = "none";
  }
  submit() {
    console.log(this.username);
    const credential = {
      username: this.username,
      message: this.message
    }
    console.log(credential);
    this.http.post('https://localhost:44302/api/Chat/messages', credential).subscribe({
      next: (res) => {
        this.message = ''
        this.checkType = false;
      }
    });
  }

  check() {
    if (this.message == '') {
      this.checkType = true;
    }
  }
}
