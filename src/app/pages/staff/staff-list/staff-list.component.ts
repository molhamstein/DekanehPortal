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

  getAllStaff() {
    this.staffService.getAllStaff()
      .subscribe(data => this.allStaff = data, errorCode => this.statusCode = errorCode);
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
