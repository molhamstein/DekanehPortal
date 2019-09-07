import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { UserModel } from '../user-model';
import { ClientsHandler } from '../clients/clients-handler';
import { stat } from 'fs';
import { Complain } from './complain';

@Injectable()
export class ComplainHandlerService {

    constructor(private apiService: ApiService) {


    }

    getComplain(perPage: number, currentPage: number): Observable<Complain[]> {
        let param = new URLSearchParams();
        var filter =  { "include": ["user","product"], order: "createdAt DESC", limit: + perPage, skip: (currentPage - 1) * perPage }

        let rolesString = '';
        param.append('filter', JSON.stringify(filter));
        return this.apiService.get('/claims', param)
            .map(this.extractData).catch(this.handleError);

    }

    getComplainCount(): Observable<number> {
        let param = new URLSearchParams();

        return this.apiService.get('/claims/count', param)
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
