import {Injectable} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SuppliersService {

  constructor(private api: ApiService) {

  }

  getOedersFromSuppliers() {
    // let param = new URLSearchParams();
    // param.append('filter', '{"where": {"titleAr": {"like": "' + str + '"}},"limit":"10"}');
    return this.api.get('/ordersFromSuppliers')
      .map(this.extractData).catch(this.handleError);
  }

  getTodayOFS() {
    return this.api.get('/orders/supplierOrders')
      .map(this.extractData).catch(this.handleError);
  }

  archiveAll() {
    return this.api.post('/ordersFromSuppliers', null)
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
