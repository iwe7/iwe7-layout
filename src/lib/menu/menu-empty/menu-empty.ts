import { Component, Injector } from '@angular/core';
import { CustomComponent } from 'iwe7-core';
@Component({
    selector: 'menu-empty',
    templateUrl: './menu-empty.html',
    styleUrls: ['./menu-empty.scss']
})
export class MenuEmptyComponent extends CustomComponent<any> {
    constructor(injector: Injector) {
        super(injector);
    }
    _click() {
        this._customRefClose();
    }
}
