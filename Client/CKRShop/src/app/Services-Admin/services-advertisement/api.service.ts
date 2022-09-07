import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postAdvertisement(data: any) {
    return this.http.post<any>("https://localhost:44302/api/Advertisement/AddAdvertisement", data)
  }
  getAllAdvertisements() {
    return this.http.get<any>("https://localhost:44302/api/Advertisement/GetAllAdvertisements/");
  }
  updateAdvertisement(data: any, id: string) {
    return this.http.put<any>("https://localhost:44302/api/Advertisement/UpdateAdvertisement/?id=" + id, data,);
  }
  deleteAdvertisement(id: string) {
    return this.http.delete<any>("https://localhost:44302/api/Advertisement/DeleteAdvertisement?id=" + id);
  }
  uploadFile(data: any, dataa: any) {
    return this.http.post<any>("https://localhost:44302/api/Upload/UploadAdvertisement/", data, dataa);
  }
  getAllImageTypes() {
    return this.http.get<any>("https://localhost:44302/api/ImageType/GetAllImageTypes");
  }
}
