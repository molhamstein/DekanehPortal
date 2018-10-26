import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup,Validators} from '@angular/forms';
import {MouseEvent} from '@agm/core';
import {StaffUser} from '../StaffUser';
import {StaffService} from '../staff.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-new-staff',
  templateUrl: './new-staff.component.html',
  styleUrls: ['./new-staff.component.css']
})
export class NewStaffComponent implements OnInit {
  nameError = false;
  emailError = false;
  phoneError = false;

  constructor(private staffService: StaffService, private router:Router) {
  }

  password = '';
  passError
  statusCode: number;
  selectedSale = 'retailCostumer';
  private user = new StaffUser();
  lat: number = 33.5138;
  lng: number = 36.2765;
  locationPoint = {
    lat: 33.5138,
    lng: 36.2765
  };
  processValidation = false;
  requestProcessing = false;
  staffForm = new FormGroup({
    username: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
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
    // repassword: new FormControl('',
    //   Validators.compose([
    //     Validators.required,
    //     Validators.minLength(6),
    //
    //   ]))

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
    this.user = this.staffForm.value;
    this.user.clientType = this.selectedSale;
    this.user.locationPoint = this.locationPoint;
    this.staffService.createStaffUser(this.user).subscribe(successCode => {
        this.statusCode = successCode;
        this.router.navigate(['/staff/list']);

      },
      errorCode => this.statusCode = errorCode
    );
    // console.log(this.user);
  }

  comparePass(event){
    this.passError=(this.password!=event.target.value);
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
