import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class ConstService {

  constructor(private translate:TranslateService) { }
  translateUtterance(utterance :string){
    let temp;
    this.translate.stream(utterance).subscribe( (str)=>{
      temp= str;
    });
    return temp;
  }
}
