import {OrderService} from '../order/order.service';
import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service";
import { RestaurantsService } from "../restaurants/restaurants.service";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [],
    imports: [ CommonModule ],
    exports: [],
    providers: [OrderService, RestaurantsService, ShoppingCartService]
})

export class CoreModule{

}