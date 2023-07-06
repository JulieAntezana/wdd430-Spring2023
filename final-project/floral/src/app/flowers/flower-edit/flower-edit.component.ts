import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Flower } from '../flower.model';
import { FlowerService } from '../flower.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'floral-flower-edit',
  templateUrl: './flower-edit.component.html',
  styleUrls: ['./flower-edit.component.css'],
})
export class FlowerEditComponent implements OnInit {
  originalFlower: Flower;
  flower: Flower;
  groupFlowers: Flower[] = [];
  editMode: boolean = false;
  id: string;
  flowerInvalid: boolean = false;

  constructor(
    private flowerService: FlowerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      if (!this.id) {
        this.editMode = false;
        return;
      }

      // this.originalFlower =
      // this.flowerService.getFlower(this.id)

      this.flowerService.getFlower(this.id).subscribe((flowerData) => {
        this.originalFlower = flowerData.flower;
        if (!this.originalFlower) {
          return;
        }
        this.editMode = true;
        this.flower = JSON.parse(JSON.stringify(this.originalFlower));
        console.log(this.flower);

        if (this.originalFlower.group && this.originalFlower.group.length > 0) {
          this.groupFlowers = JSON.parse(
            JSON.stringify(this.originalFlower.group)
          );
        }
      });
    });
  }
  onSubmit(form: NgForm) {
    let value = form.value;
    let newFlower = new Flower(
      value.commonName,
      value.botanicalName,
      value.color,
      value.url,
      value.imageUrl,
      this.groupFlowers
    );
    // console.log(this.editMode);
    if (this.editMode) {
      this.flowerService.updateFlower(this.originalFlower, newFlower);
    } else {
      this.flowerService.addFlower(newFlower);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['/flowers']);
    // , { relativeTo: this.route });
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupFlowers.length) {
      return;
    }

    this.groupFlowers.splice(index, 1);
  }

  isInvalidFlower(newFlower: Flower) {
    if (!newFlower) {
      return true;
    }
    if (this.flower && newFlower.id === this.flower.id) {
      return true;
    }

    for (let i = 0; i < this.groupFlowers.length; i++) {
      if (newFlower.id === this.groupFlowers[i].id) {
        return true;
      }
    }
    return false;
    // return this.groupFlowers.some((c) => newFlower.id === c.id);
  }

  addToGroup(event: CdkDragDrop<string[]>) {
    const selectedFlower: Flower = event.item.data;
    const invalidGroupFlower = this.isInvalidFlower(selectedFlower);
    if (invalidGroupFlower) {
      return;
    }
    this.groupFlowers.push(selectedFlower);
    this.flower.group.push(selectedFlower);
  }
}
