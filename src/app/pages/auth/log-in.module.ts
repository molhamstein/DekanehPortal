import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {LogInComponent} from './log-in/log-in.component';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forChild(),
  ],
  declarations: [LogInComponent,],
})
export class LogInModule {

}
