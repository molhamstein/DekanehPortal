import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MainService} from "../main.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpParams} from "@angular/common/http";
// import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'table-view',
  templateUrl: './table-view.component.html',
  exportAs:'view'
})
export class TableViewComponent implements OnInit {
  actions;
  rows;
  cols;
  page=1;
  pageSize=10;
  numberOfRows=30;
  showPages=false;

  @Input('afterGet')afterGet=(data)=>{return data}
  @Input() titleProperty;
  @Input() title;
  @Input() addActions;
  @Output('actionEmitter') actionEmitter=new EventEmitter()
  @Input() idProperty;
  @Input() apiName;
  @Input() search=[{name:'name',Title:'Name'}]
  @Input() query
  @Input() createUrl
  @Input() createPri
  @Input() deletePri
  @Input() updatePri

  modalTilte;
  @ViewChild('content') private content;
  constructor(private modalService: NgbModal,private api:MainService,private router:Router,private route:ActivatedRoute,/**private toastr:ToastrService**/) {
    var actionEmitter=this.actionEmitter;
    this.actions=[{class:'ion-edit', fun:this.onUpdate(),title:'Edit'},
      {class:'ion-ios-trash', fun:this.onDelete(),title:'Delete'}];
  }
  private onDelete()
  {
    var self=this;
    return function (row) {
      self.modalTilte=row[self.titleProperty];
      self.modalService.open(self.content).result.then((result) => {
        if(result)
        {
          var t={row:row,event:'delete'};
          self.actionEmitter.emit(t)
        }
      }, (reason) => {})
    };

  }
  private onUpdate()
  {
    var self=this;
    return function (row) {
      var t={row:row,event:'edit'};
      self.actionEmitter.emit(t);
    };

  }
  ngOnInit() {
    var actions=[]
    // if(this.updatePri && this.privilege.isAuthorized(this.updatePri) || !this.updatePri)
    //   actions.push(this.actions[0])
    // if(this.deletePri && this.privilege.isAuthorized(this.deletePri) || !this.deletePri)
    //   actions.push(this.actions[1])

    this.actions=actions
    if(this.addActions){
      this.actions=[...this.actions,...this.addActions];
    }
    this.cols=this.api.getFields(this.apiName);
    this.changePage(1);
  }
  onAction(data){
    var id=data.row[this.idProperty];
    if(data.event==='delete')
    {
      this.api.delete(this.apiName+'/'+this.apiName,id).subscribe(()=>{
        // this.toastr.warning('deleted successfuly' ,'delete')
        this.changePage(this.page);
      });
    }
    if(data.event==='edit')
    {

      this.router.navigate(['edit',id],{ relativeTo: this.route })
    }

  }
  changePage(number){
    var t=new HttpParams();
    for(var i=0;i<this.search.length;i++)
      if(this.search[i]['value'])
      {
        t=t.set(this.search[i]['name'],this.search[i]['value']);
      }
    if(this.query)
    {
      Object.keys(this.query).forEach((key)=>{
        t=t.set(key,this.query[key]);
      })
    }
    t=t.set('count',this.pageSize.toString());
    t=t.set('start',(this.pageSize*(number-1)).toString());
    this.api.get(this.apiName,t).subscribe(
      data => {
        this.rows=data["data"];
        this.rows=this.afterGet(this.rows)
        this.numberOfRows=data['count'];
        this.showPages=false;
        if(this.numberOfRows/this.pageSize > 1)
          this.showPages=true;

      });
  }
  onSearch(){
    this.changePage(1);
  }
  goToCreate(){
    if(!this.createUrl)
      this.router.navigate(['create'],{ relativeTo: this.route })
    else
      this.router.navigate(this.createUrl)
  }
}
