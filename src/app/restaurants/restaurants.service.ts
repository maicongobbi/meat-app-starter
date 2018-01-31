import {Injectable} from '@angular/core'
import {HttpClient, HttpParams} from '@angular/common/http'

import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'


import {MenuItem} from '../restaurant-detail/menu-item/menu-item.model'

import {MEAT_API} from '../app.api'
import {ErrorHandler} from '../app.error-handler'
import {Restaurant} from './restaurant/restaurant.model';

@Injectable()
export class RestaurantsService {

  constructor(private http: HttpClient) {}

  //params:{q:search} - essa consulta faz como se fosse um sql no json, 
  //buscando em todos os atrributos do objetos quais dão match com o search

  //já se passássemos algo do tipo {name: search } seria uma busca integral com o que se busca e o nome do att, exemplo joao = joao
  restaurants(search?: string): Observable<Restaurant[]> {
    let params: HttpParams = undefined

    if (search) {
      params = new HttpParams().set('q', search)
    }

    return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, {params: params})

  }

  restaurantById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`)


  }

  reviewsOfRestaurant(id: string): Observable<any> {
    return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)

  }

  menuOfRestaurant(id: string): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`)
  }

}
