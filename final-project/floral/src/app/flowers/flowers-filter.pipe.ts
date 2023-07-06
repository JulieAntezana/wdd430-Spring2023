import { Pipe, PipeTransform } from '@angular/core';
import { Flower } from './flower.model';

@Pipe({
  name: 'flowersFilter'
})
export class FlowersFilterPipe implements PipeTransform {

  transform(flowers: Flower[], term) { 
    let filteredFlowers: Flower[] =[];  
    if (term && term.length > 0) {
       filteredFlowers = flowers.filter(
          (flower:Flower) => flower?.commonName.toLowerCase().includes(term.toLowerCase())
       );
       return filteredFlowers;
    } else {
      return flowers;
    }

 }

}