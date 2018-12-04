import {Component, OnInit} from '@angular/core';
import '../../../assets/charts/amchart/amcharts';
import '../../../assets/charts/amchart/gauge.js';
import '../../../assets/charts/amchart/pie.js';
import '../../../assets/charts/amchart/serial.js';
import '../../../assets/charts/amchart/light.js';
import '../../../assets/charts/amchart/ammap.js';
import '../../../assets/charts/amchart/worldLow.js';

declare const AmCharts: any;
declare const $: any;


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        AmCharts.makeChart('invoice', {
            'type': 'pie',
            'hideCredits': true,
            'theme': 'light',
            'dataProvider': [{
                'country': 'Lithuania',
                'color': '#93BE52',
                'value': 260
            }, {
                'country': 'Ireland',
                'color': '#4680ff',
                'value': 201
            }, {
                'country': 'Germany',
                'color': '#FC6180',
                'value': 65
            }, {
                'country': 'Australia',
                'color': '#FFB64D',
                'value': 39
            }],
            'valueField': 'value',
            'titleField': 'country',
            'labelsEnabled': false,
            'colorField': 'color',
            'innerRadius': '50%',
            'outlineAlpha': 0.9,
            'depth3D': 0,
            'balloonText': '[[title]]<br><span style="font-size:14px"><b>[[value]]</b> ([[percents]]%)</span>',
            'angle': 0,
        });

        AmCharts.makeChart('statestics-chart', {
            type: 'serial',
            marginTop: 0,
            hideCredits: true,
            marginRight: 0,
            dataProvider: [{
                year: 'Jan',
                value: 0.98
            }, {
                year: 'Feb',
                value: 1.87
            }, {
                year: 'Mar',
                value: 0.97
            }, {
                year: 'Apr',
                value: 1.64
            }, {
                year: 'May',
                value: 0.4
            }, {
                year: 'Jun',
                value: 2.9
            }, {
                year: 'Jul',
                value: 5.2
            }, {
                year: 'Aug',
                value: 0.77
            }, {
                year: 'Sap',
                value: 3.1
            }],
            valueAxes: [{
                axisAlpha: 0,
                dashLength: 6,
                gridAlpha: 0.1,
                position: 'left'
            }],
            graphs: [{
                id: 'g1',
                bullet: 'round',
                bulletSize: 9,
                lineColor: '#4680ff',
                lineThickness: 2,
                negativeLineColor: '#4680ff',
                type: 'smoothedLine',
                valueField: 'value'
            }],
            chartCursor: {
                cursorAlpha: 0,
                valueLineEnabled: false,
                valueLineBalloonEnabled: true,
                valueLineAlpha: false,
                color: '#fff',
                cursorColor: '#FC6180',
                fullWidth: true
            },
            categoryField: 'year',
            categoryAxis: {
                gridAlpha: 0,
                axisAlpha: 0,
                fillAlpha: 1,
                fillColor: '#FAFAFA',
                minorGridAlpha: 0,
                minorGridEnabled: true
            },
            'export': {
                enabled: true
            }
        });
    }

}
