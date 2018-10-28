import {Component, OnInit} from '@angular/core';
import {StaffUser} from '../StaffUser';
import {StaffService} from '../staff.service';
import {Router} from '@angular/router';

@Component({
  selector: 'staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})

export class StaffListComponent implements OnInit {
  nameOrderDir=false;
  statusOrderDir=false;
  shopNameOrderDir=false;
  typeOrderDir=false;
  phoneNumberOrderDir=false;
  locationOrderDir=false;
  statusCode: number;
  requestProcess = false;
  staffToUpdate = null;
  private api = 'http://104.217.253.15:3003/api/users';
  allStaff: StaffUser[];

  constructor(private staffService: StaffService,private router:Router) {

  }
editStaff(id:string){
  this.router.navigate(['/staff/edit/'+id]);
}
orderByName(){
    if(this.nameOrderDir){
      this.allStaff.sort((a,b) => a.username < b.username? -1 : 1);

    }else {
      this.allStaff.sort((a,b) => a.username > b.username? -1 : 1);
    }
  this.nameOrderDir=!this.nameOrderDir;

}
  orderByLocation(){
    if(this.locationOrderDir){
      this.allStaff.sort((a,b) => a.location < b.location? -1 : 1);

    }else {
      this.allStaff.sort((a,b) => a.location > b.location? -1 : 1);
    }
    this.locationOrderDir=!this.locationOrderDir;

  }
  orderByPhone(){
    if(this.phoneNumberOrderDir){
      this.allStaff.sort((a,b) => a.phoneNumber < b.phoneNumber? -1 : 1);

    }else {
      this.allStaff.sort((a,b) => a.phoneNumber > b.phoneNumber? -1 : 1);
    }
    this.phoneNumberOrderDir=!this.phoneNumberOrderDir;

  }
  orderByType(){
    if(this.typeOrderDir){
      this.allStaff.sort((a,b) => a.clientType < b.clientType? -1 : 1);

    }else {
      this.allStaff.sort((a,b) => a.clientType > b.clientType? -1 : 1);
    }
    this.typeOrderDir=!this.typeOrderDir;

  }
  orderByStatus(){
    if(this.statusOrderDir){
      this.allStaff.sort((a,b) => a.status < b.status? -1 : 1);

    }else {
      this.allStaff.sort((a,b) => a.status > b.status? -1 : 1);
    }
    this.statusOrderDir=!this.statusOrderDir;

  }
  orderByShope(){
    if(this.shopNameOrderDir){
      this.allStaff.sort((a,b) => a.shopName < b.shopName? -1 : 1);

    }else {
      this.allStaff.sort((a,b) => a.shopName > b.shopName? -1 : 1);
    }
    this.shopNameOrderDir=!this.shopNameOrderDir;

  }
  getAllStaff() {
    this.staffService.getAllStaff()
      .subscribe(data => this.allStaff = data.sort((a,b) => a.creationDate > b.creationDate ? -1 : 1)

        , errorCode => this.statusCode = errorCode);
  }


  deleteStaff(id: string) {

    this.preConfig();
    this.staffService.getStaffUserById(id)
      .subscribe(staff => {
          this.staffToUpdate = staff;
          this.staffToUpdate.status = 'deactivated';

          this.staffService.updateStaffUser(this.staffToUpdate).subscribe(
            successCode => {
              this.statusCode = 200;
              this.getAllStaff();
              // this.backToCreateArticle();
            },
            errorCode => this.statusCode = errorCode
          );
        },
        errorCode => this.statusCode = errorCode);

  }


  ngOnInit() {
    this.getAllStaff();
  }

  preConfig() {
    this.statusCode = null;
    this.requestProcess = true;
  }
}
