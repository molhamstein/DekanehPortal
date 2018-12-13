import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    template: '<error-handling></error-handling><router-outlet (activate)="selfGuard()"><app-spinner></app-spinner></router-outlet>',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';

    constructor(private translate: TranslateService, private router: Router) {
        translate.setDefaultLang('ar');
    }

    selfGuard() {
        let route = this.router.url;
        if (!localStorage.getItem('token') && route != 'auth/login') {
            this.router.navigate(['auth/login']);
        }
        if (localStorage.getItem('token') && route == 'auth/login') {
            this.router.navigate(['']);

        }
    }
}
