import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';

@Injectable()
export class ApiService {
  api="/server/";
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

  post(name,data) {
    return this.http.post(this.api+name,data,{headers:this.header});
  }

  put(name,data) {
    return this.http.put(this.api+name,data,{headers:this.header});
  }

  delete(name,id) {
    return this.http.delete(this.api+name+'\\'+id,{headers:this.header});
  }

}
