import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewProductComponent} from './new-product/new-product.component';
import {ProductHandler} from './product-handler';
import {ProductListComponent} from './product-list/product-list.component';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaginationModule} from 'ngx-bootstrap';
import {TagInputModule} from 'ngx-chips';
import {SelectModule} from 'ng-select';
import {SelectOptionService} from '../../shared/element/select-option.service';
import {SharedModule} from '../../shared/shared.module';

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
        NewProductComponent,
        ProductListComponent
    ], providers: [
        SelectOptionService,
        ProductHandler,

    ],
})
export class ProductsModule {
}
