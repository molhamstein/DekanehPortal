import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { ApiService } from '../../services/api.service';
import { ProductModel } from './product-model';

@Injectable()
export class ProductHandler {

    constructor(private apiService: ApiService) {
    }

    getAllProducts() {
        return this.apiService.get('/products')
            .map(this.extractData).catch(this.handleError);
    }

    getManById(id: string): Observable<any> {
        let param = new URLSearchParams();
        return this.apiService.get('/manufacturers/' + id)
            .map(this.extractData).catch(this.handleError);
    }

    getProductsCount(): Observable<number> {
        return this.apiService.get('/products/count')
            .map(this.extractData).catch(this.handleError);
    }

    getByFilters(filters: any[]) {
        let param = new URLSearchParams();
        let query = '';
        for (let filter of filters) {
            if (query != '') {
                query = query + ',';
            }
            if (filter['name'] == 'offerMaxQuantity') {
                if (filter['value']) {
                    query = query + '{"' + filter['name'] + '":{"neq":0}}';
                }
                else
                    query = query + '{"' + filter['name'] + '":{"eq":0}}';

            }
            else if (filter['name'] != 'productAbstractId')
                query = query + '{"' + filter['name'] + '":"' + filter['value'] + '"}';
            else {
                if (filter['value'] == "no") {
                    query = query + '{"' + filter['name'] + '":{"eq":null}}';
                }
                else
                    query = query + '{"' + filter['name'] + '":{"neq":null}}';

            }
        }
        param.append('filter', '{"where":{"and": [ ' + query + ']}}');
        return this.apiService.get('/products', param)
            .map(this.extractData).catch(this.handleError);
    }

    getPerPageProducts(perPage: number, currentPage: number) {
        let param = new URLSearchParams();
        param.append('filter', '{"order": "creationDate DESC","limit":' + perPage + ',"skip":' + (currentPage - 1) * perPage + '}');
        return this.apiService.get('/products', param)
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
    getAllAbs(): Observable<any[]> {
        let param = new URLSearchParams();
        return this.apiService.get('/productAbstracts')
            .map(this.extractData).catch(this.handleError);
    }

    addbarcode(data) {
        let body = JSON.stringify(data);
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.apiService.post('/barcodes', body, options)
            .map(success => success.status)
            .catch(this.handleError);

    }
    deleteBarcode(barcodeId) {
        return this.apiService.delete('/barcodes', barcodeId)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getBarcodeProdById(ClientUserId: string) {
        var filter = { "where": { "productId": ClientUserId }, "order": 'createdAt DESC' }
        return this.apiService.get('/barcodes?filter=' + JSON.stringify(filter))
            .map(this.extractData)
            .catch(this.handleError);

    }

    getSubCats(id: string): Observable<any[]> {
        let param = new URLSearchParams();
        return this.apiService.get('/categories/' + id + '/subCategories')
            .map(this.extractData).catch(this.handleError);
    }

    searchByisOffer(para: string, isO?: boolean): Observable<ProductModel[]> {
        let param = new URLSearchParams();
        param.append('string', para);
        param.append('isOffer', String(isO));
        param.append('limit', String(10));
        return this.apiService.get('/products/search', param)
            .map(this.extractData).catch(this.handleError);
    }

    search(para: string): Observable<any[]> {
        let param = new URLSearchParams();
        param.append('string', para);
        param.append('limit', String(50));
        return this.apiService.get('/products/search', param)
            .map(this.extractData).catch(this.handleError);
    }



    searchByUser(para: string, clientType: string, isOrder = "false"): Observable<any[]> {
        let param = new URLSearchParams();
        param.append('string', para);
        param.append('isOrder', isOrder);
        param.append('limit', String(50));
        param.append('clientType', clientType);
        return this.apiService.get('/products/search', param)
            .map(this.extractData).catch(this.handleError);
    }

    newSearch(para: string, id: string): Observable<any[]> {
        let param = new URLSearchParams();
        param.append('string', para);
        param.append('limit', '10');
        return this.apiService.get('/products/searchClient/' + id, param)
            .map(this.extractData).catch(this.handleError);
    }

    getPureProducts(): Observable<ProductModel[]> {
        let param = new URLSearchParams();
        param.append('filter', '{"where":{"isOffer":false}}');
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
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.apiService.post('/products', body, options)
            .map(success => success.status)
            .catch(this.handleError);
    }

    updateProduct(product: ProductModel): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
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
