import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-view-orders',
    templateUrl: './view-orders.component.html',
    styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {

    data: any[];
    tempDate: any;
    tableData: any[] = [];
    rowsOnPage = 2;

    constructor(private api: ApiService, private datePipe: DatePipe) {

        this.api.get('/orders?filter={"order":"orderDate DESC"}').subscribe((res: any) => {
            if (res.status == 200) {
                this.data = JSON.parse(res._body);
                if (this.data.length != 0) {

                    this.tempDate = new Date(this.data[0].orderDate);
                    var temp = {
                        date: {},
                        orderData: []
                    };
                    temp.date = this.datePipe.transform(this.tempDate, 'MMM d, y');
                    for (let index = 0; index < this.data.length; index++) {
                        var typeDate = new Date(this.data[index].orderDate);
                        if (typeDate.getDate() != this.tempDate.getDate()) {
                            this.tableData.push(temp);
                            this.tempDate = typeDate;
                            temp = {date: {}, orderData: []};
                            temp.date = this.datePipe.transform(this.tempDate, 'MMM d, y');
                            temp.orderData.push(this.data[index]);
                        } else {
                            temp.orderData.push(this.data[index]);
                        }
                    }
                    this.tableData.push(temp);
                    temp = {date: {}, orderData: []};
                    console.log(this.tableData);
                }
            } else
                console.log(res.statusText);
        });

    }

    ngOnInit() {
    }

}
