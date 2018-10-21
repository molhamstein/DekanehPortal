import {Component, Input, OnInit, Output,EventEmitter} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {FieldService} from "../field.service";

@Component({
  selector: 'my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.scss']
})
export class MyFormComponent implements OnInit {
  @Input() isUpdate=false;
  @Input() fields=[];
  @Input() values={};
  @Output('formSubmit') submit=new EventEmitter();
  isSubmited=false;
  isMultiple=false;
  @Output() valueChanged=new EventEmitter()
  constructor(private fieldService:FieldService) { }
  show(field)
  {
   if(this.isUpdate)
   {
     return this.fieldService.isUpdateable(field);
   }
    return this.fieldService.isCreateable(field);
  }
  form:FormGroup;
  ngOnInit() {
    var control={};
    for(var i=0;i<this.fields.length;i++)
    if(this.show(this.fields[i]))
    {
        var temp=[];
        for(var j=0;j<this.fields[i].validators.length;j++)
        {
          temp.push(this.fields[i].validators[j].validator)
        }
        if(this.values)
        {
          if(this.fields[i].type=='checkbox')
            control[this.fields[i].name]=new FormControl(this.values[this.fields[i].name]!='0',Validators.compose(temp));
          else
            control[this.fields[i].name]=new FormControl(this.values[this.fields[i].name],Validators.compose(temp));

        }
        else{
          var t =null;
          if(this.fields[i].type=='checkbox')
            t=false
            control[this.fields[i].name]=new FormControl(t,Validators.compose(temp));
        }
    }
    this.form=new FormGroup(control);
    this.form.valueChanges.subscribe(()=>this.valueChanged.emit(this.form))
  }
  ngOnChanges()
  {
    this.ngOnInit();
  }
  onSubmit(){
    if (this.form.invalid && !this.isSubmited)
    {
      for(var i=0;i<this.fields.length;i++) {
        if (this.show(this.fields[i])) {
          this.form.controls[this.fields[i]['name']].markAsTouched();
        }
      }
      this.form.markAsTouched({onlySelf:true});
    }
    this.isSubmited=true
    if (this.form.invalid)
      return;

    this.submit.emit({data:{...this.form.value},isMultiple:this.isMultiple});
  }

}
