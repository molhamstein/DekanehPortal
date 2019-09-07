import { TransfereService } from './services/transfere.service';
// import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {AppRoutes} from './app.routing';
import {AppComponent} from './app.component';
import {ClickOutsideModule} from 'ng-click-outside';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthComponent} from './layout/auth/auth.component';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {Http, HttpModule} from '@angular/http';
import {AuthGuardService} from './services/auth-guard.service';
import {ApiService} from './services/api.service';
import {ConstService} from './services/const.service';
import {UtilsModule} from './utils/utils.module';
import {AdminModule} from './layout/admin/admin.module';
import {PagesModule} from './pages/pages.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AgmCoreModule} from '@agm/core';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {BrowserModule} from '@angular/platform-browser';
import {SelectModule} from 'ng-select';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {TooltipModule} from 'ngx-bootstrap';
import {AlertService} from './services/alert.service';

// import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';


export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        // ManufacturersComponent,
        // DashboardComponent,
        // BreadcrumbsComponent,
        // FormsModule,
        // AdminComponent,
        // TitleComponent,

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(AppRoutes),
        ReactiveFormsModule,
        FormsModule,
        ClickOutsideModule,
        SharedModule,
        HttpModule,
        UtilsModule,
        TooltipModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        }),
        AdminModule,
        SelectModule,
        PagesModule,
        PaginationModule.forRoot(),
        // BsDatepickerModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyArvKKYtpC6C6khvDPT_HAWG5hXMiKwakk'
        }),
    ],
    providers: [
        TranslateService,
        // AuthGuardService,
        ApiService,
        TransfereService,
        AlertService,
        ConstService,
        {provide: LocationStrategy, useClass: HashLocationStrategy}

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
