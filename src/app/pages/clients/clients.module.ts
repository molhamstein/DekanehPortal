import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewClientComponent} from './new-client/new-client.component';
import {ClientListComponent} from './client-list/client-list.component';
import {UtilsModule} from '../../utils/utils.module';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AgmCoreModule} from '@agm/core';
import {ClientsHandler} from './clients-handler';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {SharedModule} from '../../shared/shared.module';
import {ModalModule} from 'ngx-bootstrap/modal';

@NgModule({
    imports: [
        CommonModule,
        UtilsModule,
        TranslateModule.forChild(),
        ReactiveFormsModule,
        AgmCoreModule,
        PaginationModule,
        FormsModule,
        ModalModule,
        SharedModule
    ], providers: [
        ClientsHandler
    ],
    declarations: [NewClientComponent, ClientListComponent]
})
export class ClientsModule {
}
