import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {field} from "./field.model";
import { Validators} from "@angular/forms";
import { environment} from "../../../../workflow/src/environments/environment";
import {myValidators} from "./my.validators"


@Injectable()
export class MainService {
  api=environment.api;
  header=new HttpHeaders();
  constructor(private http: HttpClient) {
    if(localStorage.getItem('token'))
      this.header=this.header.set('authorization',localStorage.getItem('token'));
    else {

    }
  }

  // Uses http.get() to load data from a single API endpoint
  get(name,params?:HttpParams) {

    if(params){
      return this.http.get(this.api+name,{params:params,headers:this.header});
    }
    return this.http.get(this.api+name,{params:params,headers:this.header});

  }
  post(name,data) {
    return this.http.post(this.api+name,data,{headers:this.header});
  }
  put(name,data) {
    return this.http.put(this.api+name,data,{headers:this.header});
  }
  delete(name,id) {
    return this.http.delete(this.api+name+'\\'+id,{headers:this.header});
  }

  selectOneRowValidator(control){
   if(control.value && control.value.length>0)
     return null;

   return {oneRow:true};

  }
  selectRowDataRequired(name,title){

    return (control)=>{
      var name1=name;
      var title1=title;
      if(!control.value)
        return null;
      for(var i=0;i<control.value.length;i++)
      {
        if(!control.value[i][name1])
        {
          var err={};
          err[name]={message:'field '+title1+' in row number '+(i+1)+' is Required'};
          return err;
        }
      }
      return null;
    };

  }
  getFields(name) {
    var fields={};

    fields["area"]=[
      { name: 'ar_name' ,title:'Managment.areas.ar_name' ,type:'text',crud:'crud',validators:[]},
      { name: 'ar_display_name',title:'Managment.areas.ar_display_name',type:'text',crud:'crud',validators:[]},
      { name: 'ar_report',title: 'Managment.areas.ar_report',type:'checkbox',crud:'crud',validators:[] }
    ];
    fields["city"]= [
      { name: 'city_name' ,title:'Managment.cities.city_name' ,type:'text',crud:'crud',validators:
          [ {message:"Managment.cities.message",validator:Validators.required,name:"required"},]}          ,
      { name: 'city_des',title:'Managment.cities.city_des',type:'text',crud:'crud',validators:[]},
      { name: 'city_is_rural',title: 'Managment.cities.city_is_rural',type:'checkbox',crud:'crud',validators:[] }
    ];
    fields["visitType"]= [
      { name: 'type',title: 'Managment.visitType.type',type:'text',crud:'crud',validators:[] },
      { name: 'process_id',title: 'Managment.visitType.process_id',type:'number',crud:'cud',validators:[] },
      { name: 'has_semi_checklist',title: 'Managment.visitType.has_semi_checklist',type:'checkbox',crud:'crud',validators:[] },
    ];
    fields["unit"]= [
      { name: 'un_name',title: 'Managment.units.un_name',type:'text',crud:'crud',validators:[] },
    ];

    fields["power"]= [
      { name: 'name',title: 'Managment.power.name',type:'text',crud:'crud',validators:[] },
      { name: 'product_barcode',title: 'Managment.power.product_barcode',type:'text',crud:'crud',validators:[] },
      { name: 'netype_name',title: 'Managment.power.netype_name',type:'text',crud:'r',validators:[] },
      // { name: 'typeCode',title: 'Type Code',type:'text',crud:'r',validators:[] },
      // { name: 'shortname',title: 'Short Name',type:'text',crud:'r',validators:[] },
      // { name: 'description',title: 'description',type:'text',crud:'r',validators:[] },
      { name: 'netype_id',title: 'Managment.power.netype_id',type:'selectApi',crud:'cu',apiName:'NEType',label:'typeName',value:'id',
        validators:[{message:"Managment.power.message",validator:Validators.required,name:"required"},]
      }
    ];
    fields["SitePower"]= [
      { name: 'name',title: 'Managment.SitePower.name',type:'text',crud:'crud',validators:[] },
      { name: 'product_barcode',title: 'Managment.SitePower.product_barcode',type:'text',crud:'crud',validators:[] },
      { name: 'netype_name',title: 'Managment.SitePower.netype_name',type:'text',crud:'r',validators:[] },
      // { name: 'typeCode',title: 'Type Code',type:'text',crud:'r',validators:[] },
      // { name: 'shortname',title: 'Short Name',type:'text',crud:'r',validators:[] },
      // { name: 'description',title: 'description',type:'text',crud:'r',validators:[] },
      { name: 'netype_id',title: 'Managment.SitePower.netype_id',type:'selectApi',crud:'cu',apiName:'NEType',label:'typeName',value:'id',
        validators:[{message:"Managment.SitePower.message",validator:Validators.required,name:"required"},]
      }
    ];

    fields["rules"]= [
     { name: 'name',title: 'Managment.rules.name',type:'text',crud:'r',validators:[] },
      { name: 'checklist_section_attr_id',title: 'Managment.rules.checklist_section_attr_id',type:'selectApi',crud:'cu',validators:[] ,apiName:'checklist_attr',label:'name',value:'id',recordLabel:'attr_name'},
      { name: 'value',title: 'Managment.rules.message',type:'text',crud:'crud',
        validators:[
          {name:"rulesValidator",validator:myValidators.rulesValidator(),message:""},
          ]
      },
      { name: 'type',title: 'Managment.rules.type',type:'selectApi',crud:'crud',label:'type',value:'type',
        items:[
          {type:'>'},
          {type:'<'},
          {type:'>='},
          {type:'<='},
          {type:'='},
          {type:'=='},
          {type:'between'},
          {type:'is_sparepart'},
          {type:'is_runningHours'},
          {type:'fuel_levels'},
        ],
        validators:[
          {message:"Managment.rules.message",validator:Validators.required,name:"required"},
          {name:"rulesValidator",validator:myValidators.rulesValidator('value',false),message:""},
        ]
      }
    ];

    fields["spareparts_type"]= [
      { name: 'name',title: 'Managment.spareparts_type.name',type:'text',crud:'crud',validators:[] },
      { name: 'is_periodical',title: 'Managment.spareparts_type.is_periodical',type:'checkbox',crud:'crud',validators:[] },
      { name: 'warning_sign',title: 'Managment.spareparts_type.warning_sign',type:'text',crud:'crud',validators:[] },
      { name: 'error_sign',title: 'Managment.spareparts_type.error_sign',type:'text',crud:'crud',validators:[] },
      // { name: 'typeCode',title: 'Type Code',type:'text',crud:'r',validators:[] },
      // { name: 'shortname',title: 'Short Name',type:'text',crud:'r',validators:[] },
    ];

    fields["spareparts"]= [
      { name: 'name',title: 'Managment.spareparts.name',type:'text',crud:'crud',validators:[] },
      { name: 'item_code',title: 'Managment.spareparts.item_code',type:'text',crud:'crud',validators:[] },
      // { name: 'typeCode',title: 'Type Code',type:'text',crud:'r',validators:[] },
      // { name: 'shortname',title: 'Short Name',type:'text',crud:'r',validators:[] },
      // { name: 'description',title: 'description',type:'text',crud:'r',validators:[] },
      { name: 'spareparts_type_id',title: 'Managment.spareparts.spareparts_type_id',type:'selectApi',crud:'cu',apiName:'spareparts_type',label:'name',value:'id',
        validators:[{message:"Managment.spareparts.message",validator:Validators.required,name:"required"},]
      }
    ];
        fields["plan"]= [
      { name: 'loc_mo_name',title: 'Managment.plan.loc_mo_name',type:'text',crud:'rud',validators:[] },
      { name: 'team_id',title: 'Managment.plan.team_id',type:'selectApi',crud:'cu',validators:[],apiName:'plan',label:'team_name',value:'team_id' },
      { name: 'locationVisitType',title: 'Managment.plan.locationVisitType',type:'selectApi',crud:'cu',validators:[],apiName:'locationVisitType',label:'type+loc_name',vlaue:'locationVisitType_id',fun:(v)=>{v['type+loc_name']=v['type']+' : '+v['loc_name']}},

      { name: 'team_name',title: 'Managment.plan.team_name',type:'text',crud:'r',validators:[] },
      { name: 'note',title: 'Managment.plan.note',type:'text',crud:'crud',validators:[] },
      { name: 'start_date',title: 'Managment.plan.start_date',type:'date',crud:'crud',validators:[] },
      { name: 'end_date',title: 'Managment.plan.end_date',type:'date',crud:'crud',validators:[] },

    ];
    fields["core"]= [
      { name: 'name',title: 'Managment.core.name',type:'text',crud:'crud',validators:[] },
      { name: 'product_barcode',title: 'Managment.core.product_barcode',type:'text',crud:'crud',validators:[] },
      { name: 'netype_name',title: 'Managment.core.netype_name',type:'text',crud:'r',validators:[] },
      // { name: 'typeCode',title: 'Type Code',type:'text',crud:'r',validators:[] },
      // { name: 'shortname',title: 'Short Name',type:'text',crud:'r',validators:[] },
      // { name: 'description',title: 'description',type:'text',crud:'r',validators:[] },
      { name: 'netype_id',title: 'Managment.core.netype_id',type:'selectApi',crud:'cu',apiName:'NEType',label:'typeName',value:'id',
        validators:[{message:"Managment.core.message",validator:Validators.required,name:"required"},]
      }
    ];
    fields["radio"]= [
      { name: 'name',title: 'Managment.radio.name',type:'text',crud:'crud',validators:[] },
      { name: 'product_barcode',title: 'Managment.radio.product_barcode',type:'text',crud:'crud',validators:[] },
      { name: 'netype_name',title: 'Managment.radio.netype_name',type:'text',crud:'r',validators:[] },
      // { name: 'typeCode',title: 'Type Code',type:'text',crud:'r',validators:[] },
      // { name: 'shortname',title: 'Short Name',type:'text',crud:'r',validators:[] },
      // { name: 'description',title: 'description',type:'text',crud:'r',validators:[] },
      { name: 'netype_id',title: 'Managment.radio.netype_id',type:'selectApi',crud:'cu',apiName:'NEType',label:'typeName',value:'id',
        validators:[{message:"Managment.radio.message",validator:Validators.required,name:"required"},]
      }
    ];
    fields["router"]= [
      { name: 'name',title: 'Managment.router.name',type:'text',crud:'crud',validators:[] },
      { name: 'product_barcode',title: 'Managment.router.product_barcode',type:'text',crud:'crud',validators:[] },
      { name: 'netype_name',title: 'Managment.router.netype_name',type:'text',crud:'r',validators:[] },
      // { name: 'typeCode',title: 'Type Code',type:'text',crud:'r',validators:[] },
      // { name: 'shortname',title: 'Short Name',type:'text',crud:'r',validators:[] },
      // { name: 'description',title: 'description',type:'text',crud:'r',validators:[] },
      { name: 'netype_id',title: 'Managment.router.netype_id',type:'selectApi',crud:'cu',apiName:'NEType',label:'typeName',value:'id',
        validators:[{message:"Managment.router.message",validator:Validators.required,name:"required"},]
      }
    ];




    fields["NEType"]= [
      { name: 'typeName',title: 'Managment.NEType.typeName',type:'text',crud:'crud',validators:[] },
      { name: 'typeCode',title: 'Managment.NEType.typeCode',type:'text',crud:'crud',validators:[] },
      { name: 'shortname',title: 'Managment.NEType.shortname',type:'text',crud:'crud',validators:[] },
      { name: 'description',title: 'Managment.NEType.description',type:'text',crud:'crud',validators:[] },
      { name: 'product_id',title: 'Managment.NEType.product_id',type:'selectApi',crud:'cu',validators:[
        {message:"Managment.NEType.message",validator:Validators.required,name:"required"},] ,apiName:'product',label:'name',value:'id'},
      { name: 'name',title: 'Managment.NEType.name',type:'text',crud:'r',validators:[] },
    ];
    fields["CheckListsection"]= [
      { name: 'name',title: 'Managment.CheckListsection.name',type:'text',crud:'crud',validators:[] }
    ];
    fields["product"]= [
      { name: 'name',title: 'Managment.product.name',type:'text',crud:'crud',validators:[] }
    ];
    fields["checklista"]= [
      { name: 'name',title: 'Managment.checklista.name',type:'text',crud:'crud',validators:[] },
      { name: 'product_id',title: 'Managment.checklista.product_id',type:'selectApi',crud:'cu',validators:[] ,apiName:'product',label:'name',value:'id'},
      { name: 'is_semi',title: 'Managment.checklista.is_semi',type:'checkbox',crud:'crud',validators:[] },
      { name: 'product_name',title: 'Managment.checklista.product_name',type:'text',crud:'r',validators:[] },
    ];
    fields["checklist"]= [
      { name: 'name',title: 'Managment.checklist.name',type:'text',crud:'crud',validators:[{message:"Checklist Name is required",validator:Validators.required,name:"required"},] },
      { name: 'visit_type_id',title: 'Managment.checklist.visit_type_id',type:'selectApi',crud:'cu',validators:[{message:"Visit Type is required",validator:Validators.required,name:"required"},] ,apiName:'visitType',label:'type',value:'id'},

      { name: 'is_semi',title: 'Managment.checklist.is_semi',type:'checkbox',crud:'crud',validators:[] },
      { name: 'product_name',title: 'Managment.checklist.product_name',type:'text',crud:'r',validators:[] },
      {
        name: 'details', title: 'Managment.checklist.details',type:'selectWithData',crud:'cu',validators:[
          {message:"Managment.checklist.message",validator:this.selectOneRowValidator,name:"oneRow"},
          {message:null,validator:this.selectRowDataRequired('equibment_id','Equipment'),name:"equibment_id"},
          {message:null,validator:this.selectRowDataRequired('attr_id','Attribute'),name:"attr_id"},
          {message:null,validator:this.selectRowDataRequired('section_id','Section'),name:"section_id"},

        ],
        fields:[
          { name: 'section_id',title: 'Managment.checklist.fields.section_id',type:'selectApi',crud:'cu',validators:[] ,apiName:'CheckListsection',label:'name',value:'id',recordLabel:'section_name'},
          { name: 'equibment_id',title: 'Managment.checklist.fields.equibment_id',type:'selectApi',crud:'cu',validators:[] ,apiName:'equibment',label:'name',value:'id',recordLabel:'equibment_name'},
          { name: 'attr_id',title: 'Managment.checklist.fields.attr_id',type:'selectApi',crud:'cu',validators:[] ,apiName:'checklist_attr',label:'name',value:'id',recordLabel:'attr_name'},
          { name: 'equibment_name',title: 'Managment.checklist.fields.equibment_name',type:'text',crud:'r',validators:[],},
          { name: 'attr_name',title: 'Managment.checklist.fields.attr_name',type:'text',crud:'r',validators:[] ,},
          { name: 'section_name',title: 'Managment.checklist.fields.section_name',type:'text',crud:'r',validators:[] }
        ]
      },
    ];
    fields["equibment"]= [
      { name: 'name',title: 'Managment.equibment.name',type:'text',crud:'crud',validators:[] },
      { name: 'description',title: 'Managment.equibment.description',type:'text',crud:'crud',validators:[] },
    ];
    fields["checklist_attr"]= [
      { name: 'name',title: 'Managment.checklist_attr.name',type:'text',crud:'crud',validators:[] },
      { name: 'type',title: 'Managment.checklist_attr.type',type:'selectApi',crud:'crud',label:'type',value:'type',
      items:[
        {type:'Managment.checklist_attr.typetext'},
        {type:'Managment.checklist_attr.typecheck'},
        {type:'Managment.checklist_attr.typenumber'},
        {type:'Managment.checklist_attr.typetextarea'},
        {type:'Managment.checklist_attr.typeimage'},
        {type:'Managment.checklist_attr.typeradio'},
      ],validators:[
        {message:"Managment.checklist_attr.message",validator:Validators.required,name:"required"},
      ]},
      { name: 'has_comment',title: 'Managment.checklist_attr.has_comment',type:'checkbox',crud:'crud',validators:[] },
    ];
    fields["team"]= [
      { name: 'team_name',title: 'Managment.team.team_name',type:'text',crud:'crud',validators:[] },
      { name: 'team_code',title: 'Managment.team.team_name',type:'text',crud:'crud',validators:[] },
      { name: 'team_is_active',title: 'Managment.team.team_is_active',type:'checkbox',crud:'crud',validators:[] },
      { name: 'members', title: 'Managment.team.members',type:'selectWithData',crud:'cu',validators:[],fields:[
          { name: 'tem_mem_employee_id',title: 'Managment.team.tem_mem_employee_id',type:'selectApi',crud:'cu',validators:[],apiName:'employee',label:'emp_name',value:'emp_id',recordLabel:'emp_name'},
          { name: 'tem_mem_priority',title: 'Managment.team.tem_mem_priority',type:'number',crud:'crud',validators:[] },
          { name: 'emp_name',title: 'Managment.team.emp_name',type:'text',crud:'r',validators:[] }
        ]},
    ];
    fields["teamType"]= [
      { name: 'tic_typ_name',title: 'Managment.teamType.tic_typ_name',type:'text',crud:'crud',validators:[] },
      { name: 'tic_typ_priority',title: 'Managment.teamType.tic_typ_priority',type:'number',crud:'crud',validators:[] },
      { name: 'tic_typ_if_is_critical',title: 'Managment.teamType.tic_typ_if_is_critical',type:'text',crud:'crud',validators:[] },
      { name: 'tic_typ_display_name',title: 'Managment.teamType.tic_typ_display_name',type:'text',crud:'crud',validators:[] },
    ];
    fields["locationTeam"]= [
      { name: 'location_id',title: 'Managment.locationTeam.location_id',type:'selectApi',crud:'cu',validators:[],apiName:'location',label:'loc_name',value:'loc_id' },
      { name: 'team_id',title: 'Managment.locationTeam.team_id',type:'selectApi',crud:'cu',validators:[],apiName:'team',label:'team_code',value:'team_id' },
      { name: 'team_type_id',title: 'Managment.locationTeam.team_type_id',type:'selectApi',crud:'cu',validators:[],apiName:'teamType',label:'tic_typ_name',value:'tic_typ_id' },
      { name: 'loc_name',title: 'Managment.locationTeam.loc_name',type:'text',crud:'r',validators:[] },
      { name: 'team_code',title: 'Managment.locationTeam.team_code',type:'text',crud:'r',validators:[] },
      { name: 'tic_typ_name',title: 'Managment.locationTeam.tic_typ_name',type:'text',crud:'r',validators:[] },
    ];
    fields["location"]= [
      { name: 'loc_name',title: 'Managment.location.loc_name',type:'text',crud:'crud',validators:[] },
      { name: 'loc_code',title: 'Managment.location.loc_code',type:'text',crud:'crud',validators:[] },
      { name: 'loc_des',title: 'Managment.location.loc_des',type:'text',crud:'crud',validators:[] },
      { name: 'loc_city_id',title: 'Managment.location.loc_city_id',type:'selectApi',validators:[],crud:'cu',apiName:'city',label:'city_name',value:'city_id'},
      { name: 'loc_area_id',title: 'Managment.location.loc_area_id',type:'selectApi',validators:[],crud:'cu',apiName:'area',label:'ar_name',value:'ar_id'},
      { name: 'loc_mo_name',title: 'Managment.location.loc_mo_name',type:'text',crud:'crud',validators:[] },
      { name: 'loc_region_id',title: 'Managment.location.loc_region_id',type:'text',crud:'cud',validators:[] },
      // { name: 'loc_has_geneartor',title: 'has geneartor',type:'checkbox',crud:'crud',validators:[] },
      { name: 'loc_address',title: 'Managment.location.loc_address',type:'text',crud:'cud',validators:[] },
      { name: 'loc_note',title: 'Managment.location.loc_note',type:'text',crud:'cud',validators:[] },
      { name: 'loc_x',title: 'Managment.location.loc_x',type:'number',crud:'cud',step:'0.001',validators:[] },
      { name: 'loc_y',title: 'Managment.location.loc_y',type:'number',crud:'cud',step:'0.001',validators:[] },
      { name: 'loc_secure',title: 'Managment.location.loc_secure',type:'checkbox',crud:'cud',validators:[] },
      { name: 'loc_on_air_date',title: 'Managment.location.loc_on_air_date',type:'date',crud:'crud',validators:[] },
      { name: 'loc_site_kind',title: 'Managment.location.loc_site_kind',type:'text',crud:'crud',validators:[] },
      // { name: 'loc_fcp',title: 'loc_fcp',type:'text',crud:'crud',validators:[] },
      // { name: 'loc_solar',title: 'loc_solar',type:'text',crud:'crud',validators:[] },
      // { name: 'loc_wind',title: 'loc_wind',type:'text',crud:'crud',validators:[] },
      { name: 'loc_is_active',title: 'Managment.location.loc_is_active',type:'checkbox',crud:'crud',validators:[] },
      { name: 'loc_has_permition',title: 'Managment.location.loc_has_permition',type:'checkbox',crud:'crud',validators:[] },
      { name: 'loc_has_authorization',title: 'Managment.location.loc_has_authorization',type:'checkbox',crud:'crud',validators:[] },
      // { name: 'loc_is_deleted',title: 'loc_is_deleted',type:'text',crud:'',validators:[] },
    ];
    fields["employee"]= [
      { name: 'emp_name',title: 'Managment.employee.emp_name',type:'text',crud:'crud',validators:[] },
      { name: 'emp_title',title: 'Managment.employee.emp_title',type:'text',crud:'crud',validators:[] },
      { name: 'emp_number',title: 'Managment.employee.emp_number',type:'number',crud:'crud',validators:[] },
      { name: 'emp_username',title: 'Managment.employee.emp_username',type:'text',crud:'crud',validators:[] },
      // { name: 'emp_sip_username',title: 'Employee sip username',type:'text',crud:'crud',validators:[] },
      // { name: 'emp_role_id',title: 'Employee role id',type:'text',crud:'crud',validators:[] },
      { name: 'emp_email',title: 'Managment.employee.emp_email',type:'text',crud:'crud',validators:[] },
      { name: 'emp_internet_mobile',title: 'Managment.employee.emp_internet_mobile',type:'text',crud:'crud',validators:[] },
      { name: 'emp_syr_gsm_mobile',title: 'Managment.employee.emp_syr_gsm_mobile',type:'text',crud:'crud',validators:[] },
      { name: 'emp_mtn_gsm_mobile',title: 'Managment.employee.emp_mtn_gsm_mobile',type:'text',crud:'crud',validators:[] },
      { name: 'emp_fixed_line',title: 'Managment.employee.emp_fixed_line',type:'text',crud:'crud',validators:[] },
      { name: 'emp_is_active',title: 'Managment.employee.emp_is_active',type:'checkbox',crud:'crud',validators:[] },
      // { name: 'ar_display_name',title: 'Ar display name',type:'text',crud:'r',validators:[] },
      { name: 'un_name',title: 'Managment.employee.un_name',type:'text',crud:'r',validators:[] },
      { name: 'ar_name',title: 'Managment.employee.ar_name',type:'text',crud:'r',validators:[] },
      { name: 'emp_unit_id',title: 'Managment.employee.emp_unit_id',type:'selectApi',crud:'uc',validators:[], apiName:'unit',label:'un_name',value:'un_id'},
      { name: 'emp_area_id',title: 'Managment.employee.emp_area_id',type:'selectApi',crud:'uc',validators:[], apiName:'area',label:'ar_name',value:'ar_id'},

    ];
    fields["locationVisitType"]= [

      { name: 'location_id',title: 'Managment.locationVisitType.location_id',type:'selectApi',validators:[], crud:'cu',apiName:'location',label:'loc_name',value:'loc_id'},
      { name: 'visitType_id',title: 'Managment.locationVisitType.visitType_id',type:'selectApi',validators:[],crud:'cu',apiName:'visitType',label:'type',value:'id' },
      { name: 'type',title: 'Managment.locationVisitType.type',type:'text',crud:'r',validators:[] },
      { name: 'loc_name',title: 'Managment.locationVisitType.loc_name',type:'text',crud:'r',validators:[] },
      { name: 'checkLists_id',title: 'Managment.locationVisitType.checklists_id',type:'selectApi',validators:[],crud:'cu',apiName:'checklist',label:'name',value:'id',multiple:true },
      { name: 'checkLists',title: 'Managment.locationVisitType.checkLists',type:'text',crud:'r',validators:[] },
    ];

    fields["permissions"]= [

      { name: 'file',title: 'Managment.permissions.file',type:'file',crud:'cr',validators:[
          {message:"Managment.permissions.message",validator:Validators.required,name:"required"},
          {message:"",validator:myValidators.extentionFile(['jpg']),name:"extentionError"} ] },
      { name: 'from_date',title: 'Managment.permissions.from_date',type:'date',crud:'rc',validators:[] },
      { name: 'to_date',title: 'Managment.permissions.to_date',type:'date',crud:'rc',validators:[] },
      { name: 'location_name',title: 'Managment.permissions.location_name',type:'text',crud:'r',validators:[] },
      { name: 'location_id',title: 'Managment.permissions.location_id',type:'selectApi',crud:'cu',validators:[],apiName:'location',label:'loc_name',value:'loc_id' },
      { name: 'emp_id',title: 'Managment.permissions.emp_id',type:'selectApi',crud:'cu',validators:[],apiName:'employee',label:'emp_name',value:'emp_id',multiple:true },
      { name: 'is_permition',title: 'Managment.permissions.is_permition',type:'radio',crud:'crud',validators:[], choices:[{label:"permission",value:"1"},{label:"authorization",value:"0"}]},
    ];

    fields["tanks"]= [
      { name: 'capacity',title: 'Managment.tanks.capacity',type:'text',crud:'crud',validators:[] },
      { name: 'type',title: 'Managment.tanks.type',type:'text',crud:'crud',validators:[] },
      { name: 'notes',title: 'Managment.tanks.notes',type:'text',crud:'crud',validators:[] },


    ];
    fields["locationGenerator"]= [
      { name: 'location_id',title: 'Managment.locationGenerator.location_id',type:'selectApi',validators:[], crud:'cu',apiName:'location',label:'loc_name',value:'loc_id'},
      { name: 'netype_id',title: 'Managment.locationGenerator.netype_id',type:'selectApi',crud:'cu',apiName:'NEType',label:'typeName',value:'id',
        validators:[{message:"Managment.locationGenerator.message",validator:Validators.required,name:"required"},],

      },
      { name: 'netype_id',title: 'Managment.locationGenerator.netype_id',type:'selectApi',crud:'cu',apiName:'NEType',label:'typeName',value:'id',
        validators:[{message:"Managment.locationGenerator.message",validator:Validators.required,name:"required"},],
        filters:[
          {key:'',value:''},
        ],

      },
      { name: 'type',title: 'Managment.locationGenerator.type',type:'text',crud:'crud',validators:[] },
      { name: 'notes',title: 'Managment.locationGenerator.notes',type:'text',crud:'crud',validators:[] },


    ];
    fields["Cart"]= [
      { name: 'loc_name',title: 'Managment.Cart.loc_name',type:'text',crud:'crud',validators:[] },
      { name: 'loc_code',title: 'Managment.Cart.loc_name',type:'text',crud:'crud',validators:[] },
      { name: 'loc_des',title: 'Managment.Cart.loc_name',type:'text',crud:'crud',validators:[] },
      { name: 'loc_city_id',title: 'Managment.Cart.loc_city_id',type:'text',validators:[],crud:'cu'},
      { name: 'loc_area_id',title: 'Managment.Cart.loc_area_id',type:'text',validators:[],crud:'cu'},
      { name: 'loc_mo_name',title: 'Managment.Cart.loc_mo_name',type:'text',crud:'crud',validators:[] },
      { name: 'loc_region_id',title: 'Managment.Cart.loc_region_id',type:'text',crud:'crud',validators:[] },
    ];
    fields["Role"]= [
      { name: 'rol_name',title: 'Managment.Role.rol_name',type:'text',crud:'crud',validators:[] },
      { name: 'rol_des',title: 'Managment.Role.rol_des',type:'text',crud:'crud',validators:[] },
      { name: 'privilege',title: 'Managment.Role.privilege',type:'selectApi',crud:'cu',validators:[],apiName:'Privilege',label:'pri_display_name',value:'pri_id',multiple:true },

    ];

    return fields[name];
  }
}
