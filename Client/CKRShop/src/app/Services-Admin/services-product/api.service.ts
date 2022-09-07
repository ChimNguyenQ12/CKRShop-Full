import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postProduct(data: any) {
    return this.http.post<any>("https://localhost:44302/api/Product/AddProduct/", data)
  }
  getProducts() {
    return this.http.get<any>("https://localhost:44302/api/Product/GetAllProducts/");
  }
  getProductsRemove() {
    return this.http.get<any>("https://localhost:44302/api/Product/GetAllProductsRemove/");
  }
  updateProduct(data: any, id: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.put<any>("https://localhost:44302/api/Product/UpdateProduct/?id=" + id, data,);
  }
  deleteProduct(id: string) {
    return this.http.delete<any>("https://localhost:44302/api/Product/DeleteProduct?id=" + id);
  }
  deleteProductTrash(id: string) {
    return this.http.delete<any>("https://localhost:44302/api/Product/DeleteProductTrash?id=" + id);
  }
  uploadFile(data: any, dataa: any) {
    return this.http.post<any>("https://localhost:44302/api/Upload/UploadProduct", data, dataa);
  }
  getCategories() {
    return this.http.get<any>("https://localhost:44302/api/ProductType/GetAllProductTypes",);
  }
  getAllTrademarks(id: string) {
    return this.http.get<any>("https://localhost:44302/api/TradeMark/GetTradeMarkByProductTypeId?id=" + id,);
  }
  searchProduct(productTypeId: string, trademark: string, price: Int16Array, stock: Int16Array) {
    return this.http.get<any>("https://localhost:44302/api/Product/Search?productTypeId=" + productTypeId + "&trademark=" + trademark + "&price=" + price + "&stock=" + stock);
  }
}
