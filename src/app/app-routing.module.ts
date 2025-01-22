import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ActividadComponent } from './actividad/actividad.component';
import { EditarActividadComponent } from './editar-actividad/editar-actividad.component';


const routes: Routes = [
  { path: 'registro/:ussIdSesion', component: ActividadComponent },
  { path: '', redirectTo: '/registro', pathMatch: 'full' },
  { path: 'editar/:actSecuencia', component: EditarActividadComponent }
];

@NgModule({
  imports: [ CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
   })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
