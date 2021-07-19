import { HttpClient } from '@angular/common/http';
import { ProductoService } from './../service/producto.service';
import { Videojuegos } from './../videojuegos/Videojuegos';
import { Component, OnInit } from '@angular/core';
import { VideojuegosComponent } from '../videojuegos/videojuegos.component';
import { globalConstants } from '../common/global-constant';
import { DetallePedido } from '../detalle-pedido/DetallePedido';
import { DetallePedidoService } from './../service/detalle-pedido.service';
import { ValoracionService } from '../service/valoracion.service';
import { valoracion } from '../valoracion/valoracion';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../usuario/usuario';
import { Pedido } from '../pedido/Pedido';
import { PedidoService } from '../service/pedido.service';
import { DatePipe } from '@angular/common';
import { ListaDeseos } from '../lista-deseos/listaDeseos';
import { ListaDeseosService } from '../service/lista-deseos.service';
@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  providers: [VideojuegosComponent],
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {  
  public busquedaInput;
  public datos: Array<Videojuegos>=[];
  public arrJuegos: Array<object> = [];
  public idProducto: number;
  carrito = globalConstants.carrito;
  public datosPedido: Array<DetallePedido>=[];
  public arrayValoracions: Array<valoracion> = [];
  public valoracionEncontrada: boolean = false;
  public idUser: number;
  public user = new Usuario(); 
  public inputComentario: string;
  public inputValoracion: number;
  public inputValoracion4: number;
  public inputValoracion3: number;
  public inputValoracion2: number;
  public inputValoracion1: number;
  public valoracion = new valoracion();
  public arrUsers: Array<Usuario> = [];
  public cantidad = globalConstants.cantidad;
  public pedido = new Pedido();
  public detallePedido =  new DetallePedido();
  public idProdLista : number;
  public deseoList = new ListaDeseos();

  constructor(private _ProductoService: ProductoService,private _usuarioService: UsuarioService, private _listaDeseosService: ListaDeseosService ,private datePipe: DatePipe , private _pedidoService: PedidoService ,private _videojuegoComponent: VideojuegosComponent, private _detallePedidoService: DetallePedidoService, private _valoracionService: ValoracionService) {
    
   }

  ngOnInit(): void {    
  }

  ObtenerUnJuego(){
    this._ProductoService.obternerUno(this.busquedaInput).subscribe(
    data=>{
      this.datos['idProducto'] = data['idProducto'];
      this.idProducto = data['idProducto'];
      this.datos['nombre'] = data['nombreProducto'];
      this.datos['precio'] = data['precio'];
      this.datos['descripcion'] = data['descripcionProducto'];
      this.datos['stock'] = data['stock'];
      this.datos['imagen'] = data['imagen'];
      console.log(this.datos);      
    },
    error=>{
      var errorMessage = error as any;
      console.log(errorMessage);
  }
  
  )
   
}
comenzarPedidoYCompra(){    
  if(globalConstants.carrito != true){ //comprueba si hay algun carrito activo
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
      setTimeout(()=>{ //al ser creado arriba, luego crea detalle pedido con la id de ese carrito
        globalConstants.carrito = true;          
        console.log(globalConstants.carrito);        
        this.detallePedido.idPedido = Number(sessionStorage.getItem("idCarrito"));
        this.detallePedido.idProducto = this.idProducto;
        this.detallePedido.cantidad = this.cantidad;
        this.detallePedido.devuelto = false;
        this._detallePedidoService.CreateDetallePedido(this.detallePedido).subscribe(data=>{
          console.log(this.detallePedido);
        });
        this.cantidad = 0;  
      },1000);
        
    
  }else if(globalConstants.carrito == true){// si el carrito ya existia y habia sido inicializado introduce los detalles pedido
    setTimeout(()=>{
      globalConstants.carrito = true;             
      this.detallePedido.idPedido = Number(sessionStorage.getItem("idCarrito"));
      this.detallePedido.idProducto = this.idProducto;
      this.detallePedido.cantidad = this.cantidad;
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
  },1000)
}

valoracionProducto(){
  this.arrayValoracions.splice(0, this.arrayValoracions.length);  
  this._valoracionService.RequestValoracion().subscribe(
    data=>{      
      for(let val of data){
        console.log(val['idUsuario']);          
        if(this.idProducto == val['idProducto']){         
        this.arrayValoracions.push(val);        
        this.valoracionEncontrada = true;        
        this._usuarioService.GetAllUsuarios().subscribe(
          data =>{            
            for(let us of data){              
              if(us['idUsuario'] == val['idUsuario']){
                this.user = us;                
                this.arrUsers.push(us);                
                console.log(this.user);
              }
            }})  
      }
      }
      }
  ) 
}

nuevaValoracion(){
  this.valoracion.comentario = this.inputComentario;  
  this.valoracion.puntuacion = Number(this.inputValoracion.valueOf());
  this.valoracion.idUsuario = Number(sessionStorage.getItem("id"));
  this.valoracion.idProducto = this.idProducto;
  console.log(this.valoracion.puntuacion);  
  this._valoracionService.PostValoracion(this.valoracion).subscribe(
    data =>{
      console.log(this.valoracion);
    }
  )
  window.location.reload();
}
llamadasBuscar(){
  this.ObtenerUnJuego();
  setTimeout(()=>{
    this.valoracionProducto();
  },500);
}
createListaDeseos(idProdListaD: number){
  this.idProdLista = idProdListaD
  this.deseoList.idUsuario = Number(sessionStorage.getItem("id"));
  this.deseoList.idProducto =  this.idProdLista;
  this._listaDeseosService.CreateListaDeseos(this.deseoList).subscribe(
    data =>{
      console.log(this.deseoList);
    }
  )
}


}
