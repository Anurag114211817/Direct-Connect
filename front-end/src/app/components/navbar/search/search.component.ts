import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styles: ``,
})
export class SearchComponent {
  onBlur(ele: HTMLDivElement) {
    ele.classList.add('bg-[#fff6]');
    ele.classList.remove('text-black');
    ele.classList.remove('bg-[#fffd]');
  }
  onFocus(ele: HTMLDivElement) {
    ele.classList.add('bg-[#fffd]');
    ele.classList.add('text-black');
    ele.classList.remove('bg-[#fff6]');
  }
}
