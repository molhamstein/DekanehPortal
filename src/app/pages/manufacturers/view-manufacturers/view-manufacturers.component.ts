import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view-manufacturers',
  templateUrl: './view-manufacturers.component.html',
  styleUrls: ['./view-manufacturers.component.css']
})
export class ViewManufacturersComponent implements OnInit {

  data:any[];
  constructor(private api:ApiService, private router:Router) {
    this.api.get("/manufacturers").subscribe(
      (data:any)=>{
        this.data=JSON.parse(data._body);

      })
  }
  navigateTo(path){
    this.router.navigate([path])
  }
  ngOnInit() {
  }

}
