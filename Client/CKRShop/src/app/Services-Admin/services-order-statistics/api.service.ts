import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  CountOrder() {
    return this.http.get<any>("https://localhost:44302/api/OrderStatistics/CountOrder");
  }
  CountUserBuy() {
    return this.http.get<any>("https://localhost:44302/api/OrderStatistics/CountUserBuy");
  }
  CountTotal() {
    return this.http.get<any>("https://localhost:44302/api/OrderStatistics/CountTotal");
  }
  CountProductBuy() {
    return this.http.get<any>("https://localhost:44302/api/OrderStatistics/CountProductBuy");
  }
}
