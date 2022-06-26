import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //apiUrl = 'https://sheet.best/api/sheets/17d78082-e1e2-4ed0-9c2f-2519bb2962f2'
  apiUrl = 'https://script.googleusercontent.com/macros/echo?user_content_key=PR7BrarGkT1F2442MhtR_iatxlQ74AwirFr5Ul0AtfW0aeTRhJflYIKhmVzrbC7vMJJRCY_RmKCPyaVMD8jru-mCAVtMtz6em5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnHFtpZpv29szLZ_6L0-Q3mIaTjPVBgPEr9uSL0cQ9FtVAmY2FHapwy8nOFpDL6kfaA&lib=M7Lj635VzdETJWLsnvGpOACWuNoO_zmQc'
  //apiUrl = '/macros/echo?user_content_key=PR7BrarGkT1F2442MhtR_iatxlQ74AwirFr5Ul0AtfW0aeTRhJflYIKhmVzrbC7vMJJRCY_RmKCPyaVMD8jru-mCAVtMtz6em5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnHFtpZpv29szLZ_6L0-Q3mIaTjPVBgPEr9uSL0cQ9FtVAmY2FHapwy8nOFpDL6kfaA&lib=M7Lj635VzdETJWLsnvGpOACWuNoO_zmQc'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  //Lista Usuario Único
  getUser(id: string):Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.apiUrl}/id/${id}`, this.httpOptions)
  }
  
  //CRUD
  //Create
  postUsers(user: User):Observable<User>{
    return this.httpClient.post<User>(this.apiUrl, user, this.httpOptions);
  }
  //Read
  getUsers():Observable<User[]>{
    return this.httpClient.get<User[]>(this.apiUrl);
  }
  //Update
  updateUser(id: string, user: User): Observable<User>{
    return this.httpClient.put<User>(`${this.apiUrl}/id/${id}`, user, this.httpOptions)
  }
  //Delete
  deleteUsers(id: number):Observable<User>{
    return this.httpClient.delete<User>(`${this.apiUrl}/id/${id}`);
  }
}
