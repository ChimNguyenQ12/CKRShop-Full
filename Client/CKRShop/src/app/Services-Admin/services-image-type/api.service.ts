import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postImageType(data: any) {
    return this.http.post<any>("https://localhost:44302/api/ImageType/AddImageType/", data)
  }
  updateImageType(data: any, id: string) {
    return this.http.put<any>("https://localhost:44302/api/ImageType/UpdateImageType/?id=" + id, data,);
  }
  deleteImageType(id: string) {
    return this.http.delete<any>("https://localhost:44302/api/ImageType/DeleteImageType?id=" + id);
  }
  getAllImageTypes() {
    return this.http.get<any>("https://localhost:44302/api/ImageType/GetAllImageTypes",);
  }
}
