import {Injectable} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Observable} from 'rxjs/Observable';
import {Headers, RequestOptions, Response} from '@angular/http';
import {Slide} from './slide';

@Injectable()
export class SlideHandlerService {

    constructor(private apiService: ApiService) {

    }

    getAllSlides(): Observable<Slide[]> {
        return this.apiService.get('/topSliders')
            .map(this.extractData)
            .catch(this.handleError);
    }

    createSlide(Slide: Slide): Observable<number> {
        let body = JSON.stringify(Slide);
        let cpHeaders = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: cpHeaders});
        return this.apiService.post('/topSliders', body, options)
            .map(success => success.status)
            .catch(this.handleError);
    }

    updateSlide(Slide: Slide): Observable<number> {
        let cpHeaders = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: cpHeaders});
        return this.apiService.put('/topSliders/' + Slide.id, Slide, options)
            .map(success => success.status)
            .catch(this.handleError);
    }

    getSlideById(id: string): Observable<Slide> {
        return this.apiService.get('/topSliders/' + id)
            .map(this.extractData)
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
