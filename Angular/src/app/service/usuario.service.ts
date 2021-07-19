import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { Videojuegos } from '../videojuegos/Videojuegos';
import { Usuario } from '../usuario/usuario';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient) {
    
  }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  RequestUsuario(busquedaInputCorreo: string): Observable<any>{
    // let ApiUsuario = "http://54.235.94.26:44358/Usuario/" + busquedaInputCorreo;
    let ApiUsuario = "http://localhost:44358/Usuario/" + busquedaInputCorreo;    
    return this.http.get(ApiUsuario);    
   }

   PostUsuario(viewModelUsuario: Usuario): Observable<any>{   
  //  let ApiUsuario = "http://54.235.94.26:44358/Usuario";
   let ApiUsuario = "http://localhost:44358/Usuario";
   return this.http.post(ApiUsuario , viewModelUsuario, this.httpHeader);
   }
   GetAllUsuarios():Observable<any>{
     let ApiGetAllUsuarios = "http://localhost:44358/Usuario";
    //  let ApiGetAllUsuarios = "http://54.235.94.26:44358/Usuario";
     return this.http.get(ApiGetAllUsuarios);
   }

   GetPedidoUsuario(idUsuario: number){
     let ApiPedidoUsuario = "http://localhost:44358/Pedido/" + idUsuario;
    //  let ApiPedidoUsuario = "http://54.235.94.26:44358/Pedido/" + idUsuario;
     return this.http.get(ApiPedidoUsuario);
   }

   DeleteUsuario(idUsuario: number){
    let ApiUsuario = "http://localhost:44358/Usuario/" + idUsuario;
    // let ApiUsuario = "http://54.235.94.26:44358/Usuario/" + idUsuario;
    return this.http.delete(ApiUsuario);
  }
    updateUsuario(viewModelUsuario: Usuario): Observable<any>{   
    //  let ApiUsuario = "http://54.235.94.26:44358/Usuario/" +  viewModelUsuario.email;
     let ApiUsuario = "http://localhost:44358/Usuario/" + viewModelUsuario.email;
     return this.http.put(ApiUsuario , viewModelUsuario, this.httpHeader);
     
     }
     
     
}
