import {MenuItem} from './menu-item.model';
import {trigger, transition, style, animate, state} from "@angular/animations";
import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';



@Component({
  selector: 'mt-menu-item',
  templateUrl: './menu-item.component.html',
  animations: [
    trigger('menuItemAppeared', [
      state('ready', style({opacity: 1})),
      transition('void =>ready', [
        style({opacity: 0, transform: 'translateY(-30px)'}),
        animate('500ms 0s ease-in') //entra acelerando e termina a animação desaceleradno
      ])
    ])
    //void ainda não está na árvore de componentes, [] estilo da transição
  ]
})

export class MenuItemComponent implements OnInit {

  menuItemState = 'ready';

  @Input() menuItem: MenuItem
  @Output() add = new EventEmitter()

  constructor() {}

  ngOnInit() {
  }

  emitAddEvent() {
    this.add.emit(this.menuItem)
  }

}
