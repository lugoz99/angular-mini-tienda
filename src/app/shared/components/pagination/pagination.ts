import { Component, computed, input, linkedSignal, signal } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-pagination',
  imports: [RouterLink],
  templateUrl: './pagination.html',
})
export class PaginationComponent {


  pages = input(0);

  currentPage = input<number>(1);

  // it creates a signal that updates automatically when another signal(source) changes
  activatePage = linkedSignal({
    source: () => this.currentPage(), // signal to observe
    computation: (page) => page, // new value
  })

  getPagesList = computed(() =>{
    // array is created by lenght pages and it's initialized with a callback 
    return Array.from({length: this.pages()},(_,i) => i + 1)
  })
}
