import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  getCountUsers() {
    return this.http.get<any>("https://localhost:44302/api/UserStatistics/CountUsers");
  }
  getCountStaffs() {
    return this.http.get<any>("https://localhost:44302/api/UserStatistics/CountStaffs");
  }
  getCountActive() {
    return this.http.get<any>("https://localhost:44302/api/UserStatistics/CountActive");
  }
  getCountInactive() {
    return this.http.get<any>("https://localhost:44302/api/UserStatistics/CountInactive");
  }
  getCountLock() {
    return this.http.get<any>("https://localhost:44302/api/UserStatistics/CountLock");
  }
}
