import { NgModule } from '@angular/core';


import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from 'app/about/about.component';

//path '' é o caminho default
const ROUTES: Routes = [
  {path:'', component: AboutComponent}
]

/**
 * declarations lista todos os componentes que devemos ter em nosso módulo
 */
@NgModule({
  declarations: [AboutComponent],
  imports:[RouterModule.forChild(ROUTES)]
})


export class AboutModule{
  
}