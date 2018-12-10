import {Component, OnInit} from '@angular/core';
import {OrdersHandlerService} from '../orders-handler.service';

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

    constructor(private api: OrdersHandlerService) {
        this.api.getOrdersCount().subscribe(d => this.totalCount = d['count']);
        this.api.getSucceededOrdersCount().subscribe(d => this.sucCount = d['count']);
        this.api.getNewOrdersCount().subscribe(d => this.newCount = d['count']);
        this.api.getInDeliveryOrdersCount().subscribe(d => this.inDCount = d['count']);

    }

    ngOnInit() {
    }

}
