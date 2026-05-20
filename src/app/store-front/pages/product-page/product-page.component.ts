import { Component, inject, input } from '@angular/core';
import { ProductService } from '../../../products/services/product';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCarouselComponent } from "../../../products/components/product-carousel/product-carousel";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-page',
  imports: [ProductCarouselComponent,RouterLink],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {

  // productSlug

  idSlug = input.required<string>()
  private productService = inject(ProductService)


  productResource = rxResource({
    params: () => ({ idSlug: this.idSlug() }),
    stream:({params}) => this.productService.getProductBySlug(params.idSlug),
  })


}
