import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StaffHandler} from '../staff.handler';
import {ActivatedRoute, Router} from '@angular/router';
import {UserModel} from '../../user-model';
import {IOption} from 'ng-select';
import {AlertService} from '../../../services/alert.service';

@Component({
    selector: 'app-new-staff',
    templateUrl: './new-staff.component.html',
    styleUrls: ['./new-staff.component.css']
})
export class NewStaffComponent implements OnInit {
    newUSer;
    roles: any[];

    status = 'pending';
    allStatus = ['pending', 'activated', 'deactivated'];
    phoneError = false;
    roleIds: string[] = [];
    IOroles: Array<IOption> = [];
    t: Array<IOption> = [];
    nameError = false;
    emailError = false;
    id: string;
    submitted = false;
    password = '';
    passError;
    statusCode: number;
    selectedSale = 'wholesale';
    processValidation = false;
    requestProcessing = false;
    staffForm = new FormGroup({
        username: new FormControl('', Validators.required),
        email: new FormControl('', Validators.compose(
            [
                Validators.email,
                Validators.required
            ])),
        phoneNumber: new FormControl('', Validators.compose(
            [
                Validators.pattern('^\\+?\\d+$'),
                Validators.required
            ])),
        roleIds: new FormControl(''),
        status: new FormControl(''),
        password: new FormControl('',
            Validators.compose(
                [
                    Validators.required,
                    Validators.minLength(6),
                ])
        ),
    });
    private user: any;

    constructor(private staffHandler: StaffHandler, private router: Router, private route: ActivatedRoute,private alert:AlertService) {
        this.getAllRoles();
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if (this.id == undefined) {
            this.user = new UserModel();

            this.newUSer = true;
        } else {
            this.user = this.staffHandler.getStaffUserById(this.id).subscribe(staff => {
                this.user = staff;

                this.staffForm.removeControl('password');
                this.staffForm.setValue({
                    username: staff.username,
                    email: staff.email,
                    roleIds: staff.roleIds,
                    status: staff.status,
                    phoneNumber: staff.phoneNumber,
                });
                this.newUSer = false;

            },errorCode => this.showError());
        }
    }

    getAllRoles() {
        this.staffHandler.getAllRoles()
            .subscribe(data => {
                    this.roles = data.sort((a, b) => a.creationDate > b.creationDate ? -1 : 1);
                    for (let role of this.roles) {
                        if (role.nameAr != undefined && role.nameAr != '' && role.id != '') {
                            this.t.push({label: role.nameAr, value: role.id});
                        }
                    }
                }
                , errorCode => this.showError());
    }

    checkUserByEmail(event) {
        this.staffHandler.getStaffByEmail(event.target.value).subscribe(data => {
                console.log(data);
                if (data['count'] > 0) {
                    this.emailError = true;
                } else {
                    this.emailError = false;

                }
            },errorCode => this.showError()
        );
    }


    checkUserByPhone(event) {
        this.staffHandler.getStaffByPhone(event.target.value).subscribe(data => {
                if (data['count'] > 0) {
                    this.phoneError = true;
                } else {
                    this.phoneError = false;

                }

            },errorCode => this.showError()
        );
    }
    checkUserByName(event) {
        this.staffHandler.getStaffByUserName(event.target.value).subscribe(data => {
                if (data['count'] > 0) {
                    this.nameError = true;
                } else {
                    this.nameError = false;

                }

            },errorCode => this.showError()
        );

    }


    goHome() {
        this.router.navigate(['/staff/list']);

    }
    showError() {
        this.alert.showToast.next({type: 'error'});
    }
    onStaffFormSubmit() {
        this.processValidation = true;
        if (this.staffForm.invalid || this.passError || this.emailError || this.nameError || this.phoneError) {
            return;
        }


        this.preProcessConfigurations();
        this.submitted = true;
        if (this.newUSer) {
            this.user = this.staffForm.value;
            this.user.clientType = this.selectedSale;
            this.user.roleIds = this.roleIds;
            this.staffHandler.createStaffUser(this.user).subscribe(successCode => {
                    this.statusCode = successCode;
                    this.router.navigate(['/staff/list']);
                },
                errorCode => this.showError()
            );
        } else {
            this.user.roleIds = this.roleIds;
            this.user.status = this.status;
            this.user.username = this.staffForm.get('username').value;
            this.user.email = this.staffForm.get('email').value;
            this.user.phoneNumber = this.staffForm.get('phoneNumber').value;
            this.user.clientType = this.selectedSale;
            this.staffHandler.updateStaffUser(this.user).subscribe(successCode => {
                    this.statusCode = successCode;
                    this.router.navigate(['/staff/list']);
                },
                errorCode => this.showError()
            );

        }
        // console.log(this.user);


    }

    setPass(event) {
        this.password = event.target.value;
    }

    comparePass(event) {
        this.passError = (this.password != event.target.value);
    }

    ngOnInit() {
        setTimeout(() => {
            this.IOroles = this.t;
        }, 3000);
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
