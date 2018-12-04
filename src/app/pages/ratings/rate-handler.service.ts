import {Injectable} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Observable} from 'rxjs/Observable';
import {Response, URLSearchParams} from '@angular/http';
import {Area} from '../areas/area';

@Injectable()
export class RateHandlerService {

    constructor(private api: ApiService) {

    }

    getAllRatings(): Observable<any[]> {
        let param = new URLSearchParams();
        param.append('filter', '{"include":"user"}');
        return this.api.get('/ratings', param).map(this.extractData).catch(this.handleError);
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
