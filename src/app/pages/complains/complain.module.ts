import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaginationModule} from 'ngx-bootstrap';
import {SelectModule} from 'ng-select';
import {SharedModule} from '../../shared/shared.module';
import { ComplainHandlerService } from './complain-handler.service';
import { ListComplainComponent } from './list-complains/list-complains.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        TranslateModule.forChild(),
        ReactiveFormsModule,
        PaginationModule,
        FormsModule,
        SelectModule

    ], providers: [
        ComplainHandlerService
    ],
    declarations: [ListComplainComponent]
})
export class ComplainsModule {
}
