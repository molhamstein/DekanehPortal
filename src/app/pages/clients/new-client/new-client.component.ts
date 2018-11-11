import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserModel} from '../../user-model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MouseEvent} from '@agm/core';
import {ConstService} from '../../../services/const.service';
import {ClientsHandler} from '../clients-handler';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {
  newUSer;
  nameError = false;
  phoneError = false;
  private user: any;
  id: string;
  allStatus = ['pending', 'activated','deactivated'];
  status='pending';
  constructor(private ClientHandler: ClientsHandler, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    if (this.id == undefined) {
      this.user = new UserModel();
      this.lat = 33.5138;
      this.lng = 36.2765;
      this.locationPoint = {
        lat: 33.5138,
        lng: 36.2765
      };
      this.newUSer = true;
    } else {
      this.user = this.ClientHandler.getClientUserById(this.id).subscribe(Client => {
        this.user = Client;

        this.ClientForm.removeControl('password');
        this.ClientForm.setValue({
          phoneNumber: Client.phoneNumber,
          location: Client.location,
          notes: Client.notes,
          status: Client.status,
          ownerName: Client.ownerName,
          shopName: Client.shopName
        });
        this.locationPoint = Client.locationPoint;
        this.marker.lng = this.locationPoint.lng;
        this.marker.lat = this.locationPoint.lat;
        this.lat = this.locationPoint.lat;
        this.lng = this.locationPoint.lng;
        this.newUSer = false;
        this.selectedSale = Client.clientType;
        this.areaId = Client.areaId;
        this.status = Client.status;
      });
    }
    this.getAreas();
  }

  getAreas() {
    this.ClientHandler.getAllAreas().subscribe(data => {
        this.areas = data;
      }
      , errorCode => this.statusCode = errorCode);

  }

  areas: any[];
  submitted = false;
  password = '';
  passError;
  statusCode: number;
  selectedSale = 'wholesale';
  lat: number;
  lng: number;
  areaId = '';
  locationPoint: any;
  processValidation = false;
  requestProcessing = false;
  ClientForm = new FormGroup({
    phoneNumber: new FormControl('', Validators.compose(
      [
        Validators.pattern('^\\+?\\d+$'),
        Validators.required
      ])),

    location: new FormControl(''),
    notes: new FormControl(''),
    status: new FormControl(''),
    ownerName: new FormControl(''),
    shopName: new FormControl('',Validators.required),
    password: new FormControl('',
      Validators.compose(
        [
          Validators.required,
          Validators.minLength(6),
        ])
    ),
  });

  setArea(event) {
    this.areaId = event.target.value;
  }

  checkUserByPhone(event) {
    this.ClientHandler.getClientByPhone(event.target.value).subscribe(data => {
        if (data['count'] > 0) {
          this.phoneError = true;
        } else {
          this.phoneError = false;

        }

      }
    );
  }

  checkUserByName(event) {
    this.ClientHandler.getClientByUserName(event.target.value).subscribe(data => {
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

  goHome() {
    this.router.navigate(['/client/list']);

  }

  onClientFormSubmit() {
    this.processValidation = true;
    if (this.ClientForm.invalid || this.passError || this.phoneError || this.nameError) {
      return;
    }


    this.preProcessConfigurations();
    this.submitted = true;
    if (this.newUSer) {
      this.user = this.ClientForm.value;
      this.user.clientType = this.selectedSale;
      if (this.areaId == '') {
        this.areaId = this.areas[0].id;
      }
      this.user.areaId = this.areaId;
      this.user.locationPoint = this.locationPoint;
      this.ClientHandler.createClientUser(this.user).subscribe(successCode => {
          this.statusCode = successCode;
          this.router.navigate(['/client/list']);
        },
        errorCode => this.statusCode = errorCode
      );
    } else {

      this.user.ownerName = this.ClientForm.get('ownerName').value;
      this.user.notes = this.ClientForm.get('notes').value;
      this.user.shopName = this.ClientForm.get('shopName').value;
      this.user.phoneNumber = this.ClientForm.get('phoneNumber').value;
      this.user.location = this.ClientForm.get('location').value;
      this.user.clientType = this.selectedSale;
      this.user.status = this.status;
      this.user.areaId = this.areaId;
      this.user.locationPoint = this.locationPoint;
      this.ClientHandler.updateClientUser(this.user).subscribe(successCode => {
          this.statusCode = successCode;
          this.router.navigate(['/client/list']);
        },
        errorCode => this.statusCode = errorCode
      );

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

