import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MouseEvent} from '@agm/core';
import {StaffUser} from '../StaffUser';
import {StaffService} from '../staff.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Constants} from '../Constants';
import {id} from '@swimlane/ngx-datatable/release/utils';


@Component({
  selector: 'app-new-staff',
  templateUrl: './new-staff.component.html',
  styleUrls: ['./new-staff.component.css']
})
export class NewStaffComponent implements OnInit {
  newUSer;
  nameError = false;
  emailError = false;
  phoneError = false;
  private user: any;
  id: string;
  edituser:any;
  constructor(private staffService: StaffService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    if (this.id == undefined) {
      this.user = new StaffUser();
      this.lat = 33.5138;
      this.lng = 36.2765;
      this.locationPoint = {
        lat: 33.5138,
        lng: 36.2765
      };
      this.newUSer = true;
    } else {
      this.user = this.staffService.getStaffUserById(this.id).subscribe(staff => {
        this.user = staff;

        this.staffForm.removeControl('password');
        this.staffForm.setValue({
          username: staff.username,
          phoneNumber: staff.phoneNumber,
          email: staff.email,
          location: staff.location,
          notes: staff.notes,
          ownerName: staff.ownerName,
          shopName: staff.shopName
        });
        this.locationPoint = staff.locationPoint;
        this.marker.lng = this.locationPoint.lng;
        this.marker.lat = this.locationPoint.lat;
        this.lat = this.locationPoint.lat;
        this.lng = this.locationPoint.lng;
        this.newUSer = false;
        this.selectedSale = staff.clientType;

      });
    }
  }

  password = '';
  passError;
  statusCode: number;
  selectedSale = 'retailCostumer';
  lat: number;
  lng: number;
  locationPoint: any;
  processValidation = false;
  requestProcessing = false;
  staffForm = new FormGroup({
    username: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.compose(
      [
        Validators.pattern('^\\+?\\d+$'),
        Validators.required
      ])),
    email: new FormControl('', Validators.compose(
      [
        Validators.email,
        Validators.required
      ])),
    location: new FormControl(''),
    notes: new FormControl(''),
    ownerName: new FormControl(''),
    shopName: new FormControl(''),
    password: new FormControl('',
      Validators.compose(
        [
          Validators.required,
          Validators.minLength(6),
        ])
    ),
  });

  checkUserByEmail(event) {
    this.staffService.getStaffByEmail(event.target.value).subscribe(data => {
        if (data['count'] > 0) {
          this.emailError = true;
        } else {
          this.emailError = false;

        }
      }
    );
  }

  checkUserByPhone(event) {
    this.staffService.getStaffByPhone(event.target.value).subscribe(data => {
        if (data['count'] > 0) {
          this.phoneError = true;
        } else {
          this.phoneError = false;

        }

      }
    );
  }

  checkUserByName(event) {
    this.staffService.getStaffByUserName(event.target.value).subscribe(data => {
        if (data['count'] > 0) {
          this.nameError = true;
        } else {
          this.nameError = false;

        }

      }
    );

  }

  marker = {
    lat: 33.5138,
    lng: 36.2765,
    draggable: true
  };

  onSelectionChange(entry) {
    this.selectedSale = entry;
  }

  mapClicked($event: MouseEvent) {
    this.marker.lat = $event.coords.lat;
    this.marker.lng = $event.coords.lng;
    this.marker.draggable = true;
    this.changeLocationGeo($event);

  }

  markerDragEnd($event: MouseEvent) {
    this.changeLocationGeo($event);
  }

  changeLocationGeo($event: MouseEvent) {
    this.locationPoint = {
      lat: $event.coords.lat,
      lng: $event.coords.lng,

    };


  }

  onStaffFormSubmit() {
    this.processValidation = true;
    if (this.staffForm.invalid || this.passError || this.phoneError || this.emailError || this.nameError) {
      console.log(this.passError);
      return;
    }

      this.preProcessConfigurations();

    if (this.newUSer) {
      this.user = this.staffForm.value;
      this.user.clientType = this.selectedSale;
      this.user.locationPoint = this.locationPoint;
      this.user.roleIds = Constants.STAFF_ROLES;
      this.staffService.createStaffUser(this.user).subscribe(successCode => {
          this.statusCode = successCode;
          this.router.navigate(['/staff/list']);
        },
        errorCode => this.statusCode = errorCode
      );
    } else {

      this.user.ownerName=this.staffForm.get('ownerName').value;
      this.user.username=this.staffForm.get('username').value;
      this.user.email=this.staffForm.get('email').value;
      this.user.notes=this.staffForm.get('notes').value;
      this.user.shopName=this.staffForm.get('shopName').value;
      this.user.phoneNumber=this.staffForm.get('phoneNumber').value;
      this.user.location=this.staffForm.get('location').value;
      this.user.clientType = this.selectedSale;
      this.user.locationPoint = this.locationPoint;
      this.staffService.updateStaffUser(this.user).subscribe(successCode => {
          this.statusCode = successCode;
          this.router.navigate(['/staff/list']);
        },
        errorCode => this.statusCode = errorCode
      );
      // console.log(this.user);

    }

  }

  setPass(event) {
    this.password = event.target.value;
  }

  comparePass(event) {
    this.passError = (this.password != event.target.value);
  }

  ngOnInit() {
  }

  preProcessConfigurations() {
    this.requestProcessing = true;
  }
}

interface marker {
  lat: number;
  lng: number;
  draggable: boolean;
}
