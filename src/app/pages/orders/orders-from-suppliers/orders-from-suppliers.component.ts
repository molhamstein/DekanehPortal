import {Component, OnInit} from '@angular/core';
import {SuppliersService} from './suppliers.service';
import {IOption} from 'ng-select';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-orders-from-suppliers',
  templateUrl: './orders-from-suppliers.component.html',
  styleUrls: ['./orders-from-suppliers.component.css']
})
export class OrdersFromSuppliersComponent implements OnInit {
  supplierToFilter = '';
  OFS = [];
  todayOFS = {data: [], total: 0};
  IOSuppliers: Array<IOption> = [];

  getTodayOrders() {
    this.Handler.getTodayOFS().subscribe(data => this.todayOFS = data);
  }

  getOrders() {
    this.Handler.getOedersFromSuppliers().subscribe(data => this.OFS = data);
  }

  setArchive() {
    this.Handler.archiveAll().finally(() => this.router.navigate(['/orders/from-supplier'])
    ).subscribe(data => data);
  }

  constructor(private Handler: SuppliersService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });

  }

  ngOnInit() {
    this.getOrders();
    this.getTodayOrders();
  }

}
