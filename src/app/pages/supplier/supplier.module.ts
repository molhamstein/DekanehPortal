import { ListSuppliersComponent } from './list-suppliers/list-suppliers.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UtilsModule} from '../../utils/utils.module';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaginationModule} from 'ngx-bootstrap';
import { SupplierHandlerService } from './supplier-handler.service';
import { NewSupplierComponent } from './new-supplier/new-supplier.component';


@NgModule({
    imports: [
        CommonModule,
        UtilsModule,
        TranslateModule.forChild(),
        ReactiveFormsModule,
        FormsModule,
        PaginationModule,
        FormsModule,
        ReactiveFormsModule
    ], providers: [
        SupplierHandlerService
    ],
    declarations: [ListSuppliersComponent,NewSupplierComponent]
})
export class SupplierModule {
}
