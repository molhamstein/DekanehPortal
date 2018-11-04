import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {json} from 'ng2-validation/dist/json';
import {ConstService} from '../../../services/const.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view-manufacturers',
  templateUrl: './view-manufacturers.component.html',
  styleUrls: ['./view-manufacturers.component.css']
})
export class ViewManufacturersComponent implements OnInit {

  data:any[];
  constructor(private  api:ApiService,private router:Router, private constants:ConstService) {
      this.api.get("/manufacturers").subscribe((data:any)=>{
        if(data.status==200)
          this.data=JSON.parse(data._body);
        else
          console.log(data.statusText);
      });
  }
  editManufacturer(item){
    this.router.navigate(['manufacturers',item.id,'edit'])
  }
  deleteManufacturer(item){
    this.api.delete('/manufacturers',item.id).subscribe((res:any)=>{
      if(res.status==200){
        // alert("success");
        this.api.get("/manufacturers").subscribe((data:any)=>{
          if(data.status==200){
            this.data=JSON.parse(data._body);
            this.data=[...this.data];
          }
          else
            console.log(data.statusText);
        });
      }

      else
        alert("error in deletion");
    });

  }
  ngOnInit() {
  }

}
