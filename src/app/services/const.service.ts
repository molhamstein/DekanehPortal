import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ConstService {
    constructor(private translate: TranslateService) {
    }

    private static _STAFF_ROLES = ['5be62ecb744a6b07b29b4262'];
    private static _WEARHOUS_ROLES = ['5c98dc7284d4bc7edd632d54'];

    public static get STAFF_ROLES(): string[] {
        return this._STAFF_ROLES;
    }
    public static get WEAR_ROLES(): string[] {
        return this._WEARHOUS_ROLES;
    }

    formatDate(str, hours?) {
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

            if (hours == 'nohours') {
                return day + ' ' + monthNames[monthIndex] + ' ' + year;

            } else {
                return date.getHours() + ':' + date.getMinutes() + ' ' + day + ' ' + monthNames[monthIndex] + ' ' + year;
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

    roles = {
        "admin": {
            "categories": {
                "viewAll": true,
                "add": true,
                "edit": true
            },
            "manufacturers": {
                "view": true,
                "add": true,
                "edit": true
            },
            "suppliers": {
                "list": true,
                "add": true,
                "edit": true
            },
            "topSlider": {
                "list": true,
                "new": true,
                "edit": true
            },
            "staff": {
                "list": true,
                "add-on": true,
                "edit": true
            },
            "client": {
                "list": true,
                "new": true,
                "edit": true
            },
            "areas": {
                "list": true,
                "new": true,
                "edit": true
            },
            "coupons": {
                "list": true,
                "new": true,
                "edit": true
            },
            "products": {
                "list": true,
                "new": true,
                "edit": true
            },
            "reports": {
                "warning": true
            },
            "abstract-products": {
                "list": true,
                "new": true,
                "edit": true
            },
            "damaged": {
                "list": true,
                "add": true,
                "edit": true,
                "report": true
            },
            "ratings": {
                "list": true,
            },
            "notifications": {
                "add": true
            },
            "orders": {
                "management": true,
                "print":true,
                "report":true
            },
            "supplier-orders": {
                "list": true,
                "report":true,
                "new": true,
                "edit": true
            },
        },
        "sales": {
            "categories": {
                "viewAll": true,
                "add": true,
                "edit": true
            },
            "manufacturers": {
                "view": true,
                "add": true,
                "edit": true
            },
            "suppliers": {
                "list": true,
                "add": true,
                "edit": true
            },
            "topSlider": {
                "list": true,
                "new": true,
                "edit": true
            },
            "staff": {
                "list": true,
                "add-on": false,
                "edit": false
            },
            "client": {
                "list": true,
                "new": true,
                "edit": true
            },
            "areas": {
                "list": true,
                "new": true,
                "edit": true
            },
            "coupons": {
                "list": true,
                "new": true,
                "edit": true
            },
            "products": {
                "list": true,
                "new": true,
                "edit": true
            },
            "reports": {
                "warning": true
            },
            "abstract-products": {
                "list": true,
                "new": true,
                "edit": true
            },
            "damaged": {
                "list": true,
                "add": true,
                "edit": true,
                "report": true
            },
            "ratings": {
                "list": true,
            },
            "notifications": {
                "add": true
            },
            "orders": {
                "management": true,
                "print":true,
                "report":true
            },
            "supplier-orders": {
                "list": true,
                "report":true,
                "new": true,
                "edit": true
            },
        },
        "warehouseKeeper": {
            "categories": {
                "viewAll": false,
                "add": false,
                "edit": false
            },
            "manufacturers": {
                "view": false,
                "add": false,
                "edit": false
            },
            "suppliers": {
                "list": false,
                "add": false,
                "edit": false
            },
            "topSlider": {
                "list": false,
                "new": false,
                "edit": false
            },
            "staff": {
                "list": false,
                "add-on": false,
                "edit": false
            },
            "client": {
                "list": false,
                "new": false,
                "edit": false
            },
            "areas": {
                "list": false,
                "new": false,
                "edit": false
            },
            "coupons": {
                "list": false,
                "new": false,
                "edit": false
            },
            "products": {
                "list": false,
                "new": false,
                "edit": false
            },
            "reports": {
                "warning": true
            },
            "abstract-products": {
                "list": true,
                "new": false,
                "edit": false
            },
            "damaged": {
                "list": true,
                "add": false,
                "edit": false,
                "report": true
            },
            "ratings": {
                "list": false,
            },
            "notifications": {
                "add": false
            },
            "orders": {
                "management": false,
                "print":false,
                "report":false
                
            },
            "supplier-orders": {
                "list": true,
                "new": false,
                "edit": false,
                "report":false
            }
        }
    }

    cheachRole(first, seconde) {
        var clientType = localStorage.getItem('clientType')
        return this.roles[clientType][first][seconde]
    }
}
