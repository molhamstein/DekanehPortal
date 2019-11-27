import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { UserModel } from '../user-model';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ClientsHandler {
    constructor(private apiService: ApiService) {

    }

     

    getInstallment(clientId, perPage: number, currentPage: number): Observable<any[]> {
        let param = new URLSearchParams();
        var filter = {}
        filter = { where: { userId: clientId }, order: "createdAt DESC", limit: + perPage, skip: (currentPage - 1) * perPage }

        let rolesString = '';
        param.append('filter', JSON.stringify(filter));
        return this.apiService.get('/installments', param)
            .map(this.extractData).catch(this.handleError);

    }

    getInstallmentCount(clientId): Observable<number> {
        let param = new URLSearchParams();
        var filter = {}
        filter = { userId: clientId }
        param.append('where', JSON.stringify(filter));

        return this.apiService.get('/installments/count', param)
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

    addInstallment(data) {
        let body = JSON.stringify(data);
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.apiService.post('/installments', body, options)
            .map(success => success.status)
            .catch(this.handleError);

    }

    updateInstallment(id,data) {
        let body = JSON.stringify(data);
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.apiService.put('/installments/'+id+"/editInstallment", body, options)
            .map(success => success.status)
            .catch(this.handleError);

    }

    getAllClient(): Observable<UserModel[]> {
        let param = new URLSearchParams();
        let rolesString = '';

        param.append('filter', '{"where":{"and":[{"roleIds":{"eq":[]}}]}}');
        return this.apiService.get('/users', param)
            .map(this.extractData).catch(this.handleError);

    }

    getAllAreas(): Observable<any[]> {

        return this.apiService.get('/areas')
            .map(this.extractData).catch(this.handleError);

    }

    getAreaById(areaId: string): Observable<any> {
        return this.apiService.get('/areas/' + areaId)
            .map(this.extractData)
            .catch(this.handleError);

    }

    createClientUser(ClientUser: UserModel): Observable<number> {
        let body = JSON.stringify(ClientUser);
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        // console.log(ClientUser);
        return this.apiService.post('/users', body, options)
            .map(success => success.status)
            .catch(this.handleError);
    }

    changePass(passForm: any): Observable<string> {
        let body = JSON.stringify(passForm);
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.apiService.post('/users/resetPassword', body, options)
            .map(success => success.status)
            .catch(this.handleError);
    }

    getNotClientUserById(ClientUserId: string) {
        var filter = { "where": { "userId": ClientUserId }, "order": 'createdAt DESC' }
        return this.apiService.get('/userNots?filter=' + JSON.stringify(filter))
            .map(this.extractData)
            .catch(this.handleError);

    }

    deleteNote(noteId) {
        return this.apiService.delete('/userNots', noteId)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getClientUserById(ClientUserId: string): Observable<UserModel> {
        return this.apiService.get('/users/' + ClientUserId)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getClientByEmail(ClientUserEmail: string): Observable<UserModel> {
        let param = new URLSearchParams();
        param.append('where', '{"email":"' + ClientUserEmail + '"}');
        return this.apiService.get('/users/count', param)
            .map(this.extractData)
            .catch(this.handleError);
    }


    getClientByUserName(ClientUserName: string): Observable<UserModel> {
        let param = new URLSearchParams();
        param.append('where', '{"username":"' + ClientUserName + '"}');
        return this.apiService.get('/users/count', param)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getClientByPhone(ClientUserPhone: string): Observable<UserModel> {
        let param = new URLSearchParams();
        param.append('where', '{"phoneNumber":"' + ClientUserPhone + '"}');
        return this.apiService.get('/users/count', param)
            .map(this.extractData)
            .catch(this.handleError);
    }

    updateClientUser(ClientUser: UserModel): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.apiService.put('/users/' + ClientUser.id, ClientUser, options)
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

