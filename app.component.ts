import { Component, AfterViewInit, ElementRef } from '@angular/core';

declare var $: any; // Global jQuery

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    $(this.el.nativeElement).find('.sgiOwlMainSlider').owlCarousel({
      loop: true,
      autoplay: true,
      margin: 40,
      nav: false,
      dots: true,
      responsive: {
        0: { items: 1, dots: false },
        600: { items: 1, dots: false },
        990: { items: 1, dots: false },
        1000: { items: 1 }
      }
    });
  }
}
