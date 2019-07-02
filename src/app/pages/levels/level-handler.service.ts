import { Level } from './levels';
import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { UserModel } from '../user-model';
import { ClientsHandler } from '../clients/clients-handler';
import { stat } from 'fs';

@Injectable()
export class LevelHandlerService {

    constructor(private apiService: ApiService) {


    }

    getLevels(status, perPage: number, currentPage: number): Observable<Level[]> {
        let param = new URLSearchParams();
        var filter = {}
        if (status != "")
            filter = { where: { status: status }, order: "creationDate DESC", limit: + perPage, skip: (currentPage - 1) * perPage }
        else
            filter = { order: "creationDate DESC",  limit: + perPage, skip: (currentPage - 1) * perPage }

        let rolesString = '';
        param.append('filter', JSON.stringify(filter));
        return this.apiService.get('/levels', param)
            .map(this.extractData).catch(this.handleError);

    }

    getAllLevels(): Observable<Level[]> {


        return this.apiService.get('/levels')
            .map(this.extractData).catch(this.handleError);

    }
    getLevelCount(status): Observable<number> {
        let param = new URLSearchParams();
        var filter = {}
        if (status != "")
            filter = { status: status }
        param.append('where', JSON.stringify(filter));

        return this.apiService.get('/levels/count', param)
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

    getLevel(id: string): Observable<Level> {
        return this.apiService.get('/levels/' + id)
            .map(this.extractData)
            .catch(this.handleError);

    }
    getCouponByCode(code: string): Observable<Level> {
        let param = new URLSearchParams();
        param.append('filter', '{"where":{"code":"' + code + '"}}');
        return this.apiService.get('/coupons/', param)
            .map(this.extractData)
            .catch(this.handleError);

    }

    updateLevel(coupon: Level): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.apiService.put('/levels/' + coupon.id, coupon, options)
            .map(success => success.status)
            .catch(this.handleError);
    }

    createLevel(coupon: Level): Observable<number> {
        let body = JSON.stringify(coupon);
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.apiService.post('/levels', body, options)
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
