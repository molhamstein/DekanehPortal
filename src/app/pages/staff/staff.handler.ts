import {Injectable} from '@angular/core';
import {Response, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ApiService} from '../../services/api.service';
import {ConstService} from '../../services/const.service';
import {UserModel} from '../user-model';


@Injectable()
export class StaffHandler {

  constructor(private apiService: ApiService) {

  }

  roleIds = ConstService.STAFF_ROLES;

  getAllStaff(): Observable<UserModel[]> {
    let param = new URLSearchParams();
    let rolesString = '';
    for (let role of this.roleIds) {
      rolesString = rolesString + '{"roleIds":"' + role + '"},';
    }
    param.append('filter', '{"where":{"and":[' + rolesString + '{"status":{"neq":"deactivated"}}]}}');
    return this.apiService.get('/users', param)
      .map(this.extractData).catch(this.handleError);

  }

  createStaffUser(StaffUser: UserModel): Observable<number> {
    let body = JSON.stringify( StaffUser );
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: cpHeaders});
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
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: cpHeaders});
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
