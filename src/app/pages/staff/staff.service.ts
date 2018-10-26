import {Injectable} from '@angular/core';
import {Http, Response, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import {StaffUser} from './StaffUser';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class StaffService {

  private api = 'http://104.217.253.15:3003/api/users';

  constructor(private http: Http) {

  }

  getAllStaff(): Observable<StaffUser[]> {
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers:cpHeaders});

    return this.http.get(this.api + '?filter[where][status][neq]=deactivated&access_token=' + localStorage.getItem('token') )
      .map(this.extractData).catch(this.handleError);

  }

  createStaffUser(StaffUser: StaffUser): Observable<number> {
    let body = JSON.stringify( StaffUser );
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: cpHeaders});
    console.log(body);
    console.log(StaffUser);
    return this.http.post(this.api+ '?access_token=' + localStorage.getItem('token'), body, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  getStaffUserById(StaffUserId: string): Observable<StaffUser> {
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: cpHeaders});
    console.log(this.api + '/' + StaffUserId);
    return this.http.get(this.api + '/' + StaffUserId + '?access_token=' + localStorage.getItem('token'))
      .map(this.extractData)
      .catch(this.handleError);
  }

  getStaffByEmail(StaffUserEmail: string): Observable<StaffUser> {
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: cpHeaders});
    return this.http.get(this.api + '/count'+'?where={"email":"'+StaffUserEmail+'"}&access_token='  + localStorage.getItem('token'))
      .map(this.extractData)
      .catch(this.handleError);
  }

  getStaffByUserName(StaffUserName: string): Observable<StaffUser> {
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: cpHeaders});
    return this.http.get(this.api +'/count'+'?where={"username":"'+StaffUserName+'"}&access_token=' + localStorage.getItem('token'))
      .map(this.extractData)
      .catch(this.handleError);
  }
  getStaffByPhone(StaffUserPhone: string): Observable<StaffUser> {
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: cpHeaders});
    return this.http.get(this.api + '/count'+'?where={"phoneNumber":"'+StaffUserPhone+'"}&access_token=' + localStorage.getItem('token'))

      .map(this.extractData)
      .catch(this.handleError);
  }

  updateStaffUser(StaffUser: StaffUser): Observable<number> {
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: cpHeaders});
    return this.http.put(this.api + '/' + StaffUser.id + '?access_token=' + localStorage.getItem('token'), StaffUser, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  // i won't use :(
  // deleteStaffUser(StaffUser: StaffUser): Observable<number> {
  //   let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: cpHeaders });
  //   return this.http.put(this.api +"/"+ StaffUser.id, StaffUser, options)
  //     .map(success => success.status)
  //     .catch(this.handleError);
  // }
  private extractData(response: Response) {
    let body = response.json();
    return body;
  }

  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }

}
