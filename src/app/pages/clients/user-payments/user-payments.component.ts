import { ConstService } from './../../../services/const.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientsHandler } from './../clients-handler';
import { Component, Input } from '@angular/core';
import { AlertService } from '../../../services/alert.service';

@Component({
    selector: 'app-user-payments',
    templateUrl: 'user-payments.component.html',
    styleUrls: ['user-payments.component.scss']
})
export class UserPaymentsComponent {
    @Input() userId: string;
    @Input() balance: number;

    allInstallment = []
    pages = 20;
    currentPage = 1;
    indexEditIns = -1;
    installmentCount=0;
    constructor(private c: ConstService, private ClientHandler: ClientsHandler, private alert: AlertService) {

    }

    editableIns = { "amount": 0, "receivedAt": "" };
    editInstallment(index) {
        this.indexEditIns = index;

        this.editableIns['amount'] = this.allInstallment[this.indexEditIns].amount;
        this.editableIns['receivedAt'] = this.c.inputFormatData(this.allInstallment[this.indexEditIns].receivedAt);
    }

    pageChanged(event: any): void {

        setTimeout(() => {
            this.getInstallment();


        }, 50);

    }

    changepages(event) {

        this.pages = event.target.value;
        setTimeout(() => {
          this.currentPage = 1;
        }, 50);
        this.ngOnInit();
    
    
      }
    ngOnInit() {
        this.ClientHandler.getInstallmentCount(this.userId).finally(() => {
            this.getInstallment();
        }).subscribe(co => {
            this.installmentCount = co['count'];
        }, errorCode => this.showError());
        this.getInstallment()
    }


    showError() {
        this.alert.showToast.next({ type: 'error' });
    }


    getInstallment() {

        this.ClientHandler.getInstallment(this.userId, this.pages, this.currentPage).finally(() => {

        })
            .subscribe(data => {
                this.allInstallment = data;
            }
                , errorCode => this.showError());
    }



    instForm = new FormGroup({
        receivedAt: new FormControl("2019-01-01T01:00", Validators.required),
        amount: new FormControl(0, Validators.required),
    });





    saveInstallment() {
        this.ClientHandler.updateInstallment(this.allInstallment[this.indexEditIns].id, this.editableIns).subscribe(
            successCode => {
                this.indexEditIns = -1
                this.currentPage = 1;
                this.getInstallment()
            },
            errorCode => this.showError()
        )
    }
    openInstallmentModal(modal) {
        this.instForm = new FormGroup({
            receivedAt: new FormControl("2019-01-01T01:00", Validators.required),
            amount: new FormControl(0, Validators.required),
        });
        modal.show()
        // this.modalRef = this.modalService.show(modal, { class: 'modal-sm', backdrop: true, ignoreBackdropClick: true });
    }
    submiteddAddInst;
    addInstallment(modal) {
        if (this.instForm.valid == false) {
            this.submiteddAddInst = true;
            return
        }
        var data = this.instForm.value;
        data["userId"] = this.userId;
        this.ClientHandler.addInstallment(data).subscribe(
            successCode => {
                modal.hide();
                this.currentPage = 1;
                this.getInstallment()
            },
            errorCode => this.showError()
        )

    }
}
