import {Component, OnInit} from '@angular/core';
import {RateHandlerService} from '../rate-handler.service';
import {Area} from '../../areas/area';

@Component({
    selector: 'app-rates-list',
    templateUrl: './rates-list.component.html',
    styleUrls: ['./rates-list.component.css']
})
export class RatesListComponent implements OnInit {
    ratings: any[];
    areas: Area[];
    returnedArray = [];
    spinnerFlag: boolean;

    constructor(private Handler: RateHandlerService) {
        this.spinnerFlag = true;
        this.getAllRatings();
    }

    processRate(Id) {

    }

    filterByfield(set: any[], field: string, value: string) {

        let f = set.filter(it => it.user[field].toLowerCase().includes(value));

        return f;
    }

    filterBox(event) {
        let value = event.target.value;
        this.returnedArray = this.ratings;
        let as: any[] = [];
        let fields = ['username', 'areaId'];
        for (let field of fields) {
            for (let t of this.filterByfield(this.returnedArray, field, value)) {
                if (!as.includes(t)) {
                    as.push(t);
                }
            }
        }
        this.returnedArray = as;
    }

    getAllRatings() {
        this.Handler.getAllAreas().subscribe(as => {
            this.areas = as;
            this.Handler.getAllRatings().subscribe(data => {
                this.ratings = data;
                for (let r of data) {
                    if (r.user != undefined) {
                        if (r.user.areaId != undefined) {
                            r.user.areaId = this.areas.find(x => x.id === r.user.areaId).nameAr;
                        }
                    }
                    this.returnedArray.push(r);

                }
                this.ratings = this.returnedArray;
                this.spinnerFlag = false;

            });
        });
    }

    ngOnInit() {
    }

}