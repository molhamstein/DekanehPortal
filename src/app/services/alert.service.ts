import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AlertService {

    showToast=new Subject<any>();
    successToast(){

    }
    errorToast(){

    }

}