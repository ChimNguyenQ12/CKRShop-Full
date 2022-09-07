import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceComment {

  constructor(private http: HttpClient) { }

  getAllComments(id: string) {
    return this.http.get<any>("https://localhost:44302/api/Comment/GetCommentByProductId/?id=" + id)
  }
  getAllUsers() {
    return this.http.get<any>("https://localhost:44302/api/User/GetAllUsers/")
  }
  addComment(data: any) {
    return this.http.post<any>("https://localhost:44302/api/Comment/AddComment/", data)
  }

}
