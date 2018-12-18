import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class NotificationsService {

    constructor(private api: ApiService) {
    }

    getAllNotiCount(): Observable<number> {
        return this.api.get('/notifications/count')
            .map(this.extractData).catch(this.handleError);
    }

    getNewNotiCount(): Observable<number> {
        let param = new URLSearchParams();
        param.append('where', '{"isSeen":"false"}');
        return this.api.get('/notifications/count', param)
            .map(this.extractData).catch(this.handleError);
    }

    getNewNoti(): Observable<any[]> {
        let param = new URLSearchParams();
        param.append('filter', '{"order": "createdAt DESC","limit":100}');
        return this.api.get('/notifications', param)
            .map(this.extractData).catch(this.handleError);
    }

    makeSeeAll() {
        return this.api.put('/notifications/makeAllRead', []).map(this.extractData).catch(this.handleError);
    }

    private extractData(response: Response) {
        let body = response.json();
        return body;
    }

    private handleError(error: Response | any) {
        return Observable.throw(error.status);
    }
}
