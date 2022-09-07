import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }
  getAllOrders() {
    return this.http.get<any>("https://localhost:44302/api/Invoice/getAllInvoices");
  }
  getAllOrdersClient() {
    return this.http.get<any>("https://localhost:44302/api/Invoice/getAllInvoicesClient");
  }
  getOrdersByUserId(id: string) {
    return this.http.get<any>("https://localhost:44302/api/Invoice/GetInvoiceByUserId?id=" + id);
  }
  getAllOrdersCanceled() {
    return this.http.get<any>("https://localhost:44302/api/Invoice/GetAllInvoicesCanceled/");
  }
  getAllOrdersProcessing() {
    return this.http.get<any>("https://localhost:44302/api/Invoice/GetAllInvoicesProcessing/");
  }
  getAllOrdersConfirmed() {
    return this.http.get<any>("https://localhost:44302/api/Invoice/GetAllInvoicesConfirmed/");
  }
  getAllOrdersPacked() {
    return this.http.get<any>("https://localhost:44302/api/Invoice/GetAllInvoicesPacked/");
  }
  getAllOrdersTransported() {
    return this.http.get<any>("https://localhost:44302/api/Invoice/GetAllInvoicesTransported/");
  }
  getAllOrdersDelivered() {
    return this.http.get<any>("https://localhost:44302/api/Invoice/GetAllInvoicesDelivered/");
  }
  getAllOrdersDetail(id: Int16Array) {
    return this.http.get<any>("https://localhost:44302/api/InvoiceDetail/GetInvoiceDetailByIdInvoice/?id=" + id);
  }
  getAllUsers() {
    return this.http.get<any>("https://localhost:44302/api/User/GetAllUsersClient/");
  }
  updateOrder(id: Int16Array, data: any) {
    return this.http.put<any>("https://localhost:44302/api/Invoice/UpdateInvoice?id=" + id, data);

  }
  getAllUserRoles() {
    return this.http.get<any>("https://localhost:44302/api/authenticate/GetAllUserRoles");
  }
  getAllRoles() {
    return this.http.get<any>("https://localhost:44302/api/authenticate/GetAllRoles");
  }
  deleteOrder(id: Int16Array) {
    return this.http.delete<any>("https://localhost:44302/api/Invoice/DeleteInvoice?id=" + id);
  }
  cancelOrder(id: Int16Array) {
    return this.http.delete<any>("https://localhost:44302/api/Invoice/CancelInvoice?id=" + id);
  }
  searchOrder(fromDate: Date, toDate: Date) {
    return this.http.get<any>("https://localhost:44302/api/Invoice/Search?fromDate=" + fromDate + "&toDate=" + toDate);
  }
}
