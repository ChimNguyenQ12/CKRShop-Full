import Swal from 'sweetalert2';
import { Router, CanActivate } from '@angular/router';
import { Component } from '@angular/core';
import Pusher from 'pusher-js';
import { navItems } from './_nav';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {
  checkLogin = false;
  checkType = false;
  public navItems = navItems;
  username: any;
  message = '';
  messages = [{
    'username': '',
    'message': ''
  }];
  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) {
    this.canActivate();
  }
  canActivate() {

    this.checkLogin = false;
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.checkLogin = true;
      return true;
    }
    this.router.navigate(["/login"]);
    return false;
  }
  ngOnInit(): void {
    Pusher.logToConsole = true;

    const pusher = new Pusher('9b672baf68b7cd96a54e', {
      cluster: 'ap1'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data: any) => {
      this.messages.push(data);
    });
  }
  submit(): void {
    this.username = localStorage.getItem("username");
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
