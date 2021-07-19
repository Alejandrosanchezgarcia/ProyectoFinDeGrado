import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UsuarioService} from './service/usuario.service';
import { Usuario } from './usuario/usuario';
import { DetallePedido } from './detalle-pedido/DetallePedido';
import { DetallePedidoService } from './service/detalle-pedido.service';
import { globalConstants } from './common/global-constant';
import { ProductoService } from './service/producto.service';
import { Videojuegos } from './videojuegos/Videojuegos';
import { Pedido } from './pedido/Pedido';
import { DatePipe } from '@angular/common';
import { PedidoService } from './service/pedido.service';
import { EmailServiceService } from './service/email-service.service';
import { email } from './email/email';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent implements OnInit{
  public busquedaInputCorreo;
  public busquedaInputPass;
  public inputNombre;
  public inputApellidos;
  public inputCorreo;
  public inputPassword;
  public inputPassword2;
  public inputDireccion;
  public datos: Array<Usuario>=[];
  public arrUser: Array<Usuario>=[];
  public user = new Usuario();
  public datosPedido: Array<DetallePedido>=[];
  public carrito = globalConstants.carrito;
  public ProductoArray: Array<Videojuegos> = [];
  public nombreJuegoPedido: string;
  public cantidadJuegoPedido: Array<number> = [];
  public precioJuegoPedido: number;
  public arrCompras: Array<Videojuegos> = [];
  public precioTotal: number = 0;
  public precioParcial: number;
  public stockValue: number;
  public pedidoBorrar = new DetallePedido();
  public idProducto: number;
  public pedidoComprar = new Pedido();
  logeado: boolean = false;
  admin: boolean = false;
  public email = new email();
  public emailRegistro = new email();
  public nuevoStock = new Videojuegos();
  public arrDetalles: Array<DetallePedido>=[];
  public arrJuegosStock: Array<Videojuegos>=[]; 
  
  constructor(private modalService: NgbModal, private _emailService: EmailServiceService ,private _usuarioService: UsuarioService,private _pedidoService: PedidoService ,private _detallePedidoService: DetallePedidoService , public datePipe: DatePipe ,private _ProductoService: ProductoService){

  }
  
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  ngOnInit() {    
    this.getAllVideoJuegos();
    this.getVideojuegosParaStock();
    this.LoginDespuesDeReset();
  }
   
  prevSlide() {
    this.carousel.prev();
  }

  nextSlide() {
    this.carousel.next();
  }

  stopSlider() {
    this.carousel.pause();
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
 
  
  ObtenerUnUsuarioYAutenticar(){
    
    this._usuarioService.RequestUsuario(this.busquedaInputCorreo).subscribe(
    data=>{
      this.datos['email'] = data['email'];
      this.datos['password'] = data['password'];
      this.datos['nombre'] = data['nombre'];
      this.datos['apellidos'] = data['apellidos'];
      this.datos['direccion'] = data['direccion'];
      this.datos['admin'] = data['admin'];
      console.log(this.datos);
      if(this.busquedaInputCorreo == data['email'] && this.busquedaInputPass == data['password']){
        var idSesion = sessionStorage.setItem("id", data['idUsuario']);
        var emailSession = sessionStorage.setItem("email", this.busquedaInputCorreo);
        this.logeado = true;
        if(this.datos['admin'] == true){
          this.admin = true;
        }
      }else if(this.busquedaInputCorreo == data['email'] && this.busquedaInputPass != data['password']){
        alert("El Email o la Contraseña que nos ha facilitado son incorrectos.");
        this.logeado = false;
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
LoginDespuesDeReset(){
    
  this._usuarioService.RequestUsuario(sessionStorage.getItem("email")).subscribe(
  data=>{
    this.datos['email'] = data['email'];
    this.datos['password'] = data['password'];
    this.datos['nombre'] = data['nombre'];
    this.datos['apellidos'] = data['apellidos'];
    this.datos['direccion'] = data['direccion'];
    this.datos['admin'] = data['admin'];
    console.log(this.datos);
    this.logeado = true;
    if(this.datos['admin'] == true){
      this.admin = true;
    } 
  }
)
console.log(this.logeado);
return this.logeado;
}
  validarPassYAñadir(){
    if(this.inputPassword == this.inputPassword2){
      this.user.email =  this.inputCorreo;
      this.user.password = this.inputPassword; 
      this.user.nombre = this.inputNombre;
      this.user.apellidos = this.inputApellidos;
      this.user.direccion = this.inputDireccion;
      this.user.admin = false;    
      console.log(this.user , "datos correctos");
      this._usuarioService.PostUsuario(this.user).subscribe(data =>{        
      })
      var emailSession = sessionStorage.setItem("email", this.inputCorreo);
      this.emailRegistro.emailTo = sessionStorage.getItem("email");
      this.emailRegistro.subject = "BIENVENIDO";      
      this.emailRegistro.body = "Gracias " + this.inputNombre + " por Unirte a la familia de BelakorGames, tu tienda de confianza";         
      this._emailService.PostEmail(this.emailRegistro).subscribe(
        data =>{
          console.log(this.email);
        }
      ) 
    }else{
      alert("Lo sentimos, pero las contraseñas no coinciden");
    }
  } 
    loginAfterRegistro(){
      this._usuarioService.RequestUsuario(sessionStorage.getItem("email")).subscribe(
        data=>{
          console.log(data);
          this.datos['email'] = data['email'];
          this.datos['password'] = data['password'];
          this.datos['nombre'] = data['nombre'];
          this.datos['apellidos'] = data['apellidos'];
          this.datos['direccion'] = data['direccion'];
          this.datos['admin'] = data['admin'];        
          if(this.inputCorreo == data['email'] && this.inputPassword == data['password']){                  
            this.logeado = true;
            var idSesion = sessionStorage.setItem("id", data['idUsuario']);
            if(this.datos['admin'] == true){
              this.admin = true;
            }
          }else if(this.inputCorreo == data['email'] && this.inputPassword != data['password']){
            alert("El Email o la Contraseña que nos ha facilitado son incorrectos.");
            this.logeado = false;
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
  llamadasLogin(){
    this.ObtenerUnUsuarioYAutenticar();    
  }
  llamadasRegistro(){
    this.validarPassYAñadir();
    setTimeout(()=>{
      this.loginAfterRegistro();
    },2000)
  }
  carritoProductos(){
    this.datosPedido.splice(0, this.datosPedido.length);
    this.arrCompras.splice(0, this.arrCompras.length);
    this.precioTotal = 0;
    this._detallePedidoService.RequestDetallePedido().subscribe(
      (data: any) =>{     
      for(let pedido of data){
        if(pedido['idPedido'] == Number(sessionStorage.getItem("idCarrito"))){
          this.datosPedido.push(pedido);
        }               
      }      
      for(let i of this.datosPedido){
        this.cantidadJuegoPedido.push(i['cantidad']);        
        for(let k of this.ProductoArray){
          if(i['idProducto'] == k['idProducto']){            
            this.idProducto = i['idProducto'];          
            this.arrCompras.push(k);
            this.precioParcial = i['cantidad']* k['precio'];                    
            this.precioTotal=  this.precioTotal + this.precioParcial;                       
            console.log("encontrado");
          }
        }        
      }                   
    })
}
deleteDetalle(idProd: number){  
  this.pedidoBorrar.idPedido = Number(sessionStorage.getItem("idCarrito"));
  this.pedidoBorrar.idProducto = idProd;
  this._detallePedidoService.DeleteDetalle(this.pedidoBorrar).subscribe(
    data =>{
      console.log(this.pedidoBorrar);
    }
  )
    
}
  desLogearse(){
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("email");
    window.location.reload();
  }

  comprarPedido(){//proceso de compra
    this.pedidoComprar.idPedido = Number(sessionStorage.getItem("idCarrito"));
    this.pedidoComprar.idUsuario = Number(sessionStorage.getItem("id"));
    var date = new Date();
    var dateFormat = this.datePipe.transform(date, "dd-MM-yyyy");
    this.pedidoComprar.fecha = dateFormat.toString();
    this.pedidoComprar.comprado = true;
    this._pedidoService.updatePedido(this.pedidoComprar).subscribe(
      data =>{
        console.log(this.pedidoComprar);
      }
    );       
    setTimeout(()=>{ //añado setTimeout para que el flujo sea el correcto ya que cuando se hace una request al back esto tarde unos ms
      for(let i of this.arrJuegosStock){//recorro los dos arrays para comprobar si en ambos coinciden los IDproducto para poder modificar el videojuego para cambiarle el stock
        for(let j of this.datosPedido){
          if(i['idProducto'] == j['idProducto']){          
            this.nuevoStock.nombreProducto = i['nombreProducto'];
            this.nuevoStock.descripcionProducto = i['descripcionProducto'];
            this.nuevoStock.precio = i['precio'];
            this.nuevoStock.stock = i['stock'] - j['cantidad'];
            this.nuevoStock.imagen = i['imagen'];
            this.nuevoStock.idCategoria = i['idCategoria'];
            this._ProductoService.PutVideojuego(this.nuevoStock).subscribe(
              data =>{
                console.log(this.nuevoStock);
                console.log("VICTORIA");
              }
            )
          }
        }
      }
      alert("Compra Realizada Satisfactoriamente");
      this.email.emailTo = sessionStorage.getItem("email");
      this.email.subject = "Gracias por comprar en BelakorGames";      
      this.email.body = "Su pedido será enviado en un periodo máximo de 72, gracias por confiar en nosotros";         
      this._emailService.PostEmail(this.email).subscribe(
        data =>{
          console.log(this.email);
        }
      )
      sessionStorage.removeItem("idCarrito");
    },1000);    
  }
  getVideojuegosParaStock(){    
      this._ProductoService.obtenerTodos().subscribe(
        (data: any)=>{
          this.arrJuegosStock = data;
          console.log(this.arrJuegosStock);
        }
      );    
  }  

}
