import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postTrademark(data: any) {
    return this.http.post<any>("https://localhost:44302/api/TradeMark/AddTradeMark/", data)
  }
  updateTrademark(data: any, id: string) {
    return this.http.put<any>("https://localhost:44302/api/TradeMark/UpdateTradeMark/?id=" + id, data,);
  }
  deleteTrademark(id: string) {
    return this.http.delete<any>("https://localhost:44302/api/TradeMark/DeleteTradeMark?id=" + id);
  }
  getAllTrademarks() {
    return this.http.get<any>("https://localhost:44302/api/TradeMark/GetAllTradeMarks",);
  }
  getAllCategories() {
    return this.http.get<any>("https://localhost:44302/api/ProductType/GetAllProductTypes",);
  }
}
