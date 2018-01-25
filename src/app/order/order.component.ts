import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router'

import {RadioOption} from '../shared/radio/radio-option.model'
import {OrderService} from './order.service'
import {CartItem} from '../restaurant-detail/shopping-cart/cart-item.model'
import {Order, OrderItem} from './order.model';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';


@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  numberPattern = /^[0-9]*$/

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
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddres: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('', [Validators.required])
      }, {validator: OrderComponent.equalsTo})
      
  }
  
  /**
   * essa validação retorna para o form group que a associamos
   */
  static equalsTo(group: AbstractControl): {[key: string]: boolean }{
    //os valores aqui passados são os mesmos declarados acima e não o name do form
    const email = group.get('email');
    const emailConfirmation = group.get('emailConfirmation');
    
    console.log("equals")
    console.log(email.value)
    console.log(emailConfirmation.value)
    
    if(!email || !emailConfirmation)
      return undefined;
    
    if(email.value !== emailConfirmation.value){
    //retorno de uma chave, podemos criar qq coisa, criamos essa chave emailsnotmatrch
    console.log("fim equals")
      return {emailsNotMatch:true};
    
    }
    
    return undefined;
    
    
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
