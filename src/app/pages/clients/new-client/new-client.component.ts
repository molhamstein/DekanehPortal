import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserModel} from '../../user-model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MouseEvent} from '@agm/core';
import {ClientsHandler} from '../clients-handler';
import {AlertService} from '../../../services/alert.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
    selector: 'app-new-client',
    templateUrl: './new-client.component.html',
    styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {
    newUSer;
    nameError = false;
    phoneError = false;
    id: string;
    allStatus = ['pending', 'activated', 'deactivated'];
    status = 'pending';
    areas: any[];
    submitted = false;
    password = '';
    passError;
    statusCode: number;
    selectedSale = 'wholesale';
    lat: number;
    lng: number;
    areaId = '';
    passSubmitted = false;
    locationPoint: any;
    processValidation = false;
    requestProcessing = false;
    modalRef: BsModalRef;
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
        shopName: new FormControl('', Validators.required),
        password: new FormControl('',
            Validators.compose(
                [
                    Validators.required,
                    Validators.minLength(6),
                ])
        ),
    });
    PassForm = new FormGroup({

        password: new FormControl('',
            Validators.compose(
                [
                    Validators.required,
                    Validators.minLength(6),
                ])
        ),
    });
    marker = {
        lat: 33.5138,
        lng: 36.2765,
        draggable: true
    };
    private user: any;

    constructor(private modalService: BsModalService, private ClientHandler: ClientsHandler, private router: Router, private route: ActivatedRoute, private alert: AlertService) {

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
              console.log(Client);
                this.user = Client;
                let loc;
                let notes;
                let owner;
                let shop;
                Client.location==undefined ? loc='': loc=Client.location;
                Client.notes==undefined ? notes='': notes=Client.notes;
                Client.ownerName==undefined ? owner='': owner=Client.ownerName;
                Client.shopName==undefined ? shop='': shop=Client.shopName;

                this.ClientForm.removeControl('password');
                this.ClientForm.setValue({
                    phoneNumber: Client.phoneNumber,
                    location: loc,
                    notes: notes,
                    status: Client.status,
                    ownerName: owner,
                    shopName: shop
                });
                this.locationPoint = Client.locationPoint;
                if(this.locationPoint==undefined){
                    this.locationPoint = {
                        lat: 33.5138,
                        lng: 36.2765
                    };
                }
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

    showError() {
        this.alert.showToast.next({type: 'error'});
    }
    getAreas() {
        this.ClientHandler.getAllAreas().subscribe(data => {
                this.areas = data;
            }
            , errorCode => this.showError());

    }

    setArea(event) {
        this.areaId = event.target.value;
    }

    showPasswordModal(template: TemplateRef<any>) {

        this.modalRef = this.modalService.show(template, {class: 'modal-sm', backdrop: true, ignoreBackdropClick: true});
    }

    // confirm(): void {
    //     // this.deleteOrder(this.orderTodelete);
    // }
    decline(): void {
        this.modalRef.hide();
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

    onPassFormSubmit() {
        if (this.PassForm.invalid || this.passError) {
            return;
        }
        this.passSubmitted = true;
        let passBody = {'id': this.id, 'password': this.PassForm.get('password').value};
        this.ClientHandler.changePass(passBody).finally(() => {
            this.passSubmitted = false;
            this.modalRef.hide();
        }).subscribe(data => console.log(data), errorCode => this.showError());

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
                errorCode => this.showError()
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
                errorCode => this.showError()
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

