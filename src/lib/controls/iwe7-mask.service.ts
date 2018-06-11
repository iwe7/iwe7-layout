import { Injectable } from '@angular/core';
import { CoreShowHide } from 'iwe7-core';
@Injectable()
export class Iwe7MaskService extends CoreShowHide {
    constructor() {
        super();
    }

    showBackground(color: any) {
        this.next(color);
    }
}
