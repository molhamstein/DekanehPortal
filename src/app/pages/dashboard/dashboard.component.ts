import { ConstService } from './../../services/const.service';
import { AlertService } from './../../services/alert.service';
import { Component, OnInit } from '@angular/core';
import '../../../assets/charts/amchart/amcharts';
import '../../../assets/charts/amchart/gauge.js';
import '../../../assets/charts/amchart/pie.js';
import '../../../assets/charts/amchart/serial.js';
import '../../../assets/charts/amchart/light.js';
import '../../../assets/charts/amchart/ammap.js';
import '../../../assets/charts/amchart/worldLow.js';
import { DashboardHandlerService } from './dashboard-handler.service';

declare const AmCharts: any;
declare const $: any;


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    constructor(private handler: DashboardHandlerService, private alert: AlertService, public c: ConstService
    ) {
        this.getWarehouseStatistics();
        this.getOrderStatistics()
    }
    WarehouseStatistics = {}
    orderStatistics = {}

    getTimer(date) {
        let nowDate = new Date().getTime();

        let time = ((new Date(date).getTime() + 60 * 60 * 24 * 1000) - nowDate) / (60 * 60 * 1000);
        if (time > 0) {
            let hours = Math.floor(time);
            let minuets = Math.floor((time - hours) * 60);
            return minuets + ' : ' + hours;

        } else return undefined;
    }

    getWarehouseStatistics() {
        this.handler.getWarehouseStatistics()
            .subscribe(data => {
                this.WarehouseStatistics = data
            }
                , errorCode => this.showError());


    }
    getOrderStatistics() {
        this.handler.getOrderStatistics()
            .subscribe(data => {
                this.orderStatistics = data
            }
                , errorCode => this.showError());


    }
    showError() {
        this.alert.showToast.next({ type: 'error' });
    }

    ngOnInit() {

    }

}
