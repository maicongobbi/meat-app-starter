import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, LOCALE_ID} from '@angular/core';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {ROUTES} from './app.routes'
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {RestaurantsComponent} from './restaurants/restaurants.component';
import {RestaurantComponent} from './restaurants/restaurant/restaurant.component';
import {RestaurantDetailComponent} from './restaurant-detail/restaurant-detail.component';
import {ShoppingCartComponent} from './restaurant-detail/shopping-cart/shopping-cart.component';
import {MenuItemComponent} from './restaurant-detail/menu-item/menu-item.component';
import {ReviewsComponent} from './restaurant-detail/reviews/reviews.component';
import {OrderSummaryComponent} from './order-summary/order-summary.component';


import { PreloadAllModules } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { MenuComponent } from "./restaurant-detail/menu/menu.component";
import { SharedModule } from "./shared/shared.module";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,    
    RestaurantsComponent,
    RestaurantComponent,
    RestaurantDetailComponent,
    MenuComponent,
    ShoppingCartComponent,
    MenuItemComponent,
    ReviewsComponent,
    OrderSummaryComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
   // CoreModule,
    SharedModule.forRoot(),    
    RouterModule.forRoot(ROUTES, {preloadingStrategy:PreloadAllModules})
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})

//SharedModule.forRoot(),    importa ele e mais os providers
//preloadingStrategy:PreloadAllModules carrega préviamente os módulos
// o provider serve para servir instâncias para aqueles que querem injetá-lo em seus componentes
// módulo possuem uma injeção de dependência própria
export class AppModule {}
