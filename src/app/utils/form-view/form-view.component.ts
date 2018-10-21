import {Component, Input, OnInit} from '@angular/core';
import {HttpParams} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MainService} from "../main.service";
import {field} from "../field.model";
import {FieldService} from "../field.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.scss'],
  exportAs:'formView'
})
export class FormViewComponent implements OnInit {
  constructor(private api:MainService,private router:Router,
              private route:ActivatedRoute,private fieldService:FieldService,private toastr:ToastrService) {
    this.id=this.route.snapshot.paramMap.get('id')
  }
  fields:field[];
  values;
  private id;
  @Input() idProperty='un_id';
  @Input() apiName='unit';
  @Input() fieldIndex;
  isUpdate=false;
  @Input() afterGet=(data)=>{return data};
  @Input() beforePost=(data)=>{return data};
  @Input() withFile=false;
  @Input() defaultValue
  @Input() navigateAfterPostTo
  show(field)
  {
    if(this.isUpdate)
    {
      return this.fieldService.isUpdateable(field);
    }
    return this.fieldService.isCreateable(field);
  }
  ngOnInit() {
    if(this.defaultValue)
    {
      this.values=this.defaultValue
    }
    if(!this.fieldIndex)
      this.fieldIndex=this.apiName
    if(this.id)
    {
      this.isUpdate=true;

      this.route.params.subscribe((params)=>{
          var t=new HttpParams();
          t=t.set('id',params['id']);
          this.api.get(this.apiName,t).subscribe((data)=>{
            this.values=this.afterGet(data['data'][0]);

          })
      })

    }
    this.fields=this.api.getFields(this.fieldIndex);
  }
  onSubmit(res){
    var data=this.beforePost(res['data']);
    var isMultiple=res['isMultiple'];
    var fd =new FormData();
    if(this.withFile)
    {
      for(var i=0;i<this.fields.length;i++)
        if(this.show(this.fields[i]))
        {
          if(this.fields[i].type=='file')
            fd.set(this.fields[i].name,data[this.fields[i].name],data[this.fields[i].name]['name'])
          else
            fd.set(this.fields[i].name,data[this.fields[i].name])
        }
    }
    else{
      fd=data;
    }


    if(this.id)
    {
      data[this.idProperty]=this.id;
      this.api.put(this.apiName,fd).subscribe(()=>{
        this.router.navigate(['../'],{relativeTo:this.route})
        this.toastr.success("updated successfully",'update')

      })
    }
    else
      this.api.post(this.apiName,fd).subscribe(()=>{
        this.toastr.success("added successfully",'add')
        if(!isMultiple)
        {
          if(this.navigateAfterPostTo)
            this.router.navigateByUrl(this.navigateAfterPostTo)
          else
            this.router.navigate(['../'],{relativeTo:this.route})

        }
        else
          this.ngOnInit()
      })
  }

}
