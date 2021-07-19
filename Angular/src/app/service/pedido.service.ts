import { Injectable } from '@angular/core';
import { Pedido } from '../pedido/Pedido';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  CreatePedido(viewModelPedido: Pedido): Observable<any>{   
    //  let ApiPedido = "http://54.235.94.26:44358/Pedido";
     let ApiPedido = "http://localhost:44358/Pedido";
     return this.http.post(ApiPedido , viewModelPedido, this.httpHeader);
     }

     obternerPedido(idUsuario: number): Observable<any>{
      // let ApiPedido = "http://54.235.94.26:44358/Pedido/" + idUsuario;
      let ApiPedido = "http://localhost:44358/Pedido/" + idUsuario;    
      return this.http.get(ApiPedido);    
     }

     updatePedido(viewModelPedido: Pedido): Observable<any>{   
      //  let ApiPedido = "http://54.235.94.26:44358/Pedido/"+ viewModelPedido.idPedido;
       let ApiPedido = "http://localhost:44358/Pedido/" + viewModelPedido.idPedido;
       return this.http.put(ApiPedido , viewModelPedido, this.httpHeader);
       
       }
       GetAll(): Observable<any>{
        // let ApiPedido = "http://54.235.94.26:44358/Pedido";
        let ApiPedido = "http://localhost:44358/Pedido";    
        return this.http.get(ApiPedido);    
       }
}
