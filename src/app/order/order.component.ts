import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router'

import {RadioOption} from '../shared/radio/radio-option.model'
import {OrderService} from './order.service'
import {CartItem} from '../restaurant-detail/shopping-cart/cart-item.model'
import {Order, OrderItem} from './order.model';


@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  delivery = 8

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Cartão Refeição', value: 'REF'}
  ]

  constructor(private orderService: OrderService,
    private router: Router) {}

  ngOnInit() {
  }

  itemsValue(): number {
    return this.orderService.itemsValue()
  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems()
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item)
  }

  remove(item: CartItem) {
    this.orderService.remove(item)
  }

  // transforma os cartItems para order items

  checkOrder(order: Order) {
    order.orderItems = this.cartItems()
      .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id))
    //o subscribe é o ato de se increver no observable e temos q passar algo para que receba a resposta
    this.orderService.checkOrder(order)
      .subscribe((orderId: string) => {
        // MUDAR PARA qundo IMPLEMENTAR o SUMÁRIO:
        // his.router.navigate(['/order-summary'])        
        this.router.navigate(['/home'])
        this.orderService.clear()
      })
    console.log(order)
  }

}
