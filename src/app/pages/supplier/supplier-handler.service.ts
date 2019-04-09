import {Injectable} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Observable} from 'rxjs/Observable';
import {Headers, RequestOptions, Response} from '@angular/http';
import { Supplier } from './supplier';

@Injectable()
export class SupplierHandlerService {

    constructor(private apiService: ApiService) {
    }

    getAllSuppliers(): Observable<Supplier[]> {


        return this.apiService.get('/suppliers')
            .map(this.extractData).catch(this.handleError);

    }

    getSupplier(id: string): Observable<Supplier> {
        return this.apiService.get('/suppliers/' + id)
            .map(this.extractData)
            .catch(this.handleError);

    }

    updateSupplier(supplier: Supplier): Observable<number> {
        let cpHeaders = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: cpHeaders});
        return this.apiService.put('/suppliers/' + supplier.id, supplier, options)
            .map(success => success.status)
            .catch(this.handleError);
    }

    createSupplier(supplier: Supplier): Observable<number> {
        let body = JSON.stringify(supplier);
        let cpHeaders = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: cpHeaders});
        // console.log(ClientUser);
        return this.apiService.post('/suppliers', body, options)
            .map(success => success.status)
            .catch(this.handleError);
    }

    private extractData(response: Response) {
        let body = response.json();
        return body;
    }

    private handleError(error: Response | any) {
        return Observable.throw(error.status);
    }

}
