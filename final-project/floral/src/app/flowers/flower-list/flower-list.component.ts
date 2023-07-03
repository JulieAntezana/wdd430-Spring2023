import { Component, OnInit, OnDestroy } from '@angular/core';
import { Flower } from '../flower.model';
import { FlowerService } from '../flower.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'floral-flower-list',
  templateUrl: './flower-list.component.html',
  styleUrls: ['./flower-list.component.css']
})
export class FlowerListComponent implements OnInit {
  flowers: Flower[] = [];
  term: string;
  subscription: Subscription;

  constructor(private flowerService: FlowerService) {}

  ngOnInit() {
     
    this.subscription = this.flowerService.flowerChangedEvent.subscribe((flowers: Flower[]) => {
      this.flowers = flowers;
      }
    );

    this.flowerService.getFlowers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onKeyPress(value: string) {
    this.term = value;
  }

  search(value: string) {
    this.term = value;
  }
}

