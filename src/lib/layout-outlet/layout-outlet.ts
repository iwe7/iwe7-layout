import { Iwe7MenuService } from './../menu/iwe7-menu.service';
import { Iwe7LayoutService } from './../iwe7-layout.service';
import { Iwe7IcssService } from 'iwe7-icss';
import { BehaviorSubject } from 'rxjs';
import { Component, Input, ElementRef, ViewContainerRef, ViewChild, ComponentFactory } from '@angular/core';

@Component({
    selector: 'layout-outlet',
    templateUrl: 'layout-outlet.html',
    styleUrls: ['./layout-outlet.scss'],
    providers: [Iwe7LayoutService, Iwe7MenuService],
    exportAs: 'layoutOutlet'
})
export class LayoutOutletComponent extends BehaviorSubject<any> {
    _headerHeight: string = '45px';
    @Input()
    set headerHeight(val: string) {
        if (val) {
            this.next({
                headerHeight: val
            });
            this._headerHeight = val;
        }
    }
    _footerHeight: string = '45px';
    @Input()
    set footerHeight(val: string) {
        if (val) {
            this.next({
                footerHeight: val
            });
            this._footerHeight = val;
        }
    }

    _menuWidth: string = '260px';
    @Input()
    set menuWidth(val: string) {
        if (val) {
            this.next({
                menuWidth: val
            });
            this._menuWidth = val;
        }
    }

    @ViewChild('menuView', { read: ViewContainerRef })
    set menuView(val: ViewContainerRef) {
        this.menu.setView(val);
    }

    get menuView$() {
        return this.layout.menuView$;
    }

    constructor(
        public icss: Iwe7IcssService,
        public ele: ElementRef,
        public layout: Iwe7LayoutService,
        public menu: Iwe7MenuService
    ) {
        super({});
        layout.showHeader$.subscribe(res => {
            if (res) {
                this.next({
                    headerHeight: this._headerHeight
                });
            } else {
                this.next({
                    headerHeight: '0px'
                });
            }
        });
        this.layout.showFooter$.subscribe(res => {
            if (res) {
                this.next({
                    footerHeight: this._footerHeight
                });
            } else {
                this.next({
                    footerHeight: '0px'
                });
            }
        });
        this.layout.showMenu$.subscribe(res => {
            if (res) {
                this.next({
                    menuWidth: this._menuWidth
                });
            } else {
                this.next({
                    menuWidth: '0px'
                });
            }
        });
        this.layout.showMask$.subscribe(res => {
            if (res) {
                this.next({
                    maskDisplay: 'block'
                });
            } else {
                this.next({
                    maskDisplay: 'none'
                });
            }
        });
        this.menu.menuPosition$.subscribe(res => {
            this.next(res);
        });
        this.icss.init(this, this.ele).subscribe();
    }

    showHeader(): Iwe7LayoutService {
        this.layout.showHeader();
        return this.layout;
    }

    showFooter(): Iwe7LayoutService {
        this.layout.showFooter();
        return this.layout;
    }

    switchHeader(): Iwe7LayoutService {
        this.layout.switchHeader();
        return this.layout;
    }

    hideHeader(): Iwe7LayoutService {
        this.layout.hideHeader();
        return this.layout;
    }

    hideFooter(): Iwe7LayoutService {
        this.layout.hideFooter();
        return this.layout;
    }

    switchFooter(): Iwe7LayoutService {
        this.layout.switchFooter();
        return this.layout;
    }

    hideMenu(): Iwe7MenuService {
        this.menu.hide();
        this.layout.hideMask();
        return this.menu;
    }

    showMenu(position: string = 'left', size: number = 260, comp?: ComponentFactory<any>, data?: any, ): Iwe7MenuService {
        this.menu.show(position, size, comp, data);
        this.layout.showMask();
        return this.menu;
    }
}
