import { Injectable } from '@angular/core';
import { ListaDeseos } from '../lista-deseos/listaDeseos';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListaDeseosService {

  constructor(private http: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  CreateListaDeseos(viewModelListaDeseo: ListaDeseos): Observable<any>{   
    //  let ApiLista = "http://54.235.94.26:44358/ListaDeseos";
     let ApiLista = "http://localhost:44358/ListaDeseos";
     return this.http.post(ApiLista , viewModelListaDeseo, this.httpHeader);
     }
     GetAll(): Observable<any>{
      // let ApiLista = "http://54.235.94.26:44358/ListaDeseos";
      let ApiLista = "http://localhost:44358/ListaDeseos";    
      return this.http.get(ApiLista);    
     }
     DeleteLista(viewModelLista: ListaDeseos): Observable<any>{
      let ApiLista = "http://localhost:44358/ListaDeseos/" + viewModelLista.idUsuario + "%2C" + viewModelLista.idProducto + "?idUsuario=" + viewModelLista.idUsuario + "&idProducto=" + viewModelLista.idProducto;      
     //let ApiLista = "http://54.235.94.26:44358/ListaDeseos/" + viewModelLista.idUsuario + "%2C" + viewModelLista.idProducto + "?idUsuario=" + viewModelLista.idUsuario + "&idProducto=" + viewModelLista.idProducto;
      return this.http.delete(ApiLista);
    }

}
