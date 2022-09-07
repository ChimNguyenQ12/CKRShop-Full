import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postUser(data: any) {
    return this.http.post<any>("https://localhost:44302/api/authenticate/register", data)
  }
  registerUser(data: any) {
    return this.http.post<any>("https://localhost:44302/api/authenticate/register-customer", data)
  }
  registerAdmin(data: any) {
    return this.http.post<any>("https://localhost:44302/api/authenticate/register-admin", data)
  }
  getAllUsers() {
    return this.http.get<any>("https://localhost:44302/api/User/GetAllUsers");
  }
  getAllUsersClient() {
    return this.http.get<any>("https://localhost:44302/api/User/GetAllUsersClient");
  }
  getAllUsersRemove() {
    return this.http.get<any>("https://localhost:44302/api/User/GetAllUsersRemove");
  }
  getUserByUsername(username: string) {
    return this.http.get<any>("https://localhost:44302/api/User/GetUserByUsername?username=" + username);
  }
  updateUser(data: any, id: string) {
    return this.http.put<any>("https://localhost:44302/api/User/UpdateUser/?id=" + id, data,);
  }
  deleteUser(id: string) {
    return this.http.delete<any>("https://localhost:44302/api/User/DeleteUser?id=" + id);
  }
  deleteUserTrash(id: string) {
    return this.http.delete<any>("https://localhost:44302/api/User/DeleteUserTrash?id=" + id);
  }
  uploadFile(data: any, dataa: any) {
    return this.http.post<any>("https://localhost:44302/api/Upload/UploadUser", data, dataa);
  }
  changePassword(data: any, userId: string) {
    return this.http.post<any>("https://localhost:44302/api/authenticate/change-password?id=" + userId, data);
  }
  changePasswordClient(data: any, userName: string) {
    return this.http.post<any>("https://localhost:44302/api/authenticate/change-password-client?id=" + userName, data);
  }
  getAllUserRoles() {
    return this.http.get<any>("https://localhost:44302/api/authenticate/GetAllUserRoles");
  }
  getAllRoles() {
    return this.http.get<any>("https://localhost:44302/api/authenticate/GetAllRoles");
  }
  forgotPassword(email: string, data: string) {
    return this.http.post<any>("https://localhost:44302/api/authenticate/send-password-reset-code?email=" + email, data);
  }
  resetPassword(email: string, otp: number, newPassword: string) {
    return this.http.post<any>("https://localhost:44302/api/authenticate/reset-password?email=" + email + "&otp=" + otp + "&newPassword=" + newPassword + "", email);
  }
}
