import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../service/usuario.service';
import { Usuario } from '../usuario/usuario';
import { AppComponent } from '../app.component';
import { Pedido } from '../pedido/Pedido';
import { Videojuegos } from '../videojuegos/Videojuegos';
import { ProductoService } from '../service/producto.service';
import { Categoria } from '../categoria/categoria';
import { CategoriaService } from '../service/categoria.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public arrUsuarios: Array<Usuario>;
  public productoArray: Array<Videojuegos>; 
  public inputNombreVideojuego: string;
  public inputDescripcion: string;
  public inputStock: number;
  public inputPrecio: number;
  public inputIdCategoria: number;
  public inputImagen: string;
  public idUsuario: number;
  public nombreJuego: string;
  public descripJuego: string;
  public precioJuego: number;
  public catJuego: number;
  public imagenJuego: string;
  public inputCatNombreCategoria: string;
  public inputDescripcionCategoria: string;
  public inputModNombreVideojuego: string;
  public inputModDescripcion: string;
  public inputModStock: number;
  public inputModPrecio: number;
  public inputModIdCategoria: number;
  public inputModImagen: string;
  public videojuego = new Videojuegos();
  public categoria = new Categoria();
  public catSelect: string = '';
  public usuarioMod = new Usuario();
  public inputEmailUser: string;
  public inputPassUser: string;
  public inputNombreUser: string;
  public inputApellidosUser: string;
  public inputDireccionUser: string;
  public inputAdminUser: boolean;
  public idCat: number;
  public datos: Array<Categoria>=[];
  public arrCats: Array<Categoria> = [];
  public emailMod: string;
  public passwordMod: string;
  public nameJuego: string;
  public imagenGame: string;


  constructor(private _productoService: ProductoService, private _categoriaService: CategoriaService, private _usuarioService: UsuarioService) { 
    this.productoArray = [];
    this.arrUsuarios = [];
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
        if(this.catSelect == this.datos['NombreCategoria']){
          this.idCat = this.datos['IdCategoria']
        }
      },
      error=>{
        var errorMessage = error as any;
        console.log(errorMessage);
    }
    
    )
  }
  
  createVideojuego(){
      
      this.videojuego.nombreProducto =  this.inputNombreVideojuego;
      this.videojuego.descripcionProducto = this.inputDescripcion; 
      this.videojuego.precio = this.inputPrecio;
      this.videojuego.stock = this.inputStock;
      this.videojuego.imagen = this.inputImagen;
      console.log(this.idCat);
      this.videojuego.idCategoria = this.idCat;    
      console.log(this.videojuego , "datos correctos");
      this._productoService.PostVideojuego(this.videojuego).subscribe(data =>{
        console.log(data);
        alert("Videojuego dado de alta");
      })
      window.location.reload();
    }

  obtenerListaJuegos(){
    this._productoService.obtenerTodos().subscribe(
      (data: any)=>{
      console.log(data);
      this.productoArray = data;
      console.log(this.productoArray);    
    });
  }

  obtnerUsuarios(){
    this._usuarioService.GetAllUsuarios().subscribe(
      (data: any)=>{
        console.log(data);
        this.arrUsuarios = data;
      }
    )
  }
  getNameImagen(nombre: string, imagen: string){
  
    this.nameJuego = nombre;
    this.imagenGame = imagen;
    
  }

  modificarJuego(){      
    this.videojuego.nombreProducto =  this.nameJuego;
    this.videojuego.descripcionProducto = this.inputModDescripcion; 
    this.videojuego.precio = this.inputModPrecio;
    this.videojuego.stock = this.inputModStock;
    this.videojuego.imagen = this.imagenGame;
    this.videojuego.idCategoria = this.idCat;   
    this._productoService.PutVideojuego(this.videojuego).subscribe(data =>{      
      alert("Videojuego Modificado Correctamente");
    })   
}
createCategoria(){  
  this.categoria.NombreCategoria = this.inputCatNombreCategoria; 
  this.categoria.DescripcionCategoria = this.inputDescripcionCategoria;      
  console.log(this.categoria , "datos correctos");
  this._categoriaService.PostCategoria(this.categoria).subscribe(data =>{
    console.log(data);
    alert("Categoria Creada");
  })
}

getIDUser(id: number){
  this.idUsuario = id;
}

borrarUsuario(id: number){
  this._usuarioService.DeleteUsuario(id).subscribe(data =>{
    alert("Usuario Borrado Correctamente");
    window.location.reload();
  })  
}
getEmailyPass(email: string, password: string){
  
  this.emailMod = email;
  this.passwordMod = password; 
}

upUsuario(){    
    console.log(this.idUsuario + "aaaa");
    this.usuarioMod.idUsuario = this.idUsuario;
    this.usuarioMod.email =  this.emailMod;
    this.usuarioMod.password = this.passwordMod; 
    this.usuarioMod.nombre = this.inputNombreUser;
    this.usuarioMod.apellidos = this.inputApellidosUser;
    this.usuarioMod.direccion = this.inputDireccionUser;
    this.usuarioMod.admin = false;
    console.log(this.usuarioMod );
    this._usuarioService.updateUsuario(this.usuarioMod).subscribe(data =>{
      console.log(data);
      alert("Usuario Modificado Correctamente");
    })
    window.location.reload();
}

pedirDatos(id: number, email: string, password: string){
  this.getIDUser(id);
  this.getEmailyPass(email, password);  
}

sacarDatosJuego(nombreJuego: string, descripJuego: string, precioJuego: number, catJuego: number, imagenJuego: string){
  this.nombreJuego = nombreJuego;
  this.descripJuego = descripJuego;
  this.precioJuego = precioJuego;
  this.catJuego = catJuego;
  this.imagenJuego = imagenJuego;

  setTimeout(()=>{
    this.borradoDeJuego();
  },2000)
}

borradoDeJuego(){
    this.videojuego.nombreProducto =  this.nombreJuego;
    this.videojuego.descripcionProducto = this.descripJuego; 
    this.videojuego.precio = this.precioJuego;
    this.videojuego.stock = -1;
    this.videojuego.imagen = this.imagenJuego;
    this.videojuego.idCategoria = this.catJuego;    
    console.log(this.videojuego , "datos correctos");
    this._productoService.PutVideojuego(this.videojuego).subscribe(data =>{      
      alert("Videojuego Borrado Correctamente");
    })
    window.location.reload();
}
}
