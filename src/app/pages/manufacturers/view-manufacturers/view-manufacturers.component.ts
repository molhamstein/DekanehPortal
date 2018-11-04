import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {json} from 'ng2-validation/dist/json';

@Component({
  selector: 'app-view-manufacturers',
  templateUrl: './view-manufacturers.component.html',
  styleUrls: ['./view-manufacturers.component.css']
})
export class ViewManufacturersComponent implements OnInit {

  data:any[];
  constructor(private  api:ApiService) {
      this.api.get("/manufacturers").subscribe((data:any)=>{
        if(data.status==200)
          this.data=JSON.parse(data._body);
        else
          console.log(data.statusText);
      })
  }

  ngOnInit() {
  }

}
