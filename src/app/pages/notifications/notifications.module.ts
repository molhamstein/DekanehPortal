import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationHandlerService } from './notification-handler.service';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { PaginationModule } from 'ngx-bootstrap';
import { SelectModule } from 'ng-select';

import { AddNotificationsComponent } from './add-notifications/add-notifications.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        TranslateModule.forChild(),
        FormsModule,
        ReactiveFormsModule,
        PaginationModule,
        SelectModule
    ], providers:
        [
            NotificationHandlerService
        ],
    declarations: [
        AddNotificationsComponent
    ]
})
export class NotificationModule {
}
