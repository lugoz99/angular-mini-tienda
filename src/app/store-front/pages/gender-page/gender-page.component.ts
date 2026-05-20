import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductService } from '../../../products/services/product';
import { ProductCardComponent } from "../../../products/components";
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardComponent,TitleCasePipe],
  templateUrl: './gender-page.component.html',
})
export class GenderPageComponent {


  // señal
  private productService = inject(ProductService)
  gender = input.required<string>();


  productsResource = rxResource({
    params : () => ({ gender:this.gender()}),
    stream :({params}) => this.productService.getProduct({gender:params.gender})
  })


}
