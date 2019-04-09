import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaginationModule} from 'ngx-bootstrap';
import {TagInputModule} from 'ngx-chips';
import {SelectModule} from 'ng-select';
import {SelectOptionService} from '../../shared/element/select-option.service';
import {SharedModule} from '../../shared/shared.module';
import { AbstractProductListComponent } from './abstract-product-list/abstract-product-list.component';
import { AbstractProductHandler } from './abstract-product-handler';
import { AbstractNewProductComponent } from './abstract-new-product/abstract-new-product.component';

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
        AbstractProductListComponent,
        AbstractNewProductComponent
    ], providers: [
        SelectOptionService,
        AbstractProductHandler,

    ],
})
export class AbstractProductsModule {
}
