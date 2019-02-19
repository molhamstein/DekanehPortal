import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs/Observable';
import { Area } from '../areas/area';
import { Notification } from './notification';
import { Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class NotificationHandlerService {

    constructor(private api: ApiService) {

    }


    searchByUserName(string: String) {
        var filter = { "where": { "fireBaseToken": { "neq": null }, "ownerName": { "like": string, "options": "i" } } }
        return this.api.get('/users?filter=' + JSON.stringify(filter))
            .map(this.extractData).catch(this.handleError);

    }
    sendNot(notification) {
        let body = JSON.stringify(notification);
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.api.post('/users/sendCustomNotification', body, options)
            .map(success => success.status)
            .catch(this.handleError);
    }

    getAllAreas(): Observable<Area[]> {


        return this.api.get('/areas')
            .map(this.extractData).catch(this.handleError);

    }

    private extractData(response: Response) {
        let body = response.json();
        return body;
    }

    private handleError(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.status);
    }
}
