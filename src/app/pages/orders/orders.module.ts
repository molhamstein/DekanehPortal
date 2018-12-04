import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrdersManageComponent} from './orders-manage/orders-manage.component';
import {OrdersHandlerService} from './orders-handler.service';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {SelectModule} from 'ng-select';
import {PaginationModule} from 'ngx-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        PaginationModule,
        SharedModule,
        SelectModule

    ], providers: [
        OrdersHandlerService
    ],
    declarations: [
        OrdersManageComponent]
})
export class OrdersModule {
}
