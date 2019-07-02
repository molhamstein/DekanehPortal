import { AwardListComponent } from './award-list/award-list.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaginationModule} from 'ngx-bootstrap';
import {TagInputModule} from 'ngx-chips';
import {SelectModule} from 'ng-select';
import {SelectOptionService} from '../../shared/element/select-option.service';
import {SharedModule} from '../../shared/shared.module';
import { AwardHandler } from './award-handler';
import { NewAwardComponent } from './new-award/new-award.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        TranslateModule.forChild(),
        ReactiveFormsModule,
        PaginationModule,
        FormsModule,
        TagInputModule,
        SelectModule

    ],
    declarations: [
        AwardListComponent,
        NewAwardComponent
    ], providers: [
        SelectOptionService,
        AwardHandler,

    ],
})
export class AwardModule {
}
