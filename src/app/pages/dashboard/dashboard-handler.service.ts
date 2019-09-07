import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';

@Injectable()
export class DashboardHandlerService {

    constructor(private apiService: ApiService) {
    }


    getWarehouseStatistics(): Observable<any[]> {


        return this.apiService.get('/warehouseProducts/statistics')
            .map(this.extractData).catch(this.handleError);

    }


    getwarehouseProductsDaily(id, from, to) {
        // console.log("this.abstractProductIds")
        // console.log(id)
        // console.log("this.fromFilter")
        // console.log(from)
        // console.log("this.toFilter")
        // console.log(to)
        let param = new URLSearchParams();
        param.append('productAbstractId', id);
        param.append('from', from);
        param.append('to', to);
        console.log("param")
        console.log(param)


        return this.apiService.get('/warehouseProducts/daily', param)
            .map(this.extractData).catch(this.handleError);

    }

    getOrderStatistics(): Observable<any[]> {


        return this.apiService.get('/orders/list')
            .map(this.extractData).catch(this.handleError);

    }

    getArea(id: string): Observable<any> {
        return this.apiService.get('/areas/' + id)
            .map(this.extractData)
            .catch(this.handleError);

    }

    updateArea(area: any): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.apiService.put('/areas/' + area.id, area, options)
            .map(success => success.status)
            .catch(this.handleError);
    }

    createArea(area: any): Observable<number> {
        let body = JSON.stringify(area);
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
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
        return Observable.throw(error.status);
    }

}
