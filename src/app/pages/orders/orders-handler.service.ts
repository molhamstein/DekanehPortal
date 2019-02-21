import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Order } from './order';
import { Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UserModel } from '../user-model';
import { ConstService } from '../../services/const.service';

@Injectable()
export class OrdersHandlerService {
    constructor(private apiService: ApiService) {
    }

    roleIds = ConstService.STAFF_ROLES;
    createOrder(order: Order) {
        let body = JSON.stringify(order);
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.apiService.post('/orders', body, options).map(this.extractData).catch(this.handleError);
    }

    addNote(data) {
        let body = JSON.stringify(data);
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.apiService.post('/userNots', body, options)
            .map(success => success.status)
            .catch(this.handleError);

    }

    updateOrder(order: Order) {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.apiService.put('/orders/' + order.id + '/editOrder', { "data": order }, options)
            .map(success => success.status)
            .catch(this.handleError);
    }

    downloadBill(orderId) {

        return this.apiService.get('/orders/' + orderId + '/printInvoice').map(this.extractData).catch(this.handleError);

    }

    assignDelivery(user, orderId) {
        let body = JSON.stringify(user);
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.apiService.post('/orders/' + orderId + '/assignDelivery', body, options).map(this.extractData).catch(this.handleError);
    }

    SetDelivered(orderId) {

        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.apiService.post('/orders/' + orderId + '/delivered', options).map(this.extractData).catch(this.handleError);
    }

    deleteOrder(id) {
        // let cpHeaders = new Headers({'Content-Type': 'application/json'});
        // let options = new RequestOptions({headers: cpHeaders});
        return this.apiService.delete('/orders', id)
            .map(success => success.status)
            .catch(this.handleError);
    }

    getٍStaffByString(str: string): Observable<UserModel[]> {
        let param = new URLSearchParams();
        let rolesString = '';
        for (let role of this.roleIds) {
            rolesString = rolesString + '{"roleIds":"' + role + '"},';
        }
        // param.append('filter', '{"where":{"and":[' + rolesString + '{}]}}');
        param.append('filter', '{"where":{"and":[' + rolesString + ' {"username": {"like": "' + str + '"}}]},"limit":"10"}');
        return this.apiService.get('/users', param)
            .map(this.extractData).catch(this.handleError);
    }

    cancelOrder(id: string) {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.apiService.post('/orders/' + id + '/assignCancel', {}, options).map(this.extractData).catch(this.handleError);
    }
    getOrders(perPage: number, currentPage: number, delMemID?): Observable<Order[]> {
        let param = new URLSearchParams();
        if (delMemID != undefined) {
            param.append('filter', '{"where":{"deliveryMemberId":"' + delMemID + '"},"order": "orderDate DESC","limit":' + perPage + ',"skip":' + (currentPage - 1) * perPage + ',"include":"coupon"}');

        } else {
            param.append('filter', '{"order": "orderDate DESC","limit":' + perPage + ',"skip":' + (currentPage - 1) * perPage + ',"include":"coupon"}');

        }
        return this.apiService.get('/orders', param).map(this.extractData).catch(this.handleError);
    }

    getOrdersCount(delMemID?): Observable<number> {
        if (delMemID != undefined) {
            let param = new URLSearchParams();
            param.append('where', '{"deliveryMemberId":"' + delMemID + '"}');
            return this.apiService.get('/orders/count', param)
                .map(this.extractData).catch(this.handleError);
        }
        return this.apiService.get('/orders/count')
            .map(this.extractData).catch(this.handleError);
    }
    getNewOrdersCount(): Observable<number> {
        let param = new URLSearchParams();
        param.append('where', '{"status":"pending"}');

        return this.apiService.get('/orders/count', param)
            .map(this.extractData).catch(this.handleError);
    }
    getSucceededOrdersCount(): Observable<number> {
        let param = new URLSearchParams();
        param.append('where', '{"status":"delivered"}');

        return this.apiService.get('/orders/count', param)
            .map(this.extractData).catch(this.handleError);
    }
    getInDeliveryOrdersCount(): Observable<number> {
        let param = new URLSearchParams();
        param.append('where', '{"status":"inDelivery"}');
        return this.apiService.get('/orders/count', param)
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
