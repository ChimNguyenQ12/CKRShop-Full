import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }
  getAllComments() {
    return this.http.get<any>("https://localhost:44302/api/Comment/GetAllComments/");
  }
  deleteComment(id: string) {
    return this.http.delete<any>("https://localhost:44302/api/Comment/DeleteComment?id=" + id);
  }
  updateComment(data: any, id: string) {
    return this.http.put<any>("https://localhost:44302/api/Comment/UpdateComment/?id=" + id, data,);
  }
  getAllUsers() {
    return this.http.get<any>("https://localhost:44302/api/User/GetAllUsers/");
  }
  getAllProducts() {
    return this.http.get<any>("https://localhost:44302/api/Product/GetAllProducts/");
  }
}
