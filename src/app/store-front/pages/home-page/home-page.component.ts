import { Component, inject, input, numberAttribute, signal } from '@angular/core';
import { ProductCardComponent } from "../../../products/components";
import { ProductService } from '../../../products/services/product';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginationComponent } from "../../../shared/components/pagination/pagination";

@Component({
  selector: 'app-home-page.component',
  standalone: true,
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {


  productService = inject(ProductService);


  page = input(1, {
    transform:(val) => {
      const num = numberAttribute(val); // Devuelve un número puro o NaN de forma segura
      return Number.isNaN(num) || num < 1 ? 1: num
    }
  })
  productsResource = rxResource({
    params:()=>({page:this.page() - 1}),
    stream: ({params}) => {
      return this.productService.getProduct({
        // en la 6 no hay registros entonces se resta 1 , pagina 1 es la 0
        offset:params.page * 9 // de 9 en 9
      
      }
      
      );
    }
  });
}
