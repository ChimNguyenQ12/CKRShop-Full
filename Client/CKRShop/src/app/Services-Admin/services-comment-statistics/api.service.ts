import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  getCountComments() {
    return this.http.get<any>("https://localhost:44302/api/CommentStatistics/CountComments");
  }
  getCountExisting() {
    return this.http.get<any>("https://localhost:44302/api/CommentStatistics/CountExisting");
  }
  getCountHidden() {
    return this.http.get<any>("https://localhost:44302/api/CommentStatistics/CountHidden");
  }
  getCountUserComment() {
    return this.http.get<any>("https://localhost:44302/api/CommentStatistics/CountUserComment");
  }
  getCountDelete() {
    return this.http.get<any>("https://localhost:44302/api/CommentStatistics/CountDelete");
  }
  getAllComment() {
    return this.http.get<any>("https://localhost:44302/api/Comment/GetAllComments");
  }
}
