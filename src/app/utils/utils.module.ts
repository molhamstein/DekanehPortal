import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyTableComponent} from './my-table/my-table.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableViewComponent} from './table-view/table-view.component';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FieldService} from './field.service';
import {MainService} from './main.service';
import {RemoveSpacesPipe} from './remove-spaces.pipe';
import {GeneralInputComponent} from './general-input/general-input.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgbModule.forRoot(),
        TranslateModule,
    ],

    exports: [MyTableComponent, TableViewComponent, RemoveSpacesPipe, GeneralInputComponent],
    providers: [FieldService, MainService,],
    declarations: [MyTableComponent, TableViewComponent, TableViewComponent, RemoveSpacesPipe, GeneralInputComponent,]
})
export class UtilsModule {
    // constructor(public translate:TranslateService,private constants:ConstantsService) {
    //   constants.checkLang();
    //   this.translate.use(localStorage.getItem("lang"));
    // }
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: UtilsModule,
            providers: [],
        };
    }
}

