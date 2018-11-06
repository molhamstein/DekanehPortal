import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';

@Injectable()
export class ApiService {
  api = 'http://104.217.253.15:3003/api';
  header=new Headers();
  constructor(private http: Http) {
    if(localStorage.getItem('token'))
      this.header.set('authorization',localStorage.getItem('token'));
    else {
    }
  }

  get(name,params?:URLSearchParams) {
    if(params){
      return this.http.get(this.api+name,{params:params,headers:this.header});
    }
    return this.http.get(this.api+name,{headers:this.header});
  }

  post(name, data, options) {
    return this.http.post(this.api + name, data, options);
  }

  put(name, data, options) {
    return this.http.put(this.api + name, data, options);
  }

  delete(name,id) {
    return this.http.delete(this.api+name+'\\'+id,{headers:this.header});
  }

}
