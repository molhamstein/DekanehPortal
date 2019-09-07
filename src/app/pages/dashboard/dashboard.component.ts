import { AbstractProductHandler } from './../abstract-products/abstract-product-handler';
import { IOption } from 'ng-select';
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
import { TransfereService } from '../../services/transfere.service';
import { Router } from '@angular/router';
import '../../../assets/charts/echart/echarts-all.js';

declare const AmCharts: any;
declare const $: any;


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    constructor(private handler: DashboardHandlerService, private productabsHandeler: AbstractProductHandler, private router: Router, private transferSer: TransfereService, private alert: AlertService, public c: ConstService
    ) {
        this.getWarehouseStatistics();
        this.getOrderStatistics()
    }
    WarehouseStatistics = {}
    orderStatistics = {}
    fromFilter
    toFilter
    gotToReport(type) {
        this.transferSer.setData({ "type": type })
        this.router.navigate(['/reports/warning']);
    }
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

    getwarehouseProductsDaily() {
        console.log("this.abstractProductIds")
        console.log(this.abstractProductIds)
        console.log("this.fromFilter")
        console.log(this.fromFilter)
        console.log("this.toFilter")
        console.log(this.toFilter)
        this.handler.getwarehouseProductsDaily(this.abstractProductIds, this.fromFilter, this.toFilter)
            .subscribe(data => {
                let days = []
                let costs = []
                let counts = []
                for (let index = 0; index < data.length; index++) {
                    const element = data[index];
                    days.push(element._id.day + "-" + element._id.month + "-" + element._id.year)
                    costs.push(element.cost / 100)
                    counts.push(element.count)
                    if (index + 1 == data.length) {
                        setTimeout(() => {
                            this.lineChartOption = {
                                tooltip: {
                                    trigger: 'axis'
                                },
                                legend: {
                                    data: ['cost', 'count']
                                },
                                toolbox: {
                                    show: false,
                                    feature: {
                                        mark: { show: true },
                                        dataView: { show: true, readOnly: false },
                                        magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                                        restore: { show: true },
                                        saveAsImage: { show: true }
                                    }
                                },
                                calculable: true,
                                xAxis: [
                                    {
                                        type: 'category',
                                        splitLine: {
                                            show: false
                                        },
                                        boundaryGap: false,
                                        data: days
                                    }
                                ],
                                color: ['rgba(165, 255, 222, 0.95)', 'rgba(26, 188, 156, 0.39)'],
                                yAxis: [{
                                    type: 'value',
                                    splitLine: {
                                        show: false
                                    }
                                }],
                                series: [
                                    {
                                        name: 'cost',
                                        type: 'line',
                                        smooth: true,
                                        itemStyle: { normal: { areaStyle: { type: 'macarons' } } },
                                        data: costs
                                    }, {
                                        name: 'count',
                                        type: 'line',
                                        smooth: true,
                                        itemStyle: { normal: { areaStyle: { type: 'macarons' } } },
                                        data: counts
                                    },
                                ]
                            };
                        }, 1);

                    }
                }
            }
                , errorCode => this.showError());


    }


    showError() {
        this.alert.showToast.next({ type: 'error' });
    }
    lineChartOption: any;
    IOAbstractProd: Array<IOption> = [];
    abstractProductIds = []
    abstract = []
    t = []
    searchAbstract(str) {
        // this.abstract = []
        // this.t = [];
        if (str != '') {
            this.productabsHandeler.search(str)
                .subscribe(data => {
                    for (let offer of data) {
                        // alert(this.abstractProductIds.includes(offer.id))
                        if (this.abstractProductIds.includes(offer.id) == false) {
                            this.t.push({ label: offer.nameAr, value: offer.id });
                            this.abstract.push({ label: offer.nameAr, value: offer.id, media: offer.media })
                        }
                    }
                    setTimeout(() => {
                        this.IOAbstractProd = this.t;
                    }, 100);
                }
                    , errorCode => this.showError());
        }

    }

    ngOnInit() {
        this.getwarehouseProductsDaily()
    }



}
