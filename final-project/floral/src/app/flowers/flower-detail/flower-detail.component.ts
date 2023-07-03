import { Component, OnInit } from '@angular/core';
import { Flower } from '../flower.model';
import { FlowerService } from '../flower.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';

@Component({
  selector: 'floral-flower-detail',
  templateUrl: './flower-detail.component.html',
  styleUrls: ['./flower-detail.component.css']
})
export class FlowerDetailComponent implements OnInit {
  nativeWindow: any;
  flower: Flower;
  id: string;

  constructor(
    private flowerService: FlowerService,
    private router: Router,
    private route: ActivatedRoute,
    private windRef: WindRefService
    ) {}

  ngOnInit() {
    this.nativeWindow = this.windRef.getNativeWindow();
    this.route.params.subscribe((params: Params) => {
      // this.flower = this.flowerService.getFlower(params['id']);
      this.id = params['id'];
      this.flowerService.getFlower(this.id)
        .subscribe(flowerData => {
          this.flower = flowerData.flower;
          console.log(this.flower);
        });
    });
  }

  onView() {
    if (this.flower.url) {
      this.nativeWindow.open(this.flower.url);
    }
  }

  onDelete() {
    this.flowerService.deleteFlower(this.flower);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
