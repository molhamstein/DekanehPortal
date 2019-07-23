import { AwardModel } from './award-model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { ApiService } from '../../services/api.service';

@Injectable()
export class AwardHandler {

    constructor(private apiService: ApiService) {
    }

    getAllProducts() {
        var filter = {}
        return this.apiService.get('/awards')
            .map(this.extractData).catch(this.handleError);
    }

    getWarningProd(threshold) {
        var filter = {}
        let param = new URLSearchParams();
        param.append('threshold', threshold);
        return this.apiService.get('/awards/under', param)
            .map(this.extractData).catch(this.handleError);
    }


    changeAwardStatus(award): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        var newStatus = "activated"
        if (award.status == 'activated')
            newStatus = "deactivated"
        return this.apiService.patch('/awards/' + award.id, { "status": newStatus }, options)
            .map(success => success.status)
            .catch(this.handleError);
    }


    getManById(id: string): Observable<any> {
        let param = new URLSearchParams();
        return this.apiService.get('/manufacturers/' + id)
            .map(this.extractData).catch(this.handleError);
    }

    getProductsCount(): Observable<number> {
        return this.apiService.get('/awards/count')
            .map(this.extractData).catch(this.handleError);
    }

    getByFilters(filters: any[]) {
        let param = new URLSearchParams();

        param.append('filter', '{"where":{"and": ' + JSON.stringify(filters) + '}}');
        return this.apiService.get('/awards', param)
            .map(this.extractData).catch(this.handleError);
    }

    getPerPageProducts(perPage: number, currentPage: number) {
        let param = new URLSearchParams();
        param.append('filter', '{ "order": "creationDate DESC","limit":' + perPage + ',"skip":' + (currentPage - 1) * perPage + '}');
        return this.apiService.get('/awards', param)
            .map(this.extractData).catch(this.handleError);
    }

    getAllCats(): Observable<any[]> {
        let param = new URLSearchParams();
        param.append('filter', '{"where":{"parentCategoryId" : {"exists" : false}}}');
        return this.apiService.get('/categories', param)
            .map(this.extractData).catch(this.handleError);
    }

    getProductById(id: string): Observable<any> {
        return this.apiService.get('/awards/' + id)
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

    searchByisOffer(para: string, isO?: boolean): Observable<AwardModel[]> {
        let param = new URLSearchParams();
        param.append('string', para);
        param.append('isOffer', String(isO));
        param.append('limit', String(10));
        return this.apiService.get('/awards/search', param)
            .map(this.extractData).catch(this.handleError);
    }

    search(para: string): Observable<any[]> {
        let param = new URLSearchParams();
        param.append('string', para);
        param.append('limit', String(50));
        return this.apiService.get('/awards/search', param)
            .map(this.extractData).catch(this.handleError);
    }



    searchByUser(para: string, clientType: string): Observable<any[]> {
        let param = new URLSearchParams();
        param.append('string', para);
        param.append('limit', String(50));
        param.append('clientType', clientType);
        return this.apiService.get('/awards/search', param)
            .map(this.extractData).catch(this.handleError);
    }

    newSearch(para: string, id: string): Observable<any[]> {
        let param = new URLSearchParams();
        param.append('string', para);
        param.append('limit', '10');
        return this.apiService.get('/awards/searchClient/' + id, param)
            .map(this.extractData).catch(this.handleError);
    }

    getPureProducts(): Observable<AwardModel[]> {
        let param = new URLSearchParams();
        param.append('filter', '{"where":{"isOffer":false}}');
        return this.apiService.get('/awards', param)
            .map(this.extractData).catch(this.handleError);
    }

    uploadImage(image: File): Observable<any> {
        let formData = new FormData();
        formData.append('file', image);
        return this.apiService.post('/attachments/images/upload', formData).map(this.extractData).catch(this.handleError);
    }

    createProduct(Product: AwardModel): Observable<number> {
        let data = Object.assign({}, Product);
        let body = JSON.stringify(data);
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.apiService.post('/awards', body, options)
            .map(success => success.status)
            .catch(this.handleError);
    }

    updateProduct(product: AwardModel): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.apiService.put('/awards/' + product.id, product, options)
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
