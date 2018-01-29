import { Component, OnDestroy, Renderer2, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnDestroy, OnInit {

  constructor(private renderer: Renderer2, private elRef: ElementRef) {
    this.renderer.addClass(document.body, '1-column');
    this.renderer.setAttribute(document.body, 'data-col', '1-column');
   }

   ngOnInit() {
    const elm = this.elRef.nativeElement.querySelector('#stackNavMenu')
    this.renderer.removeClass(elm, 'd-block');
    this.renderer.addClass(elm, 'd-none');
   }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, '1-column');
    const elm = this.elRef.nativeElement.querySelector('#stackNavMenu')
    this.renderer.addClass(elm, 'd-block');
    this.renderer.removeClass(elm, 'd-none');
  }

}