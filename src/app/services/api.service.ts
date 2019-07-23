import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class ApiService {
    api = environment.baseUrl;
    header = new Headers();

    constructor(private http: Http) {
        if (localStorage.getItem('token'))
            this.header.set('authorization', localStorage.getItem('token'));
        else {
        }
    }
    get(name, params?: URLSearchParams) {
        console.log(this.header);
        if (params) {
            return this.http.get(this.api + name, { params: params, headers: this.header });
        }
        return this.http.get(this.api + name, { headers: this.header });
    }

    post(name, data, options?) {
        if (options) {
            options.headers.append('authorization', localStorage.getItem('token'));
            return this.http.post(this.api + name, data, options);
        }
        return this.http.post(this.api + name, data, { headers: this.header });

    }


    put(name, data, options?) {
        if (options) {
            options.headers.append('authorization', localStorage.getItem('token'));
            return this.http.put(this.api + name, data, options);
        }
        return this.http.put(this.api + name, data, { headers: this.header });
    }

    patch(name, data, options?) {
        if (options) {
            options.headers.append('authorization', localStorage.getItem('token'));
            return this.http.put(this.api + name, data, options);
        }
        return this.http.patch(this.api + name, data, { headers: this.header });
    }

    delete(name, id) {
        return this.http.delete(this.api + name + '\\' + id, { headers: this.header });
    }

}
