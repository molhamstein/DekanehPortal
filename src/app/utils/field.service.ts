import {Injectable} from "@angular/core";
import {field} from "./field.model";

@Injectable()
export class FieldService {
  isReadable(field:field){
    return field.crud.indexOf('r')!==-1;
  }
  isCreateable(field:field){
    return field.crud.indexOf('c')!==-1;
  }
  isUpdateable(field:field){
    return field.crud.indexOf('u')!==-1;
  }
}
