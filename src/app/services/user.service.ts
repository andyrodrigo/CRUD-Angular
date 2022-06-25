import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'https://sheet.best/api/sheets/17d78082-e1e2-4ed0-9c2f-2519bb2962f2'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  //CRUD
  //Create
  postUsers(user: User):Observable<User>{
    return this.httpClient.post<User>(this.apiUrl, user, this.httpOptions);
  }
  //Read
  getUsers():Observable<User[]>{
    return this.httpClient.get<User[]>(this.apiUrl);
  }
  //U
  //Delete
  deleteUsers(id: number):Observable<User>{
    return this.httpClient.delete<User>(`${this.apiUrl}/id/${id}`);
  }
}
