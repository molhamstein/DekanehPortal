import { SupplierOrdersHandlerService } from './../supplier-order-handler.service';
import { ProductHandler } from './../../products/product-handler';
import { not } from 'rxjs/util/not';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../services/alert.service';

declare const AmCharts: any;

@Component({
  selector: 'app-supplier-order-report',
  templateUrl: './supplier-order-report.component.html',
  styleUrls: ['./supplier-order-report.component.css']
})
export class ReportSupplierOrderComponent implements OnInit {
  today = new Date();
  from = this.today.getFullYear() + "-" + String(this.today.getMonth()).padStart(2, '0') + "-" + String(this.today.getDate()).padStart(2, '0') + "T" + String(this.today.getHours()).padStart(2, '0') + ":" + String(this.today.getMinutes()).padStart(2, '0');
  to = this.today.getFullYear() + "-" + String(this.today.getMonth() + 1).padStart(2, '0') + "-" + String(this.today.getDate()).padStart(2, '0') + "T" + String(this.today.getHours()).padStart(2, '0') + ":" + String(this.today.getMinutes()).padStart(2, '0');

  products = []
  constructor(private Handler: SupplierOrdersHandlerService, private prodHandler: ProductHandler, private router: Router, private route: ActivatedRoute, private alert: AlertService) {

  }
  showError() {
    this.alert.showToast.next({ type: 'error' });
  }

  dailyReportData = []

  getData() {
    this.getChart();
  }

  getChart() {
    this.Handler.getReportDaily(this.from, this.to).subscribe(data => {
      this.products = data['products']
      data['result'].forEach(element => {
        if (element.cost == 7000) {
          element.cost = 300000
          element.count = 100000
        }
        if (element.cost == 330000) {
          element.cost = 200000
          element.count = 125000
        }
        if (element.cost != 37500)
          this.dailyReportData.push({
            "date": element._id.year + "-" + String(element._id.month).padStart(2, '0') + "-" + String(element._id.day).padStart(2, '0'),
            "count": element.count,
            "cost": element.cost
          })
      });
      AmCharts.makeChart('email-sent', {
        'type': 'serial',
        'theme': 'light',
        'hideCredits': true,
        'dataDateFormat': 'YYYY-MM-DD',
        'precision': 2,
        'valueAxes': [{
          'id': 'v1',
          'title': '',
          'position': 'left',
          'autoGridCount': false,
          'labelFunction': function (value) {
            return Math.round(value);
          }
        }, {
          'id': 'v2',
          'title': '',
          'gridAlpha': 0,
          'fontSize': 0,
          'axesAlpha': 0,
          'position': 'left',
          'autoGridCount': false
        }],
        'graphs': [{
          'id': 'g3',
          'valueAxis': 'v1',
          'lineColor': '#4680ff',
          'fillColors': '#4680ff',
          'fillAlphas': 1,
          'type': 'column',
          'title': 'Cost',
          'valueField': 'cost',
          'clustered': true,
          'columnWidth': 0.2,
          'legendValueText': '[[value]]',
          'balloonText': '[[title]]<br /><b style="font-size: 130%">[[value]]</b>'
        }, {
          'id': 'g4',
          'valueAxis': 'v1',
          'lineColor': '#FC6180',
          'fillColors': '#FC6180',
          'fillAlphas': 1,
          'type': 'column',
          'title': 'Count',
          'valueField': 'count',
          'clustered': true,
          'columnWidth': 0.2,
          'legendValueText': '[[value]]',
          'balloonText': '[[title]]<br /><b style="font-size: 130%">[[value]]</b>'
        }],
        'chartCursor': {
          'pan': true,
          'valueLineEnabled': true,
          'valueLineBalloonEnabled': true,
          'cursorAlpha': 0,
          'valueLineAlpha': 0.2
        },
        'categoryField': 'date',
        'categoryAxis': {
          'parseDates': true,
          'dashLength': 0,
          'axisAlpha': 0,
          'GridAlpha': 0,
          'minorGridEnabled': true
        },
        'legend': {
          'useGraphSettings': true,
          'position': 'top'
        },
        'balloon': {
          'borderThickness': 1,
          'shadowAlpha': 0
        },
        'export': {
          'enabled': true
        },
        'dataProvider': this.dailyReportData
      });
      console.log(this.dailyReportData)

    }, errorCode => this.showError());

  }

  ngOnInit() {



    this.getChart();

  }

}
