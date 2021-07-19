import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideojuegosComponent } from './videojuegos/videojuegos.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { AdminComponent } from './admin/admin.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { PedidoComponent } from './pedido/pedido.component';
import { DetallePedidoComponent } from './detalle-pedido/detalle-pedido.component';
import { DatePipe } from '@angular/common';
import { ValoracionComponent } from './valoracion/valoracion.component';
import { ListaDeseosComponent } from './lista-deseos/lista-deseos.component';
import { EmailComponent } from './email/email.component';

@NgModule({
  declarations: [
    AppComponent,
    VideojuegosComponent,
    BuscadorComponent,
    HomeComponent,
    PerfilComponent,
    AdminComponent,
    UsuarioComponent,
    CategoriaComponent,
    PedidoComponent,
    DetallePedidoComponent,
    ValoracionComponent,
    ListaDeseosComponent,
    EmailComponent
   
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,                      
    RouterModule.forRoot([
      {path: 'Home' , component: HomeComponent},
      {path: '', redirectTo: '/Home', pathMatch: 'full'}
    ]),
    FormsModule,    
    HttpClientModule,
    Ng2SearchPipeModule,
    NgbModule
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
