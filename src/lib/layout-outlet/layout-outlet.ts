import { BetterScrollDirective } from 'iwe7-better-scroll';
import { Iwe7IcssService } from 'iwe7-icss';
import { BehaviorSubject } from 'rxjs';
import { Component, Input, Output, ElementRef, EventEmitter } from '@angular/core';

@Component({
    selector: 'layout-outlet',
    templateUrl: 'layout-outlet.html',
    styleUrls: ['./layout-outlet.scss']
})
export class LayoutOutletComponent extends BehaviorSubject<any> {
    @Input()
    set headerHeight(val: string) {
        this.next({
            headerHeight: val
        });
    }
    @Input()
    set footerHeight(val: string) {
        this.next({
            footerHeight: val
        });
    }
    constructor(
        public icss: Iwe7IcssService,
        public ele: ElementRef
    ) {
        super({
            headerHeight: '45px',
            footerHeight: '45px'
        });
        this.icss.init(this, this.ele).subscribe();
    }
}
