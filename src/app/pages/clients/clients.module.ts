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

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    AgmCoreModule,
    PaginationModule,
    FormsModule
  ], providers: [
    ClientsHandler
  ],
  declarations: [NewClientComponent, ClientListComponent]
})
export class ClientsModule {
}
