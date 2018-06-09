import { Iwe7LayoutService } from './../iwe7-layout.service';
import { MenuEmptyComponent } from './menu-empty/menu-empty';
import { Observable } from 'rxjs';
import { Injector, ComponentFactoryResolver } from '@angular/core';
import { ViewContainerRef, ComponentFactory } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Iwe7MenuPositionService } from './iwe7-menu-position';
import { Injectable } from '@angular/core';
import { LayoutMenuInterface, LayoutMenuDefault } from './iwe7-menu-position';
import { CustomInjector, CUSTOM_DATA, CUSTOM_CLOSE } from 'iwe7-core';

@Injectable()
export class Iwe7MenuService {
    // position left top left right
    // size 260
    position: string = 'left';
    menuPosition$: BehaviorSubject<LayoutMenuInterface> = new BehaviorSubject(LayoutMenuDefault);
    _showMenu: boolean = false;

    beforeOpen: Subject<any> = new Subject();
    // 关闭
    afterClose: Subject<any> = new Subject();

    menuView: ViewContainerRef;

    constructor(
        public iwe7MenuPosition: Iwe7MenuPositionService,
        public injector: Injector,
        public resover: ComponentFactoryResolver,
        public layout: Iwe7LayoutService
    ) { }

    setView(view: ViewContainerRef) {
        this.menuView = view;
    }

    show<T>(position: string = 'left', size: number = 260, comp?: ComponentFactory<T>, data?: any): Observable<any> {
        const positionObj = this.iwe7MenuPosition._menuPosition[position];
        let extObj = {};
        if (position === 'left' || position === 'right') {
            extObj = {
                width: size + 'px',
                height: '100%',
                transition: 'width'
            };
        } else {
            extObj = {
                height: size + 'px',
                width: '100%',
                transition: 'height'
            };
        }
        this.position = position;
        const outlet = {
            ...positionObj,
            ...extObj
        };
        this.menuPosition$.next(outlet);
        const fn = (...args: any[]) => {
            this.hide(...args);
        };
        const custom = new WeakMap<any, any>([
            [CUSTOM_DATA, data],
            [CUSTOM_CLOSE, fn]
        ]);
        const injector = new CustomInjector(this.injector, custom);
        this.menuView.clear();
        if (!comp) {
            comp = this.resover.resolveComponentFactory<T>(MenuEmptyComponent as any);
        }
        this.menuView.createComponent(comp, null, injector);
        return this.afterClose;
    }

    hide(data?: any) {
        this._showMenu = false;
        if (this.position === 'left' || this.position === 'right') {
            this.menuPosition$.next({
                width: '0px',
            });
        } else {
            this.menuPosition$.next({
                height: '0px',
            });
        }
        this.afterClose.next(data);
        this.menuView && this.menuView.clear();
        this.layout.hideMask();
    }

    switchMenu() {
        if (this._showMenu) {
            this.hide();
        }
    }
}

