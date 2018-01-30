import { OrderService } from "../order/order.service";
import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service";
import { RestaurantsService } from "../restaurants/restaurants.service";
import { InputComponent } from "./input/input.component";
import { NotificationService } from "./messages/notification.service";
import { NgModule } from "@angular/core";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ModuleWithProviders } from "@angular/core";

import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { RadioComponent } from "./radio/radio.component";
import { RatingComponent } from "./rating/rating.component";

//exports são os componentes do nosso módulo que podem ser exportados
@NgModule({
    declarations:[InputComponent, RadioComponent, RatingComponent, SnackbarComponent],
    imports:[FormsModule, ReactiveFormsModule, CommonModule],
    exports: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent, 
        FormsModule, ReactiveFormsModule, CommonModule]
})

export class SharedModule{
    /**
     * retorna um módulo com providers com as config do nosso módulo
     * e os providers que queremos
     * tudo em um só lugar
     * essa função deixa o nosso core mod obsoleto
     */
 static forRoot(): ModuleWithProviders {
     return {
         ngModule: SharedModule,
         providers: [OrderService, RestaurantsService, ShoppingCartService, NotificationService ]
     }
 }
}