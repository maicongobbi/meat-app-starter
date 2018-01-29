import { trigger, state, style, transition, animate } from "@angular/animations";
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'], 
  animations:[ 
    trigger('snack-visibility',[
    state('hidden', style({})),
    state('visible', style({})),
    transition('hidden => visible', animate('500ms 0s ease-in')),
    transition('visible => hidden', animate('500ms 0s ease-out'))
    //transitions(estado antigo -> atual, animate (duração  delay  animação)
    ])
  ]
})
export class SnackbarComponent implements OnInit {

  message: string = "Hello dear";
  constructor() {}

  ngOnInit() {
  }

}
