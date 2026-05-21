import { Component, inject, input, numberAttribute } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductService } from '../../../products/services/product';
import { ProductCardComponent } from "../../../products/components";
import { TitleCasePipe } from '@angular/common';
import { PaginationComponent } from "../../../shared/components/pagination/pagination";

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardComponent, TitleCasePipe, PaginationComponent],
  templateUrl: './gender-page.component.html',
})
export class GenderPageComponent {


  // señal
  private productService = inject(ProductService)
  gender = input.required<string>();
  page = input(1, {
    transform: (value) => {
      const num = numberAttribute(value)
      return Number.isNaN(num) || num < 1 ? 1 : num
    }
  })



  productsResource = rxResource({
    params : () => ({ gender:this.gender(), page: this.page() - 1}),
    stream :({params}) => this.productService.getProduct({
      offset: params.page * 9,
      gender:params.gender
    })
  })


}
