import { Component, computed, input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Product, ProductResponse } from '../../interfaces/product.interface';
import { SlicePipe } from '@angular/common';
import { ProductImagePipe } from '../../pipes/product-no-image.pipe';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [RouterLink , SlicePipe, ProductImagePipe],
  templateUrl: './product-card.html',
})
export class ProductCardComponent {

  product = input.required<Product>();

  imageUrl = computed(()=> {
    return `http://localhost:3000/api/files/product/${this.product().images[0]}`
  })

}
