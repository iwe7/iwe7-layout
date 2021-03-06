import { MenuEmptyComponent } from './../menu/menu-empty/menu-empty';
import { Iwe7MaskService } from './iwe7-mask.service';
import { Observable } from 'rxjs';
import { Injector, ComponentFactoryResolver, OnDestroy, ComponentRef } from '@angular/core';
import { ViewContainerRef, ComponentFactory } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Iwe7MenuPositionService } from './iwe7-menu-position';
import { Injectable } from '@angular/core';
import { CustomInjector, CUSTOM_DATA, CUSTOM_CLOSE, CUSTOM_CONTROL } from 'iwe7-core';

@Injectable()
export class Iwe7MenuService extends BehaviorSubject<any> implements OnDestroy {
    private _position: string = 'left';
    _show: boolean = false;
    beforeOpen: Subject<any> = new Subject();
    afterClose: Subject<any> = new Subject();
    view: ViewContainerRef;
    layout: any;
    componentRef: ComponentRef<any>;
    constructor(
        public iwe7Position: Iwe7MenuPositionService,
        public injector: Injector,
        public resover: ComponentFactoryResolver,
        public mask: Iwe7MaskService
    ) {
        super(false);
    }

    setView(view: ViewContainerRef) {
        this.view = view;
    }

    setLayout(layout: any) {
        this.layout = layout;
    }

    show<T>(position: string = 'left', size: number | string = 260, comp?: ComponentFactory<T>, data?: any): Observable<any> {
        const positionObj = this.iwe7Position._menuPosition[position];
        let extObj = {};
        this._show = true;
        if (position === 'left' || position === 'right') {
            extObj = {
                width: typeof size === 'number' ? size + 'px' : size,
                height: '100%',
                transition: 'width'
            };
        } else {
            extObj = {
                height: typeof size === 'number' ? size + 'px' : size,
                width: '100%',
                transition: 'height'
            };
        }
        this._position = position;
        this.next({
            ...positionObj,
            ...extObj
        });
        const fn = (...args: any[]) => {
            this.hide(...args);
        };
        const custom = new WeakMap<any, any>([
            [CUSTOM_DATA, data],
            [CUSTOM_CLOSE, fn],
            [CUSTOM_CONTROL, this.layout]
        ]);
        const injector = new CustomInjector(this.injector, custom);
        this.view.clear();
        if (!comp) {
            comp = this.resover.resolveComponentFactory<T>(MenuEmptyComponent as any);
        }
        this.componentRef = this.view.createComponent(comp, null, injector);
        return this.afterClose;
    }

    hide(data?: any) {
        this._show = false;
        if (this._position === 'left' || this._position === 'right') {
            this.next({
                width: '0px',
            });
        } else {
            this.next({
                height: '0px',
            });
        }
        this.afterClose.next(data);
        this.view && this.view.clear();
        if (this.componentRef) {
            this.componentRef.destroy();
        }
        this.mask.hide();
    }

    switchMenu() {
        if (this._show) {
            this.hide();
        }
    }

    ngOnDestroy() {
        this._show = false;
        this.complete();
    }
}
