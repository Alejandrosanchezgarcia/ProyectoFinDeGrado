import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { DetallePedido } from '../detalle-pedido/DetallePedido';

@Injectable({
  providedIn: 'root'
})
export class DetallePedidoService {

  constructor(private http: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  CreateDetallePedido(viewModelDetallePedido: DetallePedido): Observable<any>{   
    //  let ApiDetallePedido = "http://54.235.94.26:44358/DetallePedido";
     let ApiDetallePedido = "http://localhost:44358/DetallePedido";
     return this.http.post(ApiDetallePedido , viewModelDetallePedido, this.httpHeader);
     }
  RequestDetallePedido(): Observable<any>{
   // let ApiDetalle = "http://54.235.94.26:44358/DetallePedido";
  let ApiDetalle = "http://localhost:44358/DetallePedido";    
  return this.http.get(ApiDetalle);    
  }
  PutDetalle(viewModelDetallePedido: DetallePedido): Observable<any>{   
    //  let ApiDetalle = "http://54.235.94.26:44358/DetallePedido/" + viewModelDetallePedido.idPedido + "%2C" + viewModelDetallePedido.idProducto;
     let ApiDetalle = "http://localhost:44358/DetallePedido/" + viewModelDetallePedido.idPedido + "%2C" + viewModelDetallePedido.idProducto;
     return this.http.put(ApiDetalle , viewModelDetallePedido, this.httpHeader);
     }
     DeleteDetalle(viewModelDetallePedido: DetallePedido): Observable<any>{
      let ApiDetalle = "http://localhost:44358/DetallePedido/" + viewModelDetallePedido.idPedido + "%2C" + viewModelDetallePedido.idProducto + "?idPedido=" + viewModelDetallePedido.idPedido + "&idProducto=" + viewModelDetallePedido.idProducto;
      
     //let ApiDetalle = "http://54.235.94.26:44358/DetallePedido/" + viewModelDetallePedido.idPedido + "%2C" + viewModelDetallePedido.idProducto + "?idPedido=" + viewModelDetallePedido.idPedido + "&idProducto=" + viewModelDetallePedido.idProducto;
      return this.http.delete(ApiDetalle);
    }
}
