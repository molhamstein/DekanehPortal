import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewSlideComponent } from './new-slide/new-slide.component';
import { SlideListingComponent } from './slide-listing/slide-listing.component';
import {SharedModule} from '../../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SelectModule} from 'ng-select';
import {SlideHandlerService} from './slide-handler.service';
import {ProductHandler} from '../products/product-handler';
import {TooltipModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    FormsModule,
    SelectModule,
    TooltipModule
  ],
  providers: [
    SlideHandlerService,
    ProductHandler
  ],
  declarations: [NewSlideComponent, SlideListingComponent]
})
export class TopSliderModule { }
