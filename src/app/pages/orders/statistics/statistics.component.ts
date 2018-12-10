import {Component, OnInit} from '@angular/core';
import {OrdersHandlerService} from '../orders-handler.service';
import {AlertService} from '../../../services/alert.service';

@Component({
    selector: 'app-orders-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
    totalCount = 0;
    sucCount = 0;
    newCount = 0;
    inDCount = 0;

    constructor(private api: OrdersHandlerService,private alert:AlertService) {

    }

    showError() {
        this.alert.showToast.next({type: 'error'});
    }
    ngOnInit() {
        this.api.getOrdersCount().subscribe(d => this.totalCount = d['count'],errorCode => this.showError());
        this.api.getSucceededOrdersCount().subscribe(d => this.sucCount = d['count'],errorCode => this.showError());
        this.api.getNewOrdersCount().subscribe(d => this.newCount = d['count'],errorCode => this.showError());
        this.api.getInDeliveryOrdersCount().subscribe(d => this.inDCount = d['count'],errorCode => this.showError());

    }

}
