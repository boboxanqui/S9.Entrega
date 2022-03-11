import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from '../guards/validar-token.guard';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { QuizzComponent } from './pages/quizz/quizz.component';

const routes: Routes = [
    {
        path: '',
        component: CatalogueComponent
    },
    {
        path: 'juego/:id',
        component: QuizzComponent,
        canActivate: [ ValidarTokenGuard ],
        canLoad: [ ValidarTokenGuard ],
    },
    {
        path: '**',
        redirectTo: 'catalogo'
    }
]

@NgModule({
    imports: [ RouterModule.forChild( routes ) ],
    exports: [ RouterModule ]
})

export class QuizzRouting {

}