import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrdersManageComponent} from './orders-manage/orders-manage.component';
import {OrdersHandlerService} from './orders-handler.service';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {SelectModule} from 'ng-select';
import {PaginationModule, TooltipModule} from 'ngx-bootstrap';
import { StatisticsComponent } from './statistics/statistics.component';
import {OrdersFromSuppliersComponent} from './orders-from-suppliers/orders-from-suppliers.component';
import {SuppliersService} from './orders-from-suppliers/suppliers.service';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule.forChild(),
        ReactiveFormsModule,
        FormsModule,
        PaginationModule,
        SharedModule,
        TooltipModule,
        SelectModule

    ], providers: [
    OrdersHandlerService,
    SuppliersService

  ],
    declarations: [
        OrdersManageComponent,
      StatisticsComponent,
      OrdersFromSuppliersComponent]
})
export class OrdersModule {
}
