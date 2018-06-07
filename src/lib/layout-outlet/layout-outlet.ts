import { BetterScrollDirective } from './../../../../iwe7-better-scroll/src/lib/better-scroll';
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
    scroll: BetterScrollDirective;
    @Output() pullingDown: EventEmitter<any> = new EventEmitter();
    @Output() pullUpLoad: EventEmitter<any> = new EventEmitter();
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

    betterScroll(e: BetterScrollDirective) {
        this.scroll = e;
        this.scroll.pullingDown().subscribe((res: any) => {
            setTimeout(() => {
                res.finishPullDown();
            }, 2000);
            this.pullingDown.emit(res);
        });

        this.scroll.pullUpLoad().subscribe((res: any) => {
            setTimeout(() => {
                res.finishPullUp();
            }, 2000);
            this.pullUpLoad.emit(res);
        });
    }
}
