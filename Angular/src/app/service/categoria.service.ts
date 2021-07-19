import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { Categoria } from '../categoria/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  PostCategoria(viewModelCategoria: Categoria): Observable<any>{   
     let ApiCategoria = "http://54.235.94.26:44358/Categoria";
    //  let ApiCategoria = "http://localhost:44358/Categoria";
     return this.http.post(ApiCategoria, viewModelCategoria, this.httpHeader);
     }

     GetAllCategorias(){
      // let ApiCategoria = "http://localhost:44358/Categoria";
      let ApiCategoria = "http://54.235.94.26:44358/Categoria";
      return this.http.get(ApiCategoria);
    }
    GetCategoriaByName(catSelect: string): Observable<any>{
      // let ApiCategoria = "http://localhost:44358/Categoria/" + catSelect;
      let ApiCategoria = "http://54.235.94.26:44358/Categoria/" + catSelect;
      return this.http.get(ApiCategoria);
    }
 
}

