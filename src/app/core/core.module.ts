import {OrderService} from '../order/order.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { ShoppingCartService } from 'app/restaurant-detail/shopping-cart/shopping-cart.service';

@NgModule({
    declarations: [],
    imports: [ CommonModule ],
    exports: [],
    providers: [OrderService, RestaurantsService, ShoppingCartService]
})

export class CoreModule{

}