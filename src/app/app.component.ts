import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet><app-spinner></app-spinner></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private translate:TranslateService){
    translate.setDefaultLang('ar');
  }
}
