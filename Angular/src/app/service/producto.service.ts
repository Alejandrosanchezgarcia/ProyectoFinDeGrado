import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { Videojuegos } from '../videojuegos/Videojuegos';



@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  constructor(private http: HttpClient) {
    
   }
   httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
   
  obtenerTodos(): Observable<any>{
    // let ApiProducto = "http://54.235.94.26:44358/Producto";
    let ApiProducto = "http://localhost:44358/Producto";
    console.log();     
    return this.http.get(ApiProducto);
     
   }

  obternerUno(busquedaInput: string): Observable<any>{
    // let ApiProducto = "http://54.235.94.26:44358/Producto/" + busquedaInput;
    let ApiProducto = "http://localhost:44358/Producto/" + busquedaInput;    
    return this.http.get(ApiProducto);    
   }
  PostVideojuego(viewModelProducto: Videojuegos): Observable<any>{   
    //  let ApiUsuario = "http://54.235.94.26:44358/Producto";
     let ApiUsuario = "http://localhost:44358/Producto";
     return this.http.post(ApiUsuario , viewModelProducto, this.httpHeader);
     }

  PutVideojuego(viewModelProducto: Videojuegos): Observable<any>{   
      //  let ApiUsuario = "http://54.235.94.26:44358/Producto/" + viewModelProducto.nombreProducto;
       let ApiUsuario = "http://localhost:44358/Producto/" + viewModelProducto.nombreProducto;
       return this.http.put(ApiUsuario , viewModelProducto, this.httpHeader);
       }
}
