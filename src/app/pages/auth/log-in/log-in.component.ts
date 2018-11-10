import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {ApiService} from '../../../services/api.service';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) {
  }

  ngOnInit() {
  }
  logIn(form){
    this.api.post('/users/staffLogin', form.value).subscribe((data) => {
      localStorage.setItem('token',JSON.parse(data['_body']).id);
      this.router.navigate(['']);
    },(err)=>{
      console.log("ERR")
    });
  }

}
