import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class ConstService {
  private static _STAFF_ROLES = ['5bd3d18f694f5c6ce766145e', '5bd3d223694f5c6ce766145f'];

  public static get STAFF_ROLES(): string[] {
    return this._STAFF_ROLES;
  }

  constructor(private translate:TranslateService) { }
  formatDate(str){
    if(!isNaN(Date.parse(str))&& isNaN(Number(str))){
      let date= new Date(str);
      var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ];
      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();
      return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }else{
      return str;
  }}
  translateUtterance(utterance :string){
    let temp;
    this.translate.stream(utterance).subscribe( (str)=>{
      temp= str;
    });
    return temp;
  }
}
