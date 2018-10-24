import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {LogInComponent} from './auth/log-in/log-in.component';
import {ChartModule} from 'angular2-chartjs';
import {ManufacturersComponent} from './manufacturers/manufacturers.component';
import { AddManufacturerComponent } from './manufacturers/add-manufacturer/add-manufacturer.component';
import { ViewManufacturersComponent } from './manufacturers/view-manufacturers/view-manufacturers.component';
import {SharedModule} from '../shared/shared.module';
import {DataTableModule} from 'angular2-datatable';
import {HttpModule} from '@angular/http';
import {DataFilterPipe} from '../shared/element/data-filter.pipe';
import {StaffModule} from './staff/staff.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forChild(),
    RouterModule,
    ChartModule,
    SharedModule,
    CommonModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    StaffModule,
  ],
  exports:[
    DataFilterPipe,
  ],
  declarations: [LogInComponent, ManufacturersComponent, AddManufacturerComponent, ViewManufacturersComponent,],
})
export class PagesModule { }
