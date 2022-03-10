import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { QuizzComponent } from './pages/quizz/quizz.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'catalogo',
                component: CatalogueComponent
            },
            {
                path: 'juego/:id',
                component: QuizzComponent
            },
            {
                path: '**',
                redirectTo: 'catalogo'
            }
        ]
    }
]

@NgModule({
    imports: [ RouterModule.forChild( routes ) ],
    exports: [ RouterModule ]
})

export class QuizzRouting {

}