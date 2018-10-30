import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class ConstService {
  private static _STAFF_ROLES = ['5bd3d18f694f5c6ce766145e', '5bd3d223694f5c6ce766145f'];

  public static get STAFF_ROLES(): string[] {
    return this._STAFF_ROLES;
  }

  constructor(private translate:TranslateService) { }
  translateUtterance(utterance :string){
    let temp;
    this.translate.stream(utterance).subscribe( (str)=>{
      temp= str;
    });
    return temp;
  }
}
