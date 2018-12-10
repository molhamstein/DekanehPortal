import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ToggleFullscreenDirective} from './fullscreen/toggle-fullscreen.directive';
import {AccordionAnchorDirective} from './accordion/accordionanchor.directive';
import {AccordionLinkDirective} from './accordion/accordionlink.directive';
import {AccordionDirective} from './accordion/accordion.directive';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ScrollModule} from './scroll/scroll.module';
import {MenuItems} from './menu-items/menu-items';
import {SpinnerComponent} from './spinner/spinner.component';
import {CardComponent} from './card/card.component';
import {CardRefreshDirective} from './card/card-refresh.directive';
import {CardToggleDirective} from './card/card-toggle.directive';
import {ModalAnimationComponent} from './modal-animation/modal-animation.component';
import {ModalBasicComponent} from './modal-basic/modal-basic.component';
import {DataFilterPipe} from './element/data-filter.pipe';
import {ParentRemoveDirective} from './element/parent-remove.directive';
import {SecondarySpinnerComponent} from './secondary-spinner/secondary-spinner.component';
import { ErrorHandlingComponent } from './error-handling/error-handling.component';
import {ToastyModule} from 'ng2-toasty';
import {AlertService} from '../services/alert.service';

@NgModule({
    imports: [
        CommonModule,
        ScrollModule,
        NgbModule.forRoot(),
        ToastyModule.forRoot(),
    ],
    declarations: [
        AccordionAnchorDirective,
        AccordionLinkDirective,
        AccordionDirective,
        ParentRemoveDirective,
        ToggleFullscreenDirective,
        CardRefreshDirective,
        CardToggleDirective,
        SpinnerComponent,
        CardComponent,
        ModalAnimationComponent,
        ModalBasicComponent,
        DataFilterPipe,
        SecondarySpinnerComponent,
        ErrorHandlingComponent,
    ],
    exports: [
        AccordionAnchorDirective,
        AccordionLinkDirective,
        AccordionDirective,
        ToggleFullscreenDirective,
        CardRefreshDirective,
        CardToggleDirective,
        ScrollModule,
        SecondarySpinnerComponent,
        NgbModule,
        SpinnerComponent,
        CardComponent,
        ModalAnimationComponent,
        ModalBasicComponent,
        ErrorHandlingComponent,
        DataFilterPipe
    ],
    providers: [
        MenuItems,
    ]
})
export class SharedModule {
}
