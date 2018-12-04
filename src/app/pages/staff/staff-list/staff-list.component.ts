import {Component, OnInit} from '@angular/core';
import {StaffHandler} from '../staff.handler';
import {Router} from '@angular/router';
import {UserModel} from '../../user-model';

@Component({
    selector: 'staff-list',
    templateUrl: './staff-list.component.html',
    styleUrls: ['./staff-list.component.css']
})

export class StaffListComponent implements OnInit {
    nameOrderDir;
    statusOrderDir;
    shopNameOrderDir;
    typeOrderDir;
    emailOrderDir;
    locationOrderDir;
    statusCode: number;
    requestProcess = false;
    staffToUpdate = null;
    allStaff: UserModel[] = [];
    orginalStaff: UserModel[] = [];

    constructor(private staffHandler: StaffHandler, private router: Router) {

    }

    editStaff(id: string) {
        this.router.navigate(['/staff/edit/' + id]);
    }

    orderByName() {
        if (this.nameOrderDir == undefined) {
            this.nameOrderDir = this.statusOrderDir = this.emailOrderDir;


        }
        if (this.nameOrderDir) {
            this.allStaff.sort((a, b) => a.username.toLowerCase() < b.username.toLowerCase() ? -1 : 1);

        } else {
            this.allStaff.sort((a, b) => a.username.toLowerCase() > b.username.toLowerCase() ? -1 : 1);
        }
        this.nameOrderDir = !this.nameOrderDir;

    }

    orderByLocation() {
        if (this.locationOrderDir == undefined) {
            this.nameOrderDir = this.statusOrderDir = this.typeOrderDir = this.emailOrderDir = this.locationOrderDir = this.emailOrderDir = undefined;

        }
        if (this.locationOrderDir) {
            this.allStaff.sort((a, b) => a.location.toLowerCase() < b.location.toLowerCase() ? -1 : 1);

        } else {
            this.allStaff.sort((a, b) => a.location.toLowerCase() > b.location.toLowerCase() ? -1 : 1);
        }
        this.locationOrderDir = !this.locationOrderDir;

    }

    orderByEmail() {
        if (this.emailOrderDir == undefined) {
            this.nameOrderDir = this.statusOrderDir = this.emailOrderDir;
        }
        if (this.emailOrderDir) {
            this.allStaff.sort((a, b) => a.email < b.email ? -1 : 1);

        } else {
            this.allStaff.sort((a, b) => a.email > b.email ? -1 : 1);
        }
        this.emailOrderDir = !this.emailOrderDir;

    }

    orderByType() {
        if (this.typeOrderDir == undefined) {
            this.nameOrderDir = this.statusOrderDir = this.typeOrderDir = this.emailOrderDir = this.locationOrderDir = this.emailOrderDir = undefined;
        }
        if (this.typeOrderDir) {
            this.allStaff.sort((a, b) => a.clientType < b.clientType ? -1 : 1);

        } else {
            this.allStaff.sort((a, b) => a.clientType > b.clientType ? -1 : 1);
        }
        this.typeOrderDir = !this.typeOrderDir;

    }

    orderByStatus() {
        if (this.statusOrderDir == undefined) {
            this.nameOrderDir = this.statusOrderDir = this.typeOrderDir = this.emailOrderDir = this.locationOrderDir = this.emailOrderDir = undefined;
        }
        if (this.statusOrderDir) {
            this.allStaff.sort((a, b) => a.status < b.status ? -1 : 1);

        } else {
            this.allStaff.sort((a, b) => a.status > b.status ? -1 : 1);
        }
        this.statusOrderDir = !this.statusOrderDir;

    }

    orderByShope() {
        if (this.typeOrderDir == undefined) {
            this.nameOrderDir = this.statusOrderDir = this.typeOrderDir = this.emailOrderDir = this.locationOrderDir = this.emailOrderDir = undefined;
        }
        if (this.shopNameOrderDir) {
            this.allStaff.sort((a, b) => a.shopName.toLowerCase() < b.shopName.toLowerCase() ? -1 : 1);

        } else {
            this.allStaff.sort((a, b) => a.shopName.toLowerCase() > b.shopName.toLowerCase() ? -1 : 1);
        }
        this.shopNameOrderDir = !this.shopNameOrderDir;

    }

    filterByfield(set: any[], field: string, value: string) {

        let f = set.filter(it => it[field].toLowerCase().includes(value));

        return f;
    }

    filterBox(event) {
        let value = event.target.value;
        this.allStaff = this.orginalStaff;
        let as: UserModel[] = [];
        let fields = ['username', 'email'];
        for (let field of fields) {
            for (let t of this.filterByfield(this.allStaff, field, value)) {
                if (!as.includes(t)) {
                    as.push(t);
                }
            }
        }
        this.allStaff = as;

    }

    getAllStaff() {
        this.staffHandler.getAllStaff()
            .subscribe(data => {
                    this.allStaff = data.sort((a, b) => a.creationDate > b.creationDate ? -1 : 1);
                    this.orginalStaff = this.allStaff;
                }
                , errorCode => this.statusCode = errorCode);
    }


    deleteStaff(id: string) {

        this.preConfig();
        this.staffHandler.getStaffUserById(id)
            .subscribe(staff => {
                    this.staffToUpdate = staff;
                    this.staffToUpdate.status = 'deactivated';

                    this.staffHandler.updateStaffUser(this.staffToUpdate).subscribe(
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
