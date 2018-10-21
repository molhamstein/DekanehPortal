import { Component, OnInit, forwardRef, Input, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { setYear, setMonth, setDate } from 'date-fns';

@Component({
  selector: 'date-picker-component',
  templateUrl: './date-picker-component.component.html',
  styleUrls: ['./date-picker-component.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePickerComponentComponent),
    multi: true
  }]
})
export class DatePickerComponentComponent implements OnInit,ControlValueAccessor {

  constructor(private cdr: ChangeDetectorRef) { }
  currentDate:NgbDateStruct;

  writeValue(obj: any): void {
    var t= new Date(obj)
    this.currentDate={day:t.getDay(),month:t.getMonth(),year:t.getFullYear()}
    
    this.cdr.detectChanges()
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }


  onChange = (values) => {};


  onTouched = () => {};
  ngOnInit() {
  }
  changed(){
    
    const newDate: Date = setYear(
      setMonth(
        setDate(null, this.currentDate.day),
        this.currentDate.month - 1
      ),
      this.currentDate.year
    );
    this.onChange(newDate)
  }

}
