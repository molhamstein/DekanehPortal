import { WarningReportComponent } from './warning-report/warning-report.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaginationModule} from 'ngx-bootstrap';
import {TagInputModule} from 'ngx-chips';
import {SelectModule} from 'ng-select';
import {SelectOptionService} from '../../shared/element/select-option.service';
import {SharedModule} from '../../shared/shared.module';
import { ReportsHandler } from './reports-handler';

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
        WarningReportComponent,
        
    ], providers: [
        SelectOptionService,
        ReportsHandler,

    ],
})
export class ReportModule {
}
