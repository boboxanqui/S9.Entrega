import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './welcome/inicio/inicio.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'juegos',
    loadChildren: () => import('./quizz/quizz-routing.module').then( m => m.QuizzRouting )
  },
  {
    path: 'clasificaciones',
    loadChildren: () => import('./tops/tops-routing.module').then( m => m.TopsRoutingModule )
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
