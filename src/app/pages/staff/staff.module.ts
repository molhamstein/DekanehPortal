import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StaffListComponent} from './staff-list/staff-list.component';
import {UtilsModule} from '../../utils/utils.module';
import {TranslateModule} from '@ngx-translate/core';
import {StaffHandler} from './staff.handler';
import {ReactiveFormsModule} from '@angular/forms';
import { NewStaffComponent } from './new-staff/new-staff.component';
import {SelectModule} from 'ng-select';

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    SelectModule
  ],
  declarations: [
    StaffListComponent,
    NewStaffComponent,
  ],
  providers: [
    StaffHandler,

  ],
})
export class StaffModule {
}
