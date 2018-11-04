import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../services/api.service';
import {Observable} from 'rxjs/Observable';
import {TranslateService} from '@ngx-translate/core';
import {ConstService} from '../../../services/const.service';
import {Router} from '@angular/router';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-add-manufacturer',
  templateUrl: './add-manufacturer.component.html',
  styleUrls: ['./add-manufacturer.component.css']
})
export class AddManufacturerComponent implements OnInit {
  manufacturerForm: FormGroup;
  submitted:boolean=false;
  // click:boolean=true:
  addManufactur(){
    this.submitted=true;
    let hasError:boolean;
    for (var key in this.manufacturerForm.controls) {
      // check if the property/key is defined in the object itself, not in parent
      if (this.manufacturerForm.controls.hasOwnProperty(key)) {
        if (this.manufacturerForm.controls[key].invalid){
          hasError=true;
          break;
        }
        // console.log(key, this.manufacturerForm.controls[key]);
      }
    }

    if(!hasError){
      this.api.post('/manufacturers',this.manufacturerForm.value,{}).subscribe((res)=>{
        if(res.status==200){
          console.log(res);
          this.router.navigate(['manufacturers','view'])
        }else{
          alert(res.statusText);
        }

      });
        // .map(success => success.status)
        // .catch((err:Response) => {console.log(err); return Observable.throw(err.status)});
    }else{
      alert(this.c.translateUtterance("Manufactures.errorInForm"));
    }
  }
  constructor(private c :ConstService, private router:Router, private api:ApiService, public translate:TranslateService) { }

  ngOnInit() {
    this.manufacturerForm= new FormGroup({
        nameAr:new FormControl('', [Validators.required,]),
        nameEn:new FormControl('', [Validators.required,]),
    }
    )
  }

}

