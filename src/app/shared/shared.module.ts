import { NgModule } from "@angular/core";
import { InputComponent } from "app/shared/input/input.component";
import { RadioComponent } from "app/shared/radio/radio.component";
import { RatingComponent } from "app/shared/rating/rating.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

//exports são os componentes do nosso módulo que podem ser exportados
@NgModule({
    declarations:[InputComponent, RadioComponent, RatingComponent],
    imports:[FormsModule, ReactiveFormsModule, CommonModule],
    exports: [InputComponent, RadioComponent, RatingComponent, 
        FormsModule, ReactiveFormsModule, CommonModule]
})

export class SharedModule{

}