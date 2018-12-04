import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RatesListComponent} from './rates-list/rates-list.component';
import {RateHandlerService} from './rate-handler.service';
import {SharedModule} from '../../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {PaginationModule} from 'ngx-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        TranslateModule.forChild(),
        PaginationModule
    ], providers:
        [
            RateHandlerService
        ],
    declarations: [
        RatesListComponent
    ]
})
export class RatingsModule {
}
