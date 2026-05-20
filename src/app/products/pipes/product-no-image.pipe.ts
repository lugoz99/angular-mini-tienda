import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

const baseUrl = environment.baseUrl;

@Pipe({
  name: 'productImage'
})
export class ProductImagePipe implements PipeTransform {
  transform(value: string[] | string | null | undefined): string {
    
    // si es array, toma el primer elemento
    const item = Array.isArray(value) ? value.at(0) : value;

    // si item undefined o vacio salta a placeholder
    return (item && item.trim().length > 0)
      ? `${baseUrl}/files/product/${item}` 
      : '/assets/images/no-image.png';
  }
}
