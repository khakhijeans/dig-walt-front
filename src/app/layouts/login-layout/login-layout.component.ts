import { Component, OnDestroy, Renderer2, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.scss']
})
export class LoginLayoutComponent implements OnDestroy, OnInit {

  constructor(private renderer: Renderer2, private elRef: ElementRef) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}