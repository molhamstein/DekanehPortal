import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {

  constructor() { }
  @Input() validators:any[];
  @Input() control;
  ngOnInit() {
    // console.log(this.validators);
    console.log(this.control);
  }

}
