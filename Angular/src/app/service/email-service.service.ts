import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { email } from '../email/email';

@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {

  constructor(private http: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'accept': '*/*',
      'Content-Type': 'application/json'
    })
  }
  PostEmail(email: email): Observable<any>{   
    //  let ApiEmail = "http://54.235.94.26:44358/api/Email/sendEmail";
     let ApiEmail = "http://localhost:44358/api/Email/sendEmail";
     return this.http.post(ApiEmail, email, this.httpHeader);
     }
}
