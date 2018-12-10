import {Component, EventEmitter, OnInit} from '@angular/core';
import {ToastData, ToastOptions, ToastyConfig, ToastyService} from 'ng2-toasty';
import {TranslateService} from '@ngx-translate/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {AlertService} from '../../services/alert.service';

@Component({
    selector: 'error-handling',
    templateUrl: './error-handling.component.html',
    styleUrls: ['./error-handling.component.css'],
})
export class ErrorHandlingComponent implements OnInit {
    message;
    title;

    constructor(private toastyService: ToastyService, private toastyConfig: ToastyConfig,private alert:AlertService,
                private translate: TranslateService) {

        this.toastyConfig.theme = 'default';
    }

    addToast(value) {
        if(value.type=="error"){
        this.translate.get('system.error').subscribe((text: string) => {
            this.message = text;
        });
        this.translate.get('system.title').subscribe((text: string) => {
            this.title = text;
        });
        var toastOptions: ToastOptions = {
            title: this.title,
            msg: this.message,
            showClose: true,
            timeout: 10000,
            theme: 'default',
            onAdd: (toast: ToastData) => {
            },
            onRemove: function (toast: ToastData) {
            }
        };
        this.toastyService.error(toastOptions);

        }
    }

    ngOnInit() {
        this.alert.showToast.subscribe(
            (value)=>{
                this.addToast(value);
            }
        );
    }

}
