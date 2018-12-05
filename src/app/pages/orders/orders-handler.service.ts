import {Injectable} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Order} from './order';
import {Headers, RequestOptions, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class OrdersHandlerService {
    constructor(private apiService: ApiService) {
    }

    createOrder(order: Order) {
        let body = JSON.stringify(order);
        let cpHeaders = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: cpHeaders});
        return this.apiService.post('/orders', body, options).map(this.extractData).catch(this.handleError);
    }

    updateOrder(order: Order) {
        let cpHeaders = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: cpHeaders});
        return this.apiService.put('/orders/' + order.id, order, options)
            .map(success => success.status)
            .catch(this.handleError);
    }

    getOrders(perPage: number, currentPage: number): Observable<Order[]> {
        let param = new URLSearchParams();
        // param.append('filter', '{"include":"coupon","order":"orderDate<DESC>"}');
        param.append('filter', '{"order": "orderDate DESC","limit":' + perPage + ',"skip":' + (currentPage - 1) * perPage + ',"include":"coupon"}');
        return this.apiService.get('/orders', param).map(this.extractData).catch(this.handleError);
    }

    getOrdersCount(): Observable<number> {
        return this.apiService.get('/orders/count')
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
