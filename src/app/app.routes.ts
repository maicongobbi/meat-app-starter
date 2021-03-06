import {Routes} from '@angular/router'

import {HomeComponent} from './home/home.component'
import { NotFoundComponent } from "./not-found/not-found.component";
import {RestaurantsComponent} from './restaurants/restaurants.component'
import {RestaurantDetailComponent} from './restaurant-detail/restaurant-detail.component'

import { OrderSummaryComponent } from './order-summary/order-summary.component';
import {MenuComponent} from './restaurant-detail/menu/menu.component'
import {ReviewsComponent} from './restaurant-detail/reviews/reviews.component'

/**
 * rotas mais específicas ficam em cima enquanto que as mais genéricas acabem ficando por último,
 * de preferência colocar o wild card como last
 */
export const ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'restaurants', component: RestaurantsComponent},
  {path: 'restaurants/:id', component: RestaurantDetailComponent,
    children: [
      {path: '', redirectTo: 'menu', pathMatch: 'full'},
      {path: 'menu', component: MenuComponent},
      {path: 'reviews', component: ReviewsComponent}
    ]},
  {path: 'order', loadChildren: './order/order.module#OrderModule'},
  {path: 'order-summary', component: OrderSummaryComponent},
  {path: 'about', loadChildren: './about/about.module#AboutModule'}, //carregamento lazy da app about
  {path: '**', component: NotFoundComponent} //rota wild card - é como se fosse um coringa, caso não encontre
  //a rota certa ele entrará neste componente
  
  
]
