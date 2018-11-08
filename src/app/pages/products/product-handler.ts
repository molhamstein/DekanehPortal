import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Headers, RequestOptions, Response, URLSearchParams} from '@angular/http';
import {ApiService} from '../../services/api.service';
import {ProductModel} from './product-model';

@Injectable()
export class ProductHandler {

  constructor(private apiService: ApiService) {
  }

  getAllProducts() {
    return this.apiService.get('/products')
      .map(this.extractData).catch(this.handleError);
  }

  getAllCats(): Observable<any[]> {
    let param = new URLSearchParams();
    param.append('filter', '{"where":{"parentCategoryId" : {"exists" : false}},"include":"subCategories"}');
    return this.apiService.get('/categories', param)
      .map(this.extractData).catch(this.handleError);
  }
  getProductById(id: string): Observable<any> {
    return this.apiService.get('/products/' + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getAllMans(): Observable<any[]> {
    let param = new URLSearchParams();
    return this.apiService.get('/manufacturers')
      .map(this.extractData).catch(this.handleError);
  }

  getSubCats(id: string): Observable<any[]> {
    let param = new URLSearchParams();
    return this.apiService.get('/categories/' + id + '/subCategories')
      .map(this.extractData).catch(this.handleError);
  }

  getOffers(): Observable<ProductModel[]> {
    let param = new URLSearchParams();
    param.append('filter', '{"where":{"isOffer":true}}');
    return this.apiService.get('/products', param)
      .map(this.extractData).catch(this.handleError);
  }

  uploadImage(image: File): Observable<any> {
    let formData = new FormData();
    formData.append('file', image);
    return this.apiService.post('/attachments/images/upload', formData).map(this.extractData).catch(this.handleError);
  }

  createProduct(Product: ProductModel): Observable<number> {
    let body = JSON.stringify(Product);
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: cpHeaders});
    return this.apiService.post('/products', body, options)
      .map(success => success.status)
      .catch(this.handleError);
  }
  updateProduct(product: ProductModel): Observable<number> {
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: cpHeaders});
    return this.apiService.put('/products/' + product.id, product, options)
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
