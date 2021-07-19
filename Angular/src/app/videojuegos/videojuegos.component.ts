import { HttpClient } from '@angular/common/http';
import { ProductoService } from './../service/producto.service';
import { PedidoService } from './../service/pedido.service';
import { DetallePedidoService } from './../service/detalle-pedido.service';
import { Videojuegos } from './Videojuegos';
import { Component, OnInit } from '@angular/core';
import { Pedido } from '../pedido/Pedido';
import { DetallePedido } from '../detalle-pedido/DetallePedido';
import { DatePipe } from '@angular/common';
import { globalConstants } from '../common/global-constant';
import { AppComponent } from '../app.component';
import { ListaDeseosService } from '../service/lista-deseos.service';
import { ListaDeseos } from '../lista-deseos/listaDeseos';





@Component({
  selector: 'app-videojuegos',
  templateUrl: './videojuegos.component.html',
  providers: [AppComponent],
  styleUrls: ['./videojuegos.component.css']
})
export class VideojuegosComponent implements OnInit {    
  public ProductoArray: Array<Videojuegos>;
  public pedido = new Pedido();
  public detallePedido =  new DetallePedido();
  public carrito = globalConstants.carrito;
  public fecha: string;
  public datos: Array<Pedido> = [];
  public idProducto: number;
  public datosPedido: Array<DetallePedido>=[];
  public inputPedido: number;
  public deseoList = new ListaDeseos();  
  public nombreJuegoPedido: string;
  public cantidadJuegoPedido: number;
  public precioJuegoPedido: number;
  public cantidad = globalConstants.cantidad;
  public idProdLista: number;

  constructor(private _ProductoService: ProductoService, private _listaDeseosService: ListaDeseosService ,private _pedidoService: PedidoService, private _detallePedidoService: DetallePedidoService, public datePipe: DatePipe, private _appComponent: AppComponent) {
    this.ProductoArray = [];  
   }

  ngOnInit() {
    this.getAllVideoJuegos();    
  }
  getAllVideoJuegos(){
    this._ProductoService.obtenerTodos().subscribe(
      (data: any)=>{
        for(let i of data){
          if(i['stock'] >= 0){
            this.ProductoArray.push(i)
          }
        }
        console.log(this.ProductoArray);                
    });
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
          this.detallePedido.cantidad = this.cantidad;
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
