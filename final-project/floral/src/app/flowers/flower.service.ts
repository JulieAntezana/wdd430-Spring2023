import { Subject } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { Flower } from './flower.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FlowerService {
  flowerSelectedEvent = new EventEmitter<Flower>();
  flowerChangedEvent = new Subject<Flower[]>();

  private flowersUrl = 'http://localhost:3000/flowers/';
  private flowers: Flower [] = [];
  // private maxFlowerId: number;
  
  constructor(private http: HttpClient) { 
    // this.maxFlowerId = this.getMaxId();
  }

  sortAndSend() {
    this.flowers.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
      this.flowerChangedEvent.next(this.flowers.slice());
    });
  }

  getFlowers() {
    this.http
      .get<{ message: string, flowers: Flower[] }>(this.flowersUrl)
      .subscribe(
        (responseData) => {
          this.flowers = responseData.flowers;
          this.sortAndSend();
          this.flowerChangedEvent.next(this.flowers.slice());
        },
        (error: any) => {
          console.error(error.message);
          console.error(error.error);
        },
      );
  }

  getFlower(id: string) {
    return this.http.get<{message: string, flower: Flower}>(this.flowersUrl + '/' + id);
  }

  addFlower(newFlower: Flower) {
    if (!newFlower) {
      return;
    }
    
    newFlower.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

   
    this.http.post<{ message: string, flower: Flower }>(this.flowersUrl,
    newFlower,
    { headers: headers })
    .subscribe(
      (responseData) => {
        console.log(responseData.message);
        // add new flower to flowers
        this.flowers.push(responseData.flower);
        this.sortAndSend();
        this.flowerChangedEvent.next(this.flowers.slice());
      },
      (error: any) => {
        console.error(error.message);
        console.error(error.error);
      },
    );
  }

  deleteFlower(flower: Flower) { 
    if (!flower) {
      return;
   }
   const pos = this.flowers.findIndex(f => f.id === flower.id);
   if (pos < 0) {
      return;
   }

   this.http.delete(this.flowersUrl + flower.id)
     .subscribe(
       (response: Response) => {
         this.flowers.splice(pos, 1);
         this.flowers.sort();
         this.flowerChangedEvent.next(this.flowers.slice());
       },
       (error: any) => {
        console.error(error.message);
        console.error(error.error);
      },
     );

  }

  updateFlower(originalFlower: Flower, newFlower: Flower) {
    if (!newFlower || !originalFlower) return;
    const pos = this.flowers.findIndex(flower => flower.id === originalFlower.id);
    console.log(originalFlower);
    if (pos < 0) {
      return;
    } 

    newFlower.id = originalFlower.id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http
      .put<{ message: string }>(
        this.flowersUrl + originalFlower.id,
        newFlower,
        {
          headers: headers})
          .subscribe(
            (res) => {
            console.log(res.message);
            this.flowers[pos] = newFlower;
            this.sortAndSend();
            this.flowerChangedEvent.next(this.flowers.slice());
          },
          (error: any) => {
            console.error(error.message);
            console.error(error.error);
          },
      );
  }
}
