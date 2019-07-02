import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ApiService } from '../../services/api.service';
import { ConstService } from '../../services/const.service';
import { UserModel } from '../user-model';


@Injectable()
export class StaffHandler {

    roleIds = ConstService.STAFF_ROLES;
    wherehouseKeeperRoleIds = ConstService.WEAR_KEEPER_ROLES;
    wherehouseRoleIds = ConstService.WEAR_ROLES;
    
    constructor(private apiService: ApiService) {

    }

    getAllStaff(): Observable<UserModel[]> {
        let param = new URLSearchParams();
        let rolesString = '';
        for (let role of this.roleIds) {
            rolesString = rolesString + '{"roleIds":"' + role + '"},';
        }
        for (let role of this.wherehouseRoleIds) {
            rolesString = rolesString + '{"roleIds":"' + role + '"},';
        }
        for (let role of this.wherehouseKeeperRoleIds) {
            rolesString = rolesString + '{"roleIds":"' + role + '"},';
        }
        
        if (rolesString != '') {
            rolesString = rolesString.substr(0, rolesString.length - 1)
        }
        param.append('filter', '{"where":{"or":[' + rolesString + ']}}');
        return this.apiService.get('/users', param)
            .map(this.extractData).catch(this.handleError);

    }

    getAllRoles(): Observable<any[]> {

        return this.apiService.get('/roles')
            .map(this.extractData).catch(this.handleError);

    }

    createStaffUser(StaffUser: UserModel): Observable<number> {
        let body = JSON.stringify(StaffUser);
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        // console.log(StaffUser);
        return this.apiService.post('/users', body, options)
            .map(success => success.status)
            .catch(this.handleError);
    }

    getStaffUserById(StaffUserId: string): Observable<UserModel> {
        return this.apiService.get('/users/' + StaffUserId)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getStaffByEmail(StaffUserEmail: string): Observable<UserModel> {
        let param = new URLSearchParams();
        param.append('where', '{"email":"' + StaffUserEmail + '"}');
        return this.apiService.get('/users/count', param)
            .map(this.extractData)
            .catch(this.handleError);
    }


    getStaffByUserName(StaffUserName: string): Observable<UserModel> {
        let param = new URLSearchParams();
        param.append('where', '{"username":"' + StaffUserName + '"}');
        return this.apiService.get('/users/count', param)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getStaffByPhone(StaffUserPhone: string): Observable<UserModel> {
        let param = new URLSearchParams();
        param.append('where', '{"phoneNumber":"' + StaffUserPhone + '"}');
        return this.apiService.get('/users/count', param)
            .map(this.extractData)
            .catch(this.handleError);
    }

    updateStaffUser(StaffUser: UserModel): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.apiService.put('/users/' + StaffUser.id, StaffUser, options)
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
