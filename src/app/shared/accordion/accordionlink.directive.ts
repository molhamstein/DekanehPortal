import {Directive, HostBinding, Inject, Input, OnDestroy, OnInit} from '@angular/core';

import {AccordionDirective} from './accordion.directive';

@Directive({
    selector: '[appAccordionLink]'
})
export class AccordionLinkDirective implements OnInit, OnDestroy {

    @Input() public group: any;
    protected nav: AccordionDirective;

    constructor(@Inject(AccordionDirective) nav: AccordionDirective) {
        this.nav = nav;
    }

    protected _open: boolean;

    @HostBinding('class.pcoded-trigger')
    @Input()
    get open(): boolean {
        return this._open;
    }

    set open(value: boolean) {
        this._open = value;
        /*for slimscroll on and off*/
        document.querySelector('.pcoded-inner-navbar').classList.toggle('scroll-sidebar');
        if (value) {
            this.nav.closeOtherLinks(this);
        }
    }

    ngOnInit(): any {
        this.nav.addLink(this);
    }

    ngOnDestroy(): any {
        this.nav.removeGroup(this);
    }

    toggle(): any {
        /*for slimscroll on and off*/
        document.querySelector('.pcoded-inner-navbar').classList.add('scroll-sidebar');

        this.open = !this.open;
    }
}
