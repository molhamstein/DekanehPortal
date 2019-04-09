import { DamagedProductListComponent } from './damaged-product-list/damaged-product-list.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaginationModule} from 'ngx-bootstrap';
import {TagInputModule} from 'ngx-chips';
import {SelectModule} from 'ng-select';
import {SelectOptionService} from '../../shared/element/select-option.service';
import {SharedModule} from '../../shared/shared.module';
import { DamagedProductHandler } from './damaged-products-handler';
import { NewDamagedProductComponent } from './new-damaged-product/new-damaged-product.component';

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
        DamagedProductListComponent,
        NewDamagedProductComponent
    ], providers: [
        SelectOptionService,
        DamagedProductHandler,

    ],
})
export class DamagedProductModule {
}
