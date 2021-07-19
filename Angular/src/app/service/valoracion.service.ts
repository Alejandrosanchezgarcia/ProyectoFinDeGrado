import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { ValoracionComponent } from '../valoracion/valoracion.component';
import { valoracion } from '../valoracion/valoracion';
@Injectable({
  providedIn: 'root'
})
export class ValoracionService {

  constructor(private http: HttpClient) {
    
   }
   httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  RequestValoracion(): Observable<any>{
    // let ApiValoracion = "http://54.235.94.26:44358/Valoracion";
   let ApiValoracion = "http://localhost:44358/Valoracion";    
   return this.http.get(ApiValoracion);    
   }
   PostValoracion(viewModelValoracion: valoracion): Observable<any>{   
    //  let ApiValoracion = "http://54.235.94.26:44358/Valoracion";
     let ApiValoracion = "http://localhost:44358/Valoracion";
     return this.http.post(ApiValoracion , viewModelValoracion, this.httpHeader);
     }
}
