import {Component, OnInit, Input, ContentChild, AfterContentInit} from '@angular/core';
import {NgModel, FormControlName} from '@angular/forms'
import { log } from 'util';

@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {

  @Input() label: string;
  @Input() errorMessage: string;

  input: any;

  @ContentChild(NgModel) model: NgModel;
  @ContentChild(FormControlName) control: FormControlName;

  constructor() {}

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.input = this.model || this.control;

    if(!this.input){
      console.log('Esse componente precisa ser usado com uma diretiva ngModel ou formControlName');
     // throw new Error('Esse componente precisa ser usado com uma diretiva ngModel ou formControlName')
    }
  }

  hasSuccess(): boolean {
    
    if (this.input)
      return this.input.valid && (this.input.dirty || this.input.touched);
    return false;
  }

  hasError(): boolean {
    
    if (this.input)
      return this.input.invalid && (this.input.dirty || this.input.touched);
    return false;
  }
}
