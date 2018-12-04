import {Pipe, PipeTransform} from '@angular/core';

// import {b} from "@angular/core/src/render3";

@Pipe({
    name: 'removeSpaces'
})
export class RemoveSpacesPipe implements PipeTransform {

    transform(value: any, sub?: any): any {
        if (!sub)
            sub = '_';
        return value.replace(/ /g, sub);
    }

}
