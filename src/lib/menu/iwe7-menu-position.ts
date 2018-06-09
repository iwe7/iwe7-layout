import { Injectable } from '@angular/core';

export interface LayoutMenuInterface {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    width?: string;
    height?: string;
}

export const LayoutMenuDefault: LayoutMenuInterface = {
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    width: '0px',
    height: '0px'
};

@Injectable({
    providedIn: 'root'
})
export class Iwe7MenuPositionService {
    _menuPosition: { [key: string]: LayoutMenuInterface } = {
        top: {
            ...LayoutMenuDefault,
            ...{
                top: '0px',
                left: '0px',
                right: '0px',
            }
        },
        left: {
            ...LayoutMenuDefault,
            ...{
                top: '0px',
                left: '0px',
                bottom: '0px'
            }
        },
        right: {
            ...LayoutMenuDefault,
            ...{
                top: '0px',
                right: '0px',
                bottom: '0px'
            }
        },
        bottom: {
            ...LayoutMenuDefault,
            ...{
                left: '0px',
                right: '0px',
                bottom: '0px'
            }
        }
    };
    constructor() { }
}
