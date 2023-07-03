import { Component, OnInit } from '@angular/core';
import { Flower } from './flower.model';
import { FlowerService } from './flower.service';

@Component({
  selector: 'floral-flowers',
  templateUrl: './flowers.component.html',
  styleUrls: ['./flowers.component.css']
})
export class FlowersComponent {
  selectedFlower: Flower;

  constructor(private flowerService: FlowerService) {}

  ngOnInit() {
    this.flowerService.flowerSelectedEvent
    .subscribe((flower: Flower) => {
      this.selectedFlower = flower;
    }
  );
  }

}
