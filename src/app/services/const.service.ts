import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class ConstService {
    constructor(private translate: TranslateService) {
    }

    private static _STAFF_ROLES = ['5be62ecb744a6b07b29b4262'];

    public static get STAFF_ROLES(): string[] {
        return this._STAFF_ROLES;
    }

    formatDate(str,hours?) {
        if (!isNaN(Date.parse(str)) && isNaN(Number(str))) {
            let date = new Date(str);
            var monthNames = [
                'Jan', 'Feb', 'Mar',
                'Apr', 'May', 'Jun', 'Jul',
                'Aug', 'Sep', 'Oct',
                'Nov', 'Dec'
            ];
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();

            if(hours=='nohours'){
                return day + ' ' + monthNames[monthIndex] + ' ' + year;

            }else {
            return date.getUTCHours() + ':' + date.getUTCMinutes() + ' ' + day + ' ' + monthNames[monthIndex] + ' ' + year;
            }
        } else {
            return str;
        }
    }

    translateUtterance(utterance: string) {
        let temp;
        this.translate.stream(utterance).subscribe((str) => {
            temp = str;
        });
        return temp;
    }
}
