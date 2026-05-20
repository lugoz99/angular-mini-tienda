import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import Swiper from 'swiper';
// import Swiper styles
import 'swiper/css';

// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules'
import { ProductImagePipe } from '../../pipes/product-no-image.pipe';

@Component({
  selector: 'product-carousel',
  imports: [CommonModule, ProductImagePipe],
  templateUrl: './product-carousel.html',
  styles: `
    .swiper{
      width: 100%;
      height: 500px;
      background: #f0f0f0;
    }
    .swiper-slide {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
    .swiper-slide img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  `
})
export class ProductCarouselComponent implements AfterViewInit {


  images = input.required<string[]>()

  swiperDiv = viewChild.required<ElementRef>('swiperDiv')

  ngAfterViewInit(): void {
    const element = this.swiperDiv().nativeElement;
    if(!element) return;

    const swiper = new Swiper(element, {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      modules: [Navigation, Pagination],
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }


}
