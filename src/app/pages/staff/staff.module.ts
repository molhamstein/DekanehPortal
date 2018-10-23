import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StaffListComponent} from './staff-list/staff-list.component';
import {UtilsModule} from '../../utils/utils.module';
import {TranslateModule} from '@ngx-translate/core';
import {StaffService} from './staff.service';

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    TranslateModule.forChild()
  ],
  declarations: [
    StaffListComponent
  ],
  providers: [
    StaffService
  ],
})
export class StaffModule {
}
