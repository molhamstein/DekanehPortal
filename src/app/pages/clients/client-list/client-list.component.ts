import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserModel } from '../../user-model';
import { NavigationEnd, Router } from '@angular/router';
import { ClientsHandler } from '../clients-handler';
import { AlertService } from '../../../services/alert.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-client-list',
    templateUrl: './client-list.component.html',
    styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
    idTodelete;
    modalRef: BsModalRef;

    nameOrderDir;
    areaOrderDir;
    statusOrderDir;
    shopNameOrderDir;
    typeOrderDir;
    pageShow = true;

    phoneNumberOrderDir;
    locationOrderDir;
    statusCode: number;
    requestProcess = false;
    clientToUpdate = null;
    allClient: UserModel[] = [];
    originalClients: UserModel[] = [];
    currentPage = 4;
    page: number;
    returnedArray: UserModel[] = [];
    currentArray: UserModel[] = [];
    pages = 10;
    areas: any[];

    constructor(private modalService: BsModalService, private clientHandler: ClientsHandler, private router: Router, private alert: AlertService) {
        this.clientHandler.getAllAreas().finally(() => this.getAllClient()).subscribe(data => {
            this.areas = data;
        }
            , errorCode => this.showError());
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };

        this.router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
                this.router.navigated = false;
                window.scrollTo(0, 0);
            }
        }, errorCode => this.showError());
    }


    clientIdAddNote;
    submiteddAddNote;
    userNotForm = new FormGroup({
        createdAt: new FormControl(new Date(), Validators.required),
        note: new FormControl("", Validators.required),
    });
    open(modal, id) {
        this.userNotForm = new FormGroup({
            createdAt: new FormControl(new Date, Validators.required),
            note: new FormControl("", Validators.required),
        });
        this.clientIdAddNote = id
        modal.show()
    }

    addNote(modal) {
        if (this.userNotForm.valid == false) {
            this.submiteddAddNote = true;
            return
        }
        var data = this.userNotForm.value;
        data["userId"] = this.clientIdAddNote;
        this.clientHandler.addNote(data).subscribe(
            successCode => {
                modal.hide();
            },
            errorCode => this.showError()
        )
    }

    showError() {
        this.alert.showToast.next({ type: 'error' });
    }

    openModal(template: TemplateRef<any>, id) {
        this.idTodelete = id;
        this.modalRef = this.modalService.show(template, { class: 'modal-sm', backdrop: true, ignoreBackdropClick: true });
    }

    confirm(): void {
        this.deleteClient(this.idTodelete);
    }

    decline(): void {
        this.modalRef.hide();
    }
    pageChanged(event: any): void {
        const startItem = (event.page - 1) * event.itemsPerPage;
        const endItem = event.page * event.itemsPerPage;
        this.returnedArray = this.allClient.slice(startItem, endItem);
        this.currentArray = this.returnedArray;
    }

    editClient(id: string) {
        this.router.navigate(['/client/edit/' + id]);
    }

    orderByName() {
        if (this.nameOrderDir == undefined) {
            this.areaOrderDir = this.nameOrderDir = this.statusOrderDir = this.typeOrderDir = this.phoneNumberOrderDir = this.locationOrderDir = this.phoneNumberOrderDir = undefined;

        }
        if (this.nameOrderDir) {
            this.returnedArray.sort((a, b) => a.username.toLowerCase() < b.username.toLowerCase() ? -1 : 1);

        } else {
            this.returnedArray.sort((a, b) => a.username.toLowerCase() > b.username.toLowerCase() ? -1 : 1);
        }
        this.nameOrderDir = !this.nameOrderDir;

    }

    orderByArea() {
        if (this.areaOrderDir == undefined) {
            this.areaOrderDir = this.nameOrderDir = this.statusOrderDir = this.typeOrderDir = this.phoneNumberOrderDir = this.locationOrderDir = this.phoneNumberOrderDir = undefined;
        }
        if (this.areaOrderDir) {
            this.returnedArray.sort((a, b) => a.areaId.toLowerCase() < b.areaId.toLowerCase() ? -1 : 1);

        } else {
            this.returnedArray.sort((a, b) => a.areaId.toLowerCase() > b.areaId.toLowerCase() ? -1 : 1);
        }
        this.areaOrderDir = !this.areaOrderDir;

    }

    orderByLocation() {
        if (this.locationOrderDir == undefined) {
            this.areaOrderDir = this.nameOrderDir = this.statusOrderDir = this.typeOrderDir = this.phoneNumberOrderDir = this.locationOrderDir = this.phoneNumberOrderDir = undefined;


        }
        if (this.locationOrderDir) {
            this.returnedArray.sort((a, b) => a.location.toLowerCase() < b.location.toLowerCase() ? -1 : 1);

        } else {
            this.returnedArray.sort((a, b) => a.location.toLowerCase() > b.location.toLowerCase() ? -1 : 1);
        }
        this.locationOrderDir = !this.locationOrderDir;

    }

    orderByPhone() {
        if (this.phoneNumberOrderDir == undefined) {
            this.areaOrderDir = this.nameOrderDir = this.statusOrderDir = this.typeOrderDir = this.phoneNumberOrderDir = this.locationOrderDir = this.phoneNumberOrderDir = undefined;

        }
        if (this.phoneNumberOrderDir) {
            this.returnedArray.sort((a, b) => a.phoneNumber < b.phoneNumber ? -1 : 1);

        } else {
            this.returnedArray.sort((a, b) => a.phoneNumber > b.phoneNumber ? -1 : 1);
        }
        this.phoneNumberOrderDir = !this.phoneNumberOrderDir;

    }

    orderByType() {
        if (this.typeOrderDir == undefined) {
            this.areaOrderDir = this.nameOrderDir = this.statusOrderDir = this.typeOrderDir = this.phoneNumberOrderDir = this.locationOrderDir = this.phoneNumberOrderDir = undefined;

        }
        if (this.typeOrderDir) {
            this.returnedArray.sort((a, b) => a.clientType < b.clientType ? -1 : 1);

        } else {
            this.returnedArray.sort((a, b) => a.clientType > b.clientType ? -1 : 1);
        }
        this.typeOrderDir = !this.typeOrderDir;

    }

    orderByStatus() {
        if (this.statusOrderDir == undefined) {
            this.areaOrderDir = this.nameOrderDir = this.statusOrderDir = this.typeOrderDir = this.phoneNumberOrderDir = this.locationOrderDir = this.phoneNumberOrderDir = undefined;

        }
        if (this.statusOrderDir) {
            this.returnedArray.sort((a, b) => a.status < b.status ? -1 : 1);

        } else {
            this.returnedArray.sort((a, b) => a.status > b.status ? -1 : 1);
        }
        this.statusOrderDir = !this.statusOrderDir;

    }

    orderByShope() {
        if (this.typeOrderDir == undefined) {
            this.areaOrderDir = this.nameOrderDir = this.statusOrderDir = this.typeOrderDir = this.phoneNumberOrderDir = this.locationOrderDir = this.phoneNumberOrderDir = undefined;

        }
        if (this.shopNameOrderDir) {
            this.returnedArray.sort((a, b) => a.shopName.toLowerCase() < b.shopName.toLowerCase() ? -1 : 1);

        } else {
            this.returnedArray.sort((a, b) => a.shopName.toLowerCase() > b.shopName.toLowerCase() ? -1 : 1);
        }
        this.shopNameOrderDir = !this.shopNameOrderDir;

    }

    filterByfield(set: any[], field: string, value: string) {
        // let f = set.some(it => it[field].includes(value));
        let f = set.filter(function (it) {
            if (it[field] && it[field].toLowerCase().includes(value))
                return it
        });
        return f;
    }

    filterBox(event) {
        let value = event.target.value;
        this.pageShow = false;
        if (value.length == 0) {
            this.getAllClient();
            this.pageShow = true;

        } else {
            this.returnedArray = this.currentArray;
            let as: UserModel[] = [];
            let fields = ['shopName', 'areaId'];
            for (let field of fields) {
                for (let t of this.filterByfield(this.originalClients, field, value)) {
                    if (!as.includes(t)) {
                        as.push(t);
                    }
                }
            }
            this.returnedArray = as;
        }
    }

    getAllClient() {
        this.clientHandler.getAllClient()
            .finally(() => {
                this.returnedArray = this.allClient.slice(0, this.pages);
                this.currentArray = this.returnedArray;
                console.log(this.returnedArray);
            })
            .subscribe(data => {
                for (let user of data) {
                    if (user.areaId != undefined) {
                        let uid = user.areaId;
                        user.areaId = this.areas.find(x => x.id === uid).nameAr;

                    } else {
                        user.areaId = '';
                    }

                }

                this.allClient = data.sort((a, b) => a.creationDate > b.creationDate ? -1 : 1);
                this.originalClients = this.allClient;
            }
                , errorCode => this.showError());


    }


    deleteClient(id: string) {

        this.preConfig();
        this.clientHandler.getClientUserById(id).finally(() => {
            this.modalRef.hide();
            this.router.navigate(['/client/list']);

        })
            .subscribe(client => {
                this.clientToUpdate = client;
                this.clientToUpdate.status = 'deactivated';

                this.clientHandler.updateClientUser(this.clientToUpdate).subscribe(
                    successCode => {
                        this.statusCode = 200;
                        this.allClient = this.originalClients;
                        // this.backToCreateArticle();
                    },
                    errorCode => this.showError()
                );
            },
                errorCode => this.showError());

    }

    changepages(event) {
        this.pages = event.target.value;
        this.returnedArray = this.allClient.slice(0, this.pages);
        this.currentArray = this.returnedArray;
        setTimeout(() => {
            this.currentPage = 1;
        }, 50);


    }

    ngOnInit() {
    }

    preConfig() {
        this.statusCode = null;
        this.requestProcess = true;
    }
}
