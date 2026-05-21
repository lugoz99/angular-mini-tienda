import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, Observable, of, tap } from 'rxjs';
import { Product, ProductResponse } from '../interfaces/product.interface';
import { environment } from '../../../environments/environment'

const baseUrl = environment.baseUrl

interface Options{
  limit?:   number;
  offset?:  number;
  gender?:  string;
}
@Injectable({
  providedIn: 'root',
})
export class ProductService {


  private http = inject(HttpClient);

  private productsCache = new Map<string,ProductResponse>();
  private productCache = new Map<string, Product>()

  getProduct(options:Options):Observable<ProductResponse>{

    const { limit = 9 , offset = 0, gender = ''} = options;

    const key = `${limit}-${offset}-${gender}`
    // TODO:  this can be done with tanstack
    if(this.productsCache.has(key)){
      return of(this.productsCache.get(key)!)
    }
    return this.http.get<ProductResponse>(`${baseUrl}/products`,{
      params:{
        limit,
        offset,
        gender
      }
    })
      .pipe(
        tap((data)=>console.log(data)),
        tap((data) => this.productsCache.set(key,data))
      )
  }

  getProductBySlug(idSlug:string):Observable<Product>{


    const key = `${idSlug}`
    if(this.productCache.has(key)){
      return of(this.productCache.get(key)!)
    }
    return this.http.get<Product>(`${baseUrl}/products/${idSlug}`).pipe(
      //delay(2000), // para ver,
      tap( (resp) => this.productCache.set(key,resp))
    )
  }
}
