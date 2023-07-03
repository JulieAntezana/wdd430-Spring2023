import { Component, Input, OnInit } from '@angular/core';
import { Flower } from '../flower.model';

@Component({
  selector: 'floral-flower-item',
  templateUrl: './flower-item.component.html',
  styleUrls: ['./flower-item.component.css']
})
export class FlowerItemComponent implements OnInit {
  @Input() flower: Flower;

  constructor() {}

  ngOnInit() {}
}
