import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopsComponent } from './pages/tops/tops.component';

const routes: Routes = [
  {
    path: '',
    component: TopsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopsRoutingModule { }
