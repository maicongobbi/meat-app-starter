import { NgModule } from "@angular/core";
import { InputComponent } from "app/shared/input/input.component";
import { RadioComponent } from "app/shared/radio/radio.component";
import { RatingComponent } from "app/shared/rating/rating.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ModuleWithProviders } from "@angular/core";
import { OrderService } from "app/order/order.service";
import { RestaurantsService } from "app/restaurants/restaurants.service";
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";

//exports são os componentes do nosso módulo que podem ser exportados
@NgModule({
    declarations:[InputComponent, RadioComponent, RatingComponent],
    imports:[FormsModule, ReactiveFormsModule, CommonModule],
    exports: [InputComponent, RadioComponent, RatingComponent, 
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
         providers: [OrderService, RestaurantsService, ShoppingCartService]
     }
 }
}