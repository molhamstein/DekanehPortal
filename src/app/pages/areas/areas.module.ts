import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewAreaComponent} from './new-area/new-area.component';
import {ListAreasComponent} from './list-areas/list-areas.component';
import {UtilsModule} from '../../utils/utils.module';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AreaHandlerService} from './area-handler.service';
import {PaginationModule} from 'ngx-bootstrap';


@NgModule({
    imports: [
        CommonModule,
        UtilsModule,
        TranslateModule.forChild(),
        ReactiveFormsModule,
        FormsModule,
        PaginationModule,
        FormsModule,
        ReactiveFormsModule
    ], providers: [
        AreaHandlerService
    ],
    declarations: [ListAreasComponent, NewAreaComponent]
})
export class AreasModule {
}
