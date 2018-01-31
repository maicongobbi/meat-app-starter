import {Component, OnInit} from '@angular/core';

import {Restaurant} from './restaurant/restaurant.model'
import {RestaurantsService} from './restaurants.service'
import {trigger, state, style, transition, animate} from "@angular/animations";
import {FormBuilder, FormGroup, FormControl} from "@angular/forms";

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px"
      })),
      transition('*=>*', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchBarState = 'hidden'
  restaurants: Restaurant[]

  searchForm: FormGroup;
  searchControl: FormControl;

  constructor(private restaurantsService: RestaurantsService,
    private fb: FormBuilder) {}

  ngOnInit() {

    this.searchControl = this.fb.control('')
    this.searchForm = this.fb.group({
      searchControl: this.searchControl

    })

    //se inscreve neste evento para escutar as mudanças de valor do input
    //switch map faz um subscribe do subscribe de forma elegante
    // debouceTime só vai mandar uma msg ou emitir um evento quando houver diferença nas requisições
    // ou seja, a cada 500ms ele manda a nossa requisição
    // distinct untilchange = só muda o filtro caso a query seja diferente, 
    // se for igual ao ´ultimo não atualiza a tela
    this.searchControl.valueChanges.
      debounceTime(500).
      distinctUntilChanged().
      do(searchTerm => console.log(searchTerm)).
      switchMap(searchTerm =>
        this.restaurantsService.restaurants(searchTerm)).
          subscribe(restaurants =>
            this.restaurants = restaurants);

    this.restaurantsService.restaurants()
      .subscribe(restaurants => this.restaurants = restaurants)
  }

  toggleSearch() {
    console.log(this.searchBarState)
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'

  }
}
