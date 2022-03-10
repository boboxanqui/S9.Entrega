import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './quizz/pages/catalogue/catalogue.component';
import { TopsComponent } from './quizz/pages/tops/tops.component';
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
    component: TopsComponent
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
