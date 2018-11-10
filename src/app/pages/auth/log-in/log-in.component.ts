import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private http:Http,private router:Router) { }

  ngOnInit() {
  }
  logIn(form){
    this.http.post('http://167.99.214.78/api/users/staffLogin', form.value).subscribe((data) => {
      localStorage.setItem('token',JSON.parse(data['_body']).id);
      this.router.navigate(['']);
    },(err)=>{
      console.log("ERR")
    });
  }

}
