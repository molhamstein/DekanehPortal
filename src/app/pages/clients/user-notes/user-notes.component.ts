import { AlertService } from './../../../services/alert.service';
import { ClientsHandler } from './../clients-handler';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-user-notes',
    templateUrl: 'user-notes.component.html',
    styleUrls: ['user-notes.component.scss']
})
export class UserNotesComponent {
    @Input() clientIdAddNote: string;
    submiteddAddNote;
    notes;
    userNotForm = new FormGroup({
        createdAt: new FormControl(new Date(), Validators.required),
        note: new FormControl("", Validators.required),
    });

    ngOnInit() {
        this.ClientHandler.getNotClientUserById(this.clientIdAddNote).subscribe(notes => {
            this.notes = notes
        })
    }

    deleteNote(id, index) {
        this.ClientHandler.deleteNote(id).subscribe(res => {
            this.ClientHandler.getNotClientUserById(this.clientIdAddNote).subscribe(notes => {
                this.notes = notes
            })
        })
    }
    constructor(private ClientHandler: ClientsHandler, private alert: AlertService) {
    }
    open(modal, id) {
        this.userNotForm = new FormGroup({
            createdAt: new FormControl(new Date, Validators.required),
            note: new FormControl("", Validators.required),
        });
        modal.show()
    }

    addNote(modal) {
        if (this.userNotForm.valid == false) {
            this.submiteddAddNote = true;
            return
        }
        var data = this.userNotForm.value;
        data["userId"] = this.clientIdAddNote;
        this.ClientHandler.addNote(data).subscribe(
            successCode => {
                modal.hide();
                this.ClientHandler.getNotClientUserById(this.clientIdAddNote).subscribe(notes => {
                    this.notes = notes
                })
            },
            errorCode => this.showError()
        )
    }
    showError() {
        this.alert.showToast.next({ type: 'error' });
    }
}
