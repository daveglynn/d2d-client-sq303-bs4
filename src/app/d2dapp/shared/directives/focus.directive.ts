import {Directive,ElementRef,Renderer} from '@angular/core';
import {ConstantsService} from   '../../shared/helpers/constants.service';
 
@Directive({
    selector: '[focus]',
     host: {
         '(focus)': 'onFocus()',
         '(blur)': 'onBlur()'
    }
})
export class FocusDirective {

    constructor(private cs:  ConstantsService,private el: ElementRef,private renderer: Renderer) { }

    onFocus() {
        if (this.el.nativeElement.disabled === false) {
            this.renderer.setElementStyle(this.el.nativeElement, "background-color", this.cs.onFocusInputBackColor);
        }
    }

    onBlur() {
        if (this.el.nativeElement.disabled === false) {
            this.renderer.setElementStyle(this.el.nativeElement, "background-color", this.cs.defaultInputBackColor);
        }
    }
}
 