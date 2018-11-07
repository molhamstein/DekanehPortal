import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewProductComponent} from './new-product/new-product.component';
import {ProductHandler} from './product-handler';
import {ProductListComponent} from './product-list/product-list.component';
import {UtilsModule} from '../../utils/utils.module';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaginationModule} from 'ngx-bootstrap';
import {TagInputModule} from 'ngx-chips';

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    PaginationModule,
    FormsModule,
    TagInputModule
  ],
  declarations: [
    NewProductComponent,
    ProductListComponent
  ], providers: [

    ProductHandler,

  ],
})
export class ProductsModule {
}
