import { Injectable } from '@angular/core';
import { CoreShowHide } from 'iwe7-core';
@Injectable()
export class Iwe7LoadingService extends CoreShowHide {
    constructor() {
        super();
    }

    showColor(color: any) {
        this.next(color);
    }
}
