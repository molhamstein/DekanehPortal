import { SupplierOrdersListComponent } from './supplier-order-list/supplier-order-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { SelectModule } from 'ng-select';
import { PaginationModule, TooltipModule } from 'ngx-bootstrap';
import { SupplierOrdersHandlerService } from './supplier-order-handler.service';
import { NewSupplierOrderComponent } from './new-supplier-order/new-supplier-order.component';
import { ReportSupplierOrderComponent } from './supplier-order-report/supplier-order-report.component';

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
        SupplierOrdersHandlerService,
    ],
    declarations: [
        NewSupplierOrderComponent,
        SupplierOrdersListComponent,
        ReportSupplierOrderComponent
        ]
})
export class SupplierOrdersModule {
}
