import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
    selector: 'app-root',
    template: '<error-handling></error-handling><router-outlet><app-spinner></app-spinner></router-outlet>',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
    constructor(private translate: TranslateService, private router: Router) {
        translate.setDefaultLang('ar');
    }

}
