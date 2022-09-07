import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postCategory(data: any) {
    return this.http.post<any>("https://localhost:44302/api/ProductType/AddProductType/", data)
  }
  updateCategory(data: any, id: string) {
    return this.http.put<any>("https://localhost:44302/api/ProductType/UpdateProductType/?id=" + id, data,);
  }
  deleteCategory(id: string) {
    return this.http.delete<any>("https://localhost:44302/api/ProductType/DeleteProductType?id=" + id);
  }
  getAllCategories() {
    return this.http.get<any>("https://localhost:44302/api/ProductType/GetAllProductTypes",);
  }
}
