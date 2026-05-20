import { Component, inject } from '@angular/core';
import { ProductCardComponent } from "../../../products/components";
import { ProductService } from '../../../products/services/product';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home-page.component',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {


  productService = inject(ProductService);
  productsResource = rxResource({
    stream: () => {
      return this.productService.getProduct({});
    }
  });
}
