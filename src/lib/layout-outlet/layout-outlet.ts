import { Iwe7LoadingService } from './../controls/iwe7-loading.service';
import { HostBinding, Optional, SkipSelf } from '@angular/core';
import { Iwe7HeaderService } from './../controls/iwe7-header.service';
import { Iwe7FooterService } from './../controls/iwe7-footer.service';
import { Iwe7MaskService } from './../controls/iwe7-mask.service';
import { Iwe7MenuService } from './../controls/iwe7-menu.service';
import { Iwe7IcssService } from 'iwe7-icss';
import { BehaviorSubject } from 'rxjs';

import {
    Component, Input, ElementRef,
    ViewContainerRef, ViewChild, ComponentFactory
} from '@angular/core';
let layoutOutletZIndex: number = 10;
@Component({
    selector: 'layout-outlet,layout,iwe7-layout',
    templateUrl: 'layout-outlet.html',
    styleUrls: ['./layout-outlet.scss'],
    providers: [
        Iwe7MenuService,
        Iwe7MaskService,
        Iwe7HeaderService,
        Iwe7FooterService,
        Iwe7IcssService,
        Iwe7LoadingService
    ],
    exportAs: 'layoutOutlet,layout,iwe7Layout'
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

    @HostBinding('style.z-index') zIndex: number = layoutOutletZIndex;

    constructor(
        public icss: Iwe7IcssService,
        public ele: ElementRef,
        // 控制器
        public menu: Iwe7MenuService,
        public mask: Iwe7MaskService,
        public header: Iwe7HeaderService,
        public footer: Iwe7FooterService,
        public loading: Iwe7LoadingService,
        @Optional()
        @SkipSelf()
        public parent: LayoutOutletComponent
    ) {
        super({});
        this.menu.setLayout(this);
        loading.subscribe(res => {
            if (res) {
                this.next({
                    loadingDisplay: 'block',
                    loadingColor: res === true ? '#000' : res
                });
            } else {
                this.next({
                    loadingDisplay: 'none'
                });
            }
        });
        header.subscribe(res => {
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
        footer.subscribe(res => {
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
        mask.subscribe(res => {
            if (res) {
                this.next({
                    maskDisplay: 'flex',
                    maskBackground: res === true ? 'rgba(0,0,0,.5)' : res
                });
            } else {
                this.next({
                    maskDisplay: 'none'
                });
            }
        });
        this.menu.subscribe(res => {
            this.next(res);
        });
        layoutOutletZIndex += 1;
        this.zIndex = layoutOutletZIndex;
        this.icss.init(this, this.ele).subscribe();
    }

    showBackground(color: string) {
        this.mask.showBackground(color);
    }

    showHeader(): void {
        this.header.show();
    }

    showFooter(): void {
        this.footer.show();
    }

    switchHeader(): void {
        this.header.switch();
    }

    hideHeader(): void {
        this.header.hide();
    }

    hideFooter(): void {
        this.footer.hide();
    }

    switchFooter(): void {
        this.footer.switch();
    }

    hideMenu(): Iwe7MenuService {
        this.menu.hide();
        this.mask.hide();
        return this.menu;
    }

    showLoading(color: string) {
        this.loading.showColor(color ? color : true);
    }

    hideLoading() {
        this.loading.hide();
    }

    showMask() {
        this.mask.show();
    }

    hideMask() {
        this.mask.hide();
    }

    showMenu(
        position: string = 'left',
        size: number = 260,
        comp?: ComponentFactory<any>,
        data?: any
    ): Iwe7MenuService {
        this.menu.show(position, size, comp, data);
        this.mask.show();
        return this.menu;
    }
}
