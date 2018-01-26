import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {isUndefined} from 'util';

@Component({
  selector: 'mt-rating',
  templateUrl: './rating.component.html'
})
export class RatingComponent implements OnInit {

  rates: number[] = [1, 2, 3, 4, 5]
  rate: number = 0;
  previousRate: number;
  @Output() rated = new EventEmitter<number>()

  constructor() {}

  setRate(r) {
    this.rate = r;
    this.previousRate = undefined;
    this.rated.emit(this.rate);
  }

  ngOnInit() {
  }

  setTemporaryRate(r: number) {

    if (this.previousRate === undefined)
      this.previousRate = this.rate;

    this.rate = r;
  }

  clearTemporaryRate() {
    if (this.previousRate !== undefined)
      this.rate = this.previousRate;

    this.previousRate = undefined

  }

}
