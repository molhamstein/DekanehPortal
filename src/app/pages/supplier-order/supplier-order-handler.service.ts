import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UserModel } from '../user-model';
import { ConstService } from '../../services/const.service';
import { SupplierOrder } from './Supplier-order';

@Injectable()
export class SupplierOrdersHandlerService {
    constructor(private apiService: ApiService) {
    }

    roleIds = ConstService.STAFF_ROLES;
    roleWearIds = ConstService.WEAR_ROLES;

    createSupplierOrder(order: SupplierOrder) {
        let body = order;
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.apiService.post('/supplies', JSON.stringify(body), options).
            map(this.extractData)
            .catch(this.handleErrorSec);

    }

    getReportDaily(from, to): Observable<any> {
        let param = new URLSearchParams();
        param.append("from", new Date(from).toString())
        param.append("to", new Date(to).toString())
    return this.apiService.get('/supplies/dailySupply', param)
            .map(this.extractData).catch(this.handleError);
    }


    addNote(data) {
        let body = JSON.stringify(data);
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.apiService.post('/userNots', body, options)
            .map(success => success.status)
            .catch(this.handleError);

    }

    updateOrder(order: SupplierOrder) {
        let body = order;
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.apiService.put('/supplies/' + order.id + '/edit', body, options)
            .map(success => success.status)
            .catch(this.handleErrorSec);
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

    assignPack(user, orderId) {
        let body = JSON.stringify(user);
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.apiService.post('/orders/' + orderId + '/assignPack', body, options).map(this.extractData).catch(this.handleError);
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

    getUserWearByString(str: string): Observable<UserModel[]> {
        let param = new URLSearchParams();
        let rolesString = '';
        for (let role of this.roleWearIds) {
            rolesString = rolesString + '{"roleIds":"' + role + '"},';
        }
        // param.append('filter', '{"where":{"and":[' + rolesString + '{}]}}');
        param.append('filter', '{"where":{"and":[' + rolesString + ' {"ownerName": {"like": "' + str + '"}}]},"limit":"10"}');
        return this.apiService.get('/users', param)
            .map(this.extractData).catch(this.handleError);
    }

    cancelOrder(id: string) {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.apiService.post('/orders/' + id + '/assignCancel', {}, options).map(this.extractData).catch(this.handleError);
    }
    getOrders(perPage: number, currentPage: number, where = {}): Observable<SupplierOrder[]> {
        let param = new URLSearchParams();
        where['order'] = "createDate DESC"
        where['limit'] = perPage
        where['skip'] = (currentPage - 1) * perPage
        console.log(where);
        param.append('filter', JSON.stringify(where));
        return this.apiService.get('/supplies', param).map(this.extractData).catch(this.handleError);
    }
    getOrder(id): Observable<any> {
        return this.apiService.get('/supplies/' + id).map(this.extractData).catch(this.handleError);
    }

    cancelSupplierOrder(id) {
        return this.apiService.put('/supplies/' + id + "/cancel", {}).map(this.extractData).catch(this.handleError);
    }
    deliverSupplierOrder(id) {
        return this.apiService.put('/supplies/' + id + "/deliver", {}).map(this.extractData).catch(this.handleError);
    }

    getOrdersCount(where = {}): Observable<number> {
        return this.apiService.get('/supplies/count?filter=' + JSON.stringify(where))
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
    private handleErrorSec(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(JSON.parse(error._body).error);
    }
}
