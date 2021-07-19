import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../service/categoria.service';
import { Categoria } from './categoria';
import { Videojuegos } from '../videojuegos/Videojuegos';
import { ProductoService } from '../service/producto.service';
import { globalConstants } from '../common/global-constant';
import { VideojuegosComponent } from '../videojuegos/videojuegos.component';
import { DetallePedido } from '../detalle-pedido/DetallePedido';
import { DetallePedidoService } from './../service/detalle-pedido.service';
import { AppComponent } from '../app.component';
import { Pedido } from '../pedido/Pedido';
import { PedidoService } from '../service/pedido.service';
import { DatePipe } from '@angular/common';
import { ListaDeseos } from '../lista-deseos/listaDeseos';
import { ListaDeseosService } from '../service/lista-deseos.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  providers: [VideojuegosComponent ,AppComponent],
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  public catSelect: string = '';
  public arrCats: Array<Categoria>;
  public arrProd: Array<Videojuegos>;
  public idCat: number;
  public datos: Array<Categoria>=[];
  public datosPedido: Array<DetallePedido>=[];
  carrito = globalConstants.carrito;
  public detallePedido =  new DetallePedido();
  cantidad = globalConstants.cantidad;
  public idProdLista: number;
  public deseoList = new ListaDeseos();
  public idProducto: number;
  public pedido = new Pedido();
  constructor(private _categoriaService: CategoriaService, private datePipe: DatePipe, private _listaDeseosService: ListaDeseosService ,private _pedidoService: PedidoService , private _videojuegoService: ProductoService, private _videojuegoComponent: VideojuegosComponent, private _detallePedidoService: DetallePedidoService) {
    this.arrCats = [];
    this.arrProd = []; 
   }
  ngOnInit(): void {
    this.getAllCategorias();     
    
  }

  getAllCategorias(){
    this._categoriaService.GetAllCategorias().subscribe(
      (data: any)=>{     
      this.arrCats = data;
      console.log(this.arrCats);  
    });
  }
  getCategoriaByName(){    
    this._categoriaService.GetCategoriaByName(this.catSelect).subscribe(
      data=>{
        this.datos['IdCategoria'] = data['idCategoria'];
        this.idCat = data['idCategoria'];
        this.datos['NombreCategoria'] = data['nombreCategoria'];
        this.datos['DescripcionCategoria'] = data['descripcionCategoria'];        
        console.log(this.datos);      
      },
      error=>{
        var errorMessage = error as any;
        console.log(errorMessage);
    }
    
    )
  }
 
  getVideoJuegos(){
    this._videojuegoService.obtenerTodos().subscribe(
      (data: any)=>{
        for(let i of data){
          if(i['idCategoria'] == this.idCat){
            this.arrProd.push(i)
          }
        }
        console.log(this.arrProd);
        
    });
  }
  funcionesBusqueda(){
    this.arrProd.splice(0, this.arrProd.length);
    this.getAllCategorias();
    this.getCategoriaByName();
    this.getVideoJuegos();
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
