import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Coupon } from './coupon';
import { UserModel } from '../user-model';
import { ClientsHandler } from '../clients/clients-handler';
import { stat } from 'fs';

@Injectable()
export class CouponHandlerService {

    constructor(private apiService: ApiService) {


    }

    getCoupons(status, perPage: number, currentPage: number): Observable<Coupon[]> {
        let param = new URLSearchParams();
        var filter = {}
        if (status != "")
            filter = { where: { status: status }, order: "creationDate<DESC>", limit: + perPage, skip: (currentPage - 1) * perPage }
        else
            filter = { order: "creationDate<DESC>", limit: + perPage, skip: (currentPage - 1) * perPage }

        let rolesString = '';
        param.append('filter', JSON.stringify(filter));
        return this.apiService.get('/coupons', param)
            .map(this.extractData).catch(this.handleError);

    }

    getCouponCount(status): Observable<number> {
        let param = new URLSearchParams();
        var filter = {}
        if (status != "")
            filter = { status: status }
        param.append('where', JSON.stringify(filter));

        return this.apiService.get('/coupons/count', param)
            .map(this.extractData).catch(this.handleError);
    }

    getUsersById(id: string): Observable<UserModel> {
        let uh = new ClientsHandler(this.apiService);
        return uh.getClientUserById(id);

    }

    getUsersByString(str: string): Observable<UserModel[]> {
        let param = new URLSearchParams();
        let rolesString = '';
        param.append('filter', '{"where":{"and":[{"roleIds":{"eq":[]}},{"or": [{"ownerName": {"like": "' + str + '"}},{"shopName": {"like": "' + str + '"}}]}]},"limit":"10"}');
        return this.apiService.get('/users', param)
            .map(this.extractData).catch(this.handleError);
    }
    getUsersByShope(str: string): Observable<UserModel[]> {
        let param = new URLSearchParams();
        param.append('filter', '{"where":{"and":[{"roleIds":{"eq":[]}}, {"shopName": {"like": "' + str + '"}}]},"limit":"10"}');
        return this.apiService.get('/users', param)
            .map(this.extractData).catch(this.handleError);
    }

    searchCoupons(str: string) {
        let param = new URLSearchParams();
        let rolesString = '';
        param.append('filter', '{"where":{"and":[{"roleIds":{"eq":[]}}, {"ownerName": {"like": "' + str + '"}}]},"limit":"10"}');
        return this.apiService.get('/coupons', param)
            .map(this.extractData).catch(this.handleError);

    }

    getCoupon(id: string): Observable<Coupon> {
        return this.apiService.get('/coupons/' + id)
            .map(this.extractData)
            .catch(this.handleError);

    }
    getCouponByCode(code: string): Observable<Coupon> {
        let param = new URLSearchParams();
        param.append('filter', '{"where":{"code":"' + code + '"}}');
        return this.apiService.get('/coupons/', param)
            .map(this.extractData)
            .catch(this.handleError);

    }

    updateCoupon(coupon: Coupon): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.apiService.put('/coupons/' + coupon.id, coupon, options)
            .map(success => success.status)
            .catch(this.handleError);
    }

    createCoupon(coupon: Coupon): Observable<number> {
        let body = JSON.stringify(coupon);
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.apiService.post('/coupons', body, options)
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
