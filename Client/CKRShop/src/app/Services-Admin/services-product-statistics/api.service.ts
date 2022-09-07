import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  getCountProduct() {
    return this.http.get<any>("https://localhost:44302/api/ProductStatistics/CountProductByCategory");
  }
  getProducts() {
    return this.http.get<any>("https://localhost:44302/api/Product/GetAllProducts/");
  }
  getCategories() {
    return this.http.get<any>("https://localhost:44302/api/ProductType/GetAllProductTypes/");
  }
  getCountCategories() {
    return this.http.get<any>("https://localhost:44302/api/ProductStatistics/CountCategories");
  }
  getCountProducts() {
    return this.http.get<any>("https://localhost:44302/api/ProductStatistics/CountProducts");
  }
  getSumStocks() {
    return this.http.get<any>("https://localhost:44302/api/ProductStatistics/SumStocks");
  }
  getCountTrademarks() {
    return this.http.get<any>("https://localhost:44302/api/ProductStatistics/CountTrademarks");
  }
  getBestSellingProduct() {
    return this.http.get<any>("https://localhost:44302/api/ProductStatistics/GetBestSellingProduct");
  }
}
