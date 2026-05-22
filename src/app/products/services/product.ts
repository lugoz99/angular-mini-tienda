import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, Observable, of, tap } from 'rxjs';
import { Product, ProductResponse } from '../interfaces/product.interface';
import { environment } from '../../../environments/environment'
import { CacheManager } from '../../shared/utils/cache-manager';

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

  private productsCache = new CacheManager<ProductResponse>(5 * 60 * 1000); // 5 minutos
  private productCache = new CacheManager<Product>(10 * 60 * 1000); // 10 minutos

  getProduct(options:Options):Observable<ProductResponse>{

    const { limit = 9 , offset = 0, gender = ''} = options;
    const key = `${limit}-${offset}-${gender}`

    const cached = this.productsCache.get(key);
    if(cached){
      return of(cached)
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
        tap((data) => this.productsCache.set(key, data))
      )
  }

  getProductBySlug(idSlug:string):Observable<Product>{

    const key = `${idSlug}`
    const cached = this.productCache.get(key);
    if(cached){
      return of(cached)
    }

    return this.http.get<Product>(`${baseUrl}/products/${idSlug}`).pipe(
      tap( (resp) => this.productCache.set(key, resp))
    )
  }
}
