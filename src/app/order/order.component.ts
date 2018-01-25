import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router'

import {RadioOption} from '../shared/radio/radio-option.model'
import {OrderService} from './order.service'
import {CartItem} from '../restaurant-detail/shopping-cart/cart-item.model'
import {Order, OrderItem} from './order.model';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  //propriedade que representa o formulário
 
orderForm: FormGroup;

  delivery = 8

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Cartão Refeição', value: 'REF'}
  ]

  constructor(private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control('', [ Validators.required, Validators.minLength(3) ]),
      email: this.formBuilder.control(''),
      emailConfirmation: this.formBuilder.control(''),
      address: this.formBuilder.control('', [ Validators.required, Validators.minLength(3) ]),
      number: this.formBuilder.control(''),
      optionalAddres: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('')
     
    
    })
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
        this.router.navigate(['/order-summary'])

        this.orderService.clear()
      })
    console.log(order)
  }

}
