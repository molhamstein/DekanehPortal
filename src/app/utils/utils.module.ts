import {ModuleWithProviders, NgModule} from "@angular/core";
import { CommonModule } from "@angular/common";
import { MyTableComponent } from "./my-table/my-table.component";
import { MyFormComponent } from "./my-form/my-form.component";
import {FormsModule,ReactiveFormsModule } from "@angular/forms";
import { ErrorMessageComponent } from "./error-message/error-message.component";
import { TableViewComponent } from "./table-view/table-view.component";
import {RouterModule} from "@angular/router";
import { FormViewComponent } from "./form-view/form-view.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FieldService} from "./field.service";
import {MySelectComponent} from "./my-select/my-select.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {MainService} from "./main.service";
import {SelectWithDataComponent} from "./select-with-data/select-with-data.component";
import {ThemeModule} from "../../../../workflow/src/app/@theme/theme.module";
import {MyCheckboxComponent} from "./my-checkbox/my-checkbox.component";
import {MyProgressComponent} from "./my-progress/my-progress.component";
import {mySelectService} from "./my-select/mySelect.service";
import { FileInputComponent } from '../../../../workflow/src/app/file-input/file-input.component';
import { DatePickerComponentComponent } from './date-picker-component/date-picker-component.component';
import { DateTimePickerComponentComponent } from './date-time-picker-component/date-time-picker-component.component';
import { RemoveSpacesPipe } from './remove-spaces.pipe';
import { TwoCheckboxComponent } from '../../../../workflow/src/app/two-checkbox/two-checkbox.component';
import { GeneralInputComponent } from './general-input/general-input.component';
import { CardSerchResultComponent } from './card-serch-result/card-serch-result.component';
import { CardComponent } from './card/card.component';
import { CardEditComponent } from './card-edit/card-edit.component';
import { Ng2SmartTableModule } from "ng2-smart-table";
import { RemoveHtmlPipe } from "../../../../workflow/src/app/remove-html.pipe";
import { PrivilegeService } from "../../../../workflow/src/app/services/privilege/privilege.service";
import { TranslateService, TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    NgSelectModule,Ng2SmartTableModule,
    TranslateModule,
  ],

  exports: [CardSerchResultComponent,CardComponent ,MyTableComponent,MyFormComponent,TableViewComponent,FormViewComponent,DatePickerComponentComponent,MySelectComponent,MyProgressComponent,FileInputComponent,DateTimePickerComponentComponent,RemoveSpacesPipe,TwoCheckboxComponent,GeneralInputComponent,ErrorMessageComponent,RemoveHtmlPipe],
  providers:[FieldService,MainService,],
  declarations: [ErrorMessageComponent, MyTableComponent, MyFormComponent, TableViewComponent, CardSerchResultComponent, CardComponent, CardEditComponent, TableViewComponent, FormViewComponent, MySelectComponent,SelectWithDataComponent,MyCheckboxComponent,MyProgressComponent, FileInputComponent, DatePickerComponentComponent, DateTimePickerComponentComponent, RemoveSpacesPipe, TwoCheckboxComponent, GeneralInputComponent,RemoveHtmlPipe ]
})
export class UtilsModule {
  // constructor(public translate:TranslateService,private constants:ConstantsService) {
  //   constants.checkLang();
  //   this.translate.use(localStorage.getItem("lang"));
  // }
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: UtilsModule,
      providers: [mySelectService],
    };
  }
}

