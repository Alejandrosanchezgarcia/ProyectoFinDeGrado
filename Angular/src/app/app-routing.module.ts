import { VideojuegosComponent } from './videojuegos/videojuegos.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AdminComponent } from './admin/admin.component';
import { CategoriaComponent } from './categoria/categoria.component';

const routes: Routes = [
  {path: 'Home' , component: HomeComponent},
  {path: 'Videojuegos' , component: VideojuegosComponent},
  {path: 'Buscador' , component: BuscadorComponent},
  {path: 'Categoria', component: CategoriaComponent},
  {path: 'Perfil' , component: PerfilComponent},
  {path: 'Admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
