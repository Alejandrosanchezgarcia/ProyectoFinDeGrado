import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../service/usuario.service';
import { Usuario } from '../usuario/usuario';
import { AppComponent } from '../app.component';
import { Pedido } from '../pedido/Pedido';
import { PedidoService } from '../service/pedido.service';
import { ListaDeseosService } from '../service/lista-deseos.service';
import { ListaDeseos } from '../lista-deseos/listaDeseos';
import { Videojuegos } from '../videojuegos/Videojuegos';
import { ProductoService } from '../service/producto.service';
import { globalConstants } from '../common/global-constant';
import { DatePipe } from '@angular/common';
import { DetallePedido } from '../detalle-pedido/DetallePedido';
import { DetallePedidoService } from '../service/detalle-pedido.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  
  logeado: boolean = false;
  public datos: Array<Usuario>=[];
  public datosPedidos: Array<Pedido>=[];
  public arrPedidos = [];
  public idUsuario: number;  
  public arrUsuarios: Array<Usuario>;
  public arrPedidosTodos: Array<Pedido> = [];
  public arrListaDeseos: Array<ListaDeseos> = [];
  public juegosList: Array<Videojuegos> = [];
  public deseoBorrar = new ListaDeseos();
  public idProductoBorrar: number;
  public pedido = new Pedido();
  public detallePedido =  new DetallePedido();
  public idProducto: number;
  cantidad = globalConstants.cantidad;
  
 

  constructor(private _usuarioService: UsuarioService,  private _detallePedidoService: DetallePedidoService,private datePipe: DatePipe,private _productoService: ProductoService ,private _listaDeseosService: ListaDeseosService ,private appComponent: AppComponent, private _pedidoService: PedidoService) { }

  ngOnInit() {    
    if(this.appComponent.busquedaInputCorreo != null){
      this._usuarioService.RequestUsuario(this.appComponent.busquedaInputCorreo).subscribe(
        data=>{
          this.datos['email'] = data['email'];
          this.datos['password'] = data['password'];
          this.datos['nombre'] = data['nombre'];
          this.datos['apellidos'] = data['apellidos'];
          this.datos['direccion'] = data['direccion'];
          this.idUsuario = data['idUsuario'];        
          this.datos['admin'] = data['admin'];
          console.log(this.datos, "es el q busco");
          if(this.appComponent.busquedaInputCorreo == data['email'] && this.appComponent.busquedaInputPass == data['password']){                  
            this.logeado = true;
          }else{
            this.logeado = false;
          }
        },
        error=>{
          var errorMessage = error as any;
          console.log(errorMessage);
      }
      
      )
      console.log(this.logeado);   
      return this.logeado; 
    }else{      
        this._usuarioService.RequestUsuario(sessionStorage.getItem("email")).subscribe(
          data=>{
            this.datos['email'] = data['email'];
            this.datos['password'] = data['password'];
            this.datos['nombre'] = data['nombre'];
            this.datos['apellidos'] = data['apellidos'];
            this.datos['direccion'] = data['direccion'];
            this.idUsuario = data['idUsuario'];        
            this.datos['admin'] = data['admin'];
            console.log(this.datos, "es el q busco");
            if(sessionStorage.getItem("email") == data['email']){                  
              this.logeado = true;
            }else{
              this.logeado = false;
            }
          },
          error=>{
            var errorMessage = error as any;
            console.log(errorMessage);
        }
        
        )
        console.log(this.logeado);   
        return this.logeado;
    }    
  }

  

  getPedidosUsuario(id: number){     
    this._usuarioService.GetPedidoUsuario(this.idUsuario).subscribe(
      data=>{
        this.datosPedidos['idPedido'] = data['idPedido'];
        this.datosPedidos['comprado'] = data['comprado'];
        this.datosPedidos['fecha'] = data['fecha'];
        this.datosPedidos['idUsuario'] = data['idUsuario'];
        console.log(this.datosPedidos);
        if(this.datosPedidos['comprado'] == true){
          this.arrPedidos.push(this.datosPedidos);
          console.log(this.arrPedidos);
        }
      },      
    )
    return this.arrPedidos;
  }
  getAllPedidos(){   
    this._pedidoService.GetAll().subscribe(
      data =>{
        console.log(data);
        for(let pedido of data){
          if(pedido['idUsuario'] == Number(sessionStorage.getItem("id"))){            
            this.arrPedidosTodos.push(pedido);
            console.log(this.arrPedidosTodos);
          }
        }
      }
    )
  }

  llamadasDeseo(){
    this.getListaDeseos();
    this.getNombreJuegos();
  }

  getListaDeseos(){
    this._listaDeseosService.GetAll().subscribe(
      data =>{
        for(let lista of data){
          if(lista['idUsuario'] == Number(sessionStorage.getItem("id"))){
            this.arrListaDeseos.push(lista);
          }
        }
      }
    )
  }
  getNombreJuegos(){
    this._productoService.obtenerTodos().subscribe(
      data =>{
        for(let prod of data){
          for(let deseo of this.arrListaDeseos){
            if(prod['idProducto'] == deseo['idProducto']){
              this.juegosList.push(prod);
              console.log(this.juegosList);
            }
          }
        }
      }
    )
  }
  deleteDeseo(idProd: number){
    this.idProductoBorrar = idProd;
    console.log(this.idProductoBorrar);
    this.deseoBorrar.idUsuario = Number(sessionStorage.getItem("id"));
    this.deseoBorrar.idProducto = this.idProductoBorrar;
    this._listaDeseosService.DeleteLista(this.deseoBorrar).subscribe(
      data =>{
        console.log(this.deseoBorrar);
      }
    )
    window.location.reload();   
  }
  comenzarPedidoYCompra(){    
    if(globalConstants.carrito != true){
      this.pedido.comprado = false;
      var date = new Date();
      var dateFormat = this.datePipe.transform(date, "dd-MM-yyyy");
      console.log(dateFormat);
      this.pedido.fecha = dateFormat.toString();
      this.pedido.idUsuario = Number(sessionStorage.getItem("id"));
      this._pedidoService.CreatePedido(this.pedido).subscribe(data =>{
        console.log(this.pedido);      
      });
      setTimeout(()=>{
        this._pedidoService.obternerPedido(Number(sessionStorage.getItem("id"))).subscribe(data =>{                            
          var idCarritoStorage = sessionStorage.setItem("idCarrito", data['idPedido']);                               
        });        
      },500);      
        setTimeout(()=>{
          globalConstants.carrito = true;          
          console.log(globalConstants.carrito);
          this.detallePedido.idPedido = Number(sessionStorage.getItem("idCarrito"));
          this.detallePedido.idProducto = this.idProducto;
          this.detallePedido.cantidad = 1;
          this.detallePedido.devuelto = false;
          this._detallePedidoService.CreateDetallePedido(this.detallePedido).subscribe(data=>{
            console.log(this.detallePedido);
          });
          this.cantidad = 0;  
        },1000);
    }else if(globalConstants.carrito == true){
      setTimeout(()=>{
        globalConstants.carrito = true;        
        this.detallePedido.idPedido = Number(sessionStorage.getItem("idCarrito"));
        this.detallePedido.idProducto = this.idProducto;
        this.detallePedido.cantidad = 1;
        this.detallePedido.devuelto = false;
        this._detallePedidoService.CreateDetallePedido(this.detallePedido).subscribe(data=>{
          console.log(this.detallePedido);
        });
        this.cantidad = 0;
      },500);
      
    }
  }

  llamadasDetallePedido(idProd: number){
    this.idProducto = idProd;
    console.log(this.idProducto);
    setTimeout(()=>{
      this.comenzarPedidoYCompra();
      this.deleteDeseo(idProd);
    },500);    
  }

}
