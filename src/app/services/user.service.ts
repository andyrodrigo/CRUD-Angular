import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'https://sheet.best/api/sheets/17d78082-e1e2-4ed0-9c2f-2519bb2962f2'

  constructor(private httpClient: HttpClient) { }

  //CRUD
  //READ
  getUsers():Observable<User[]>{
    return this.httpClient.get<User[]>(this.apiUrl);
  }

}
