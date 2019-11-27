import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'note-and-payments',
    templateUrl: 'note-and-payments.component.html',
    styleUrls: ['note-and-payments.component.scss']
})
export class NoteAndPaymentsComponent {
    @Input() userId: string;
    @Input() user: any;
    currentTab = "inst"
    ngOnInit() {
    }

    constructor(public activeModal: NgbActiveModal) {
    }

    close() {
        this.activeModal.close()
    }
}
