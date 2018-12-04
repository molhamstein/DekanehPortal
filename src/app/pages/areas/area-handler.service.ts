import {Injectable} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Observable} from 'rxjs/Observable';
import {Area} from './area';
import {Headers, RequestOptions, Response} from '@angular/http';

@Injectable()
export class AreaHandlerService {

    constructor(private apiService: ApiService) {
    }

    getAllAreas(): Observable<Area[]> {


        return this.apiService.get('/areas')
            .map(this.extractData).catch(this.handleError);

    }

    getArea(id: string): Observable<Area> {
        return this.apiService.get('/areas/' + id)
            .map(this.extractData)
            .catch(this.handleError);

    }

    updateArea(area: Area): Observable<number> {
        let cpHeaders = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: cpHeaders});
        return this.apiService.put('/areas/' + area.id, area, options)
            .map(success => success.status)
            .catch(this.handleError);
    }

    createArea(area: Area): Observable<number> {
        let body = JSON.stringify(area);
        let cpHeaders = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: cpHeaders});
        // console.log(ClientUser);
        return this.apiService.post('/areas', body, options)
            .map(success => success.status)
            .catch(this.handleError);
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
