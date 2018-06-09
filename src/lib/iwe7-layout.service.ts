import { ComponentRef, EmbeddedViewRef } from '@angular/core';
import { TemplateRef, ComponentFactoryResolver } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Injectable, ViewContainerRef, Type } from '@angular/core';

@Injectable()
export class Iwe7LayoutService {
    _showHeader: boolean = false;
    _showFooter: boolean = false;
    _showMenu: boolean = false;
    _showMask: boolean = false;

    showHeader$: BehaviorSubject<boolean> = new BehaviorSubject(this._showHeader);
    showFooter$: BehaviorSubject<boolean> = new BehaviorSubject(this._showFooter);
    showMenu$: BehaviorSubject<boolean> = new BehaviorSubject(this._showMenu);
    showMask$: BehaviorSubject<boolean> = new BehaviorSubject(this._showMask);

    menuView: ViewContainerRef;
    menuView$: BehaviorSubject<ViewContainerRef> = new BehaviorSubject(this.menuView);

    constructor(
        public factory: ComponentFactoryResolver
    ) { }

    attachMenuComponent(comp: Type<any>, ...args: any[]): ComponentRef<any> {
        const factory = this.factory.resolveComponentFactory(comp);
        return this.menuView.createComponent(factory, ...args);
    }

    attachMenuTemplate(tpl: TemplateRef<any>, ...args: any[]): EmbeddedViewRef<any> {
        return this.menuView.createEmbeddedView(tpl, ...args);
    }

    showHeader() {
        this.showHeader$.next(true);
        this._showHeader = true;
    }

    showFooter() {
        this._showFooter = true;
        this.changeFooter();
    }
    

    showMask() {
        this._showMask = true;
        this.changeMask();
    }

    hideMask() {
        this._showMask = false;
        this.changeMask();
    }

    hideHeader() {
        this._showHeader = false;
        this.changeHeader();
    }

    hideFooter() {
        this._showFooter = false;
        this.changeFooter();
    }

    switchHeader() {
        this._showHeader = !this._showHeader;
        this.changeHeader();
    }

    switchFooter() {
        this._showFooter = !this._showFooter;
        this.changeFooter();
    }

    switchMask() {
        this._showMask = !this._showMask;
        this.changeMask();
    }

    private changeHeader() {
        this.showHeader$.next(this._showHeader);
    }

    private changeFooter() {
        this.showFooter$.next(this._showFooter);
    }

    private changeMask() {
        this.showMask$.next(this._showMask);
    }
}
