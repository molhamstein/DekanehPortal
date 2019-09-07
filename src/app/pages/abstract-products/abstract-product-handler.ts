import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { ApiService } from '../../services/api.service';
import { AbstractProductModel } from './abstract-product-model';

@Injectable()
export class AbstractProductHandler {

    constructor(private apiService: ApiService) {
    }

    getAllProducts() {
        var filter = { "include": "manufacturer" }
        return this.apiService.get('/productAbstracts?[filter][include]=manufacturer')
            .map(this.extractData).catch(this.handleError);
    }

    getWarningProd(threshold, perPage, currentPage) {
        var filter = { "include": "manufacturer" }
        let param = new URLSearchParams();
        param.append('threshold', threshold);
        param.append('limit', perPage);
        param.append('skip', ((currentPage - 1) * perPage).toString());
        return this.apiService.get('/productAbstracts/under', param)
            .map(this.extractData).catch(this.handleError);
    }

    getWarningProdCount(threshold) {
        var filter = { "include": "manufacturer" }
        let param = new URLSearchParams();
        param.append('threshold', threshold);
        return this.apiService.get('/productAbstracts/under/count', param)
            .map(this.extractData).catch(this.handleError);
    }


    getManById(id: string): Observable<any> {
        let param = new URLSearchParams();
        return this.apiService.get('/manufacturers/' + id)
            .map(this.extractData).catch(this.handleError);
    }

    getProductsCount(): Observable<number> {
        return this.apiService.get('/productAbstracts/count')
            .map(this.extractData).catch(this.handleError);
    }

    getByFilters(filters: any[]) {
        let param = new URLSearchParams();
        let query = '';
        for (let filter of filters) {
            if (query != '') {
                query = query + ',';
            }
            query = query + '{"' + filter['name'] + '":"' + filter['value'] + '"}';
        }
        param.append('filter', '{ "include":  "manufacturer","where":{"and": [ ' + query + ']}}');
        return this.apiService.get('/productAbstracts', param)
            .map(this.extractData).catch(this.handleError);
    }

    getPerPageProducts(perPage: number, currentPage: number) {
        let param = new URLSearchParams();
        param.append('filter', '{"include":  "manufacturer", "order": "creationDate DESC","limit":' + perPage + ',"skip":' + (currentPage - 1) * perPage + '}');
        return this.apiService.get('/productAbstracts', param)
            .map(this.extractData).catch(this.handleError);
    }

    getAllCats(): Observable<any[]> {
        let param = new URLSearchParams();
        param.append('filter', '{"where":{"parentCategoryId" : {"exists" : false}},"include":"subCategories"}');
        return this.apiService.get('/categories', param)
            .map(this.extractData).catch(this.handleError);
    }

    getProductById(id: string): Observable<any> {
        return this.apiService.get('/productAbstracts/' + id + '?[filter][include]=manufacturer')
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

    searchByisOffer(para: string, isO?: boolean): Observable<AbstractProductModel[]> {
        let param = new URLSearchParams();
        param.append('string', para);
        param.append('isOffer', String(isO));
        param.append('limit', String(10));
        return this.apiService.get('/productAbstracts/search', param)
            .map(this.extractData).catch(this.handleError);
    }

    search(para: string): Observable<any[]> {
        let param = new URLSearchParams();
        param.append('string', para);
        param.append('limit', String(50));
        return this.apiService.get('/productAbstracts/search', param)
            .map(this.extractData).catch(this.handleError);
    }



    searchByUser(para: string, clientType: string): Observable<any[]> {
        let param = new URLSearchParams();
        param.append('string', para);
        param.append('limit', String(50));
        param.append('clientType', clientType);
        return this.apiService.get('/productAbstracts/search', param)
            .map(this.extractData).catch(this.handleError);
    }

    newSearch(para: string, id: string): Observable<any[]> {
        let param = new URLSearchParams();
        param.append('string', para);
        param.append('limit', '10');
        return this.apiService.get('/productAbstracts/searchClient/' + id, param)
            .map(this.extractData).catch(this.handleError);
    }

    getPureProducts(): Observable<AbstractProductModel[]> {
        let param = new URLSearchParams();
        param.append('filter', '{"where":{"isOffer":false}}');
        return this.apiService.get('/productAbstracts', param)
            .map(this.extractData).catch(this.handleError);
    }

    uploadImage(image: File): Observable<any> {
        let formData = new FormData();
        formData.append('file', image);
        return this.apiService.post('/attachments/images/upload', formData).map(this.extractData).catch(this.handleError);
    }

    createProduct(Product: AbstractProductModel, threshold: number, warningThreshold: number): Observable<number> {
        let data = Object.assign({}, Product);
        data['threshold'] = threshold;
        data['warningThreshold'] = warningThreshold;
        let body = JSON.stringify(data);
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.apiService.post('/productAbstracts', body, options)
            .map(success => success.status)
            .catch(this.handleError);
    }

    updateProduct(product: AbstractProductModel): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.apiService.put('/productAbstracts/' + product.id, product, options)
            .map(success => success.status)
            .catch(this.handleError);
    }

    updateWhearhouseProduct(id, data): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.apiService.put('/warehouseProducts/' + id, data, options)
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
