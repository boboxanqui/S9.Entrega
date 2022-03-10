import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from "@angular/common/http";
import { QuizzRouting } from './quizz-routing.module';

import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { TopsComponent } from './pages/tops/tops.component';
import { QuizzComponent } from './pages/quizz/quizz.component';
import { QuizzEndComponent } from './components/quizz-end/quizz-end.component';



@NgModule({
  declarations: [
    QuizzComponent,
    TopsComponent,
    CatalogueComponent,
    QuizzEndComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    QuizzRouting
  ],
  exports: [
    QuizzComponent,
    TopsComponent
  ]
})
export class QuizzModule { }
