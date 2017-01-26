import { Directive, ElementRef, Input, Renderer, OnInit } from '@angular/core';

@Directive({ selector: '[appShadow]' })
export class AppShadowDirective implements OnInit {

    @Input() appShadow: string;
    @Input() appShadowX: string;
    @Input() appShadowY: string;
    @Input() appShadowBlur: string;

    constructor(private elem: ElementRef, private renderer: Renderer) { }

    ngOnInit() {
        debugger;
      let shadowStr = `${ this.appShadowX } ${ this.appShadowY } ${ this.appShadowBlur } ${ this.appShadow }`;
      this.renderer.setElementStyle(this.elem.nativeElement, 'box-shadow', shadowStr);
    }
}