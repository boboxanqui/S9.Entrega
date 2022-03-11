import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopsRoutingModule } from './tops-routing.module';
import { TopsComponent } from './pages/tops/tops.component';


@NgModule({
  declarations: [
    TopsComponent
  ],
  imports: [
    CommonModule,
    TopsRoutingModule
  ],
  exports: [
    TopsComponent
  ]
})
export class TopsModule { }
