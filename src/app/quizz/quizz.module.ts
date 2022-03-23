import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizzRouting } from './quizz-routing.module';

import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { QuizzComponent } from './pages/quizz/quizz.component';
import { QuizzEndComponent } from './components/quizz-end/quizz-end.component';
import { LoginGuardComponent } from '../shared/login-guard/login-guard.component';



@NgModule({
  declarations: [
    QuizzComponent,
    CatalogueComponent,
    QuizzEndComponent,
    LoginGuardComponent
  ],
  imports: [
    CommonModule,
    QuizzRouting
  ],
  exports: [
    QuizzComponent,
    LoginGuardComponent
  ]
})
export class QuizzModule { }
