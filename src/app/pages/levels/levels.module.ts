import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaginationModule} from 'ngx-bootstrap';
import {SelectModule} from 'ng-select';
import {SharedModule} from '../../shared/shared.module';
import { LevelHandlerService } from './level-handler.service';
import { NewLevelComponent } from './new-level/new-level.component';
import { ListLevelsComponent } from './list-levels/list-levels.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        TranslateModule.forChild(),
        ReactiveFormsModule,
        PaginationModule,
        FormsModule,
        SelectModule

    ], providers: [
        LevelHandlerService
    ],
    declarations: [NewLevelComponent,ListLevelsComponent]
})
export class LevelsModule {
}
