import {Injectable} from '@angular/core'
import {Http} from '@angular/http'

import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'


import {MenuItem} from '../restaurant-detail/menu-item/menu-item.model'

import {MEAT_API} from '../app.api'
import {ErrorHandler} from '../app.error-handler'
import { Restaurant } from './restaurant/restaurant.model';

@Injectable()
export class RestaurantsService {

    constructor(private http: Http){}

  //params:{q:search} - essa consulta faz como se fosse um sql no json, 
  //buscando em todos os atrributos do objetos quais dão match com o search
  
  //já se passássemos algo do tipo {name: search } seria uma busca integral com o que se busca e o nome do att, exemplo joao = joao
    restaurants(search?:string): Observable<Restaurant[]> {
      return this.http.get(`${MEAT_API}/restaurants`, {params: {q: search}})
        .map(response => response.json())
        .catch(ErrorHandler.handleError)
    }

    restaurantById(id: string): Observable<Restaurant>{
      return this.http.get(`${MEAT_API}/restaurants/${id}`)
        .map(response => response.json())
        .catch(ErrorHandler.handleError)
    }

    reviewsOfRestaurant(id: string): Observable<any>{
      return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
        .map(response => response.json())
        .catch(ErrorHandler.handleError)
    }

    menuOfRestaurant(id: string): Observable<MenuItem>{
      return this.http.get(`${MEAT_API}/restaurants/${id}/menu`)
        .map(response => response.json())
        .catch(ErrorHandler.handleError)
    }

}
