import {Directive, ElementRef , Input, Renderer } from '@angular/core';

@Directive({ 
   selector: '[disableCond]'
})
export class DisableDirective  {
     
     constructor(public el: ElementRef, public renderer: Renderer) {
        debugger;
       //el.nativeElement.disabled = this.InputDisabled;
       //el.nativeElement.style.color = 'red';
       //el.nativeElement.style.backgroundColor = '#5789D8';
       //el.nativeElement.style.color = '#FFFFFF';
    }

    @Input() set disableCond(condition: boolean) {
        debugger;
    if (condition) {
      this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none');
    } else {
      this.renderer.setElementStyle(this.el.nativeElement, 'display', 'block');
    }
    
  }
}
 

 