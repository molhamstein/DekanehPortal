import {Component, OnInit, TemplateRef} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {ConstService} from '../../../services/const.service';
import {Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {URLSearchParams} from '@angular/http';

@Component({
    selector: 'app-view-manufacturers',
    templateUrl: './view-manufacturers.component.html',
    styleUrls: ['./view-manufacturers.component.css']
})
export class ViewManufacturersComponent implements OnInit {
    data: any[];
    modalRef: BsModalRef;
    manTodelete: string;

  constructor(private  api: ApiService, private router: Router, private constants: ConstService, private modalService: BsModalService, private c: ConstService) {
    let param = new URLSearchParams();
    param.append('filter', '{"order": "creationDate DESC"}');
    this.api.get('/manufacturers', param).subscribe((data: any) => {
            if (data.status == 200)
                this.data = JSON.parse(data._body);
            else
                console.log(data.statusText);
        });
    }

    openModal(template: TemplateRef<any>, item) {
        this.manTodelete = item;
        this.modalRef = this.modalService.show(template, {class: 'modal-sm', backdrop: true, ignoreBackdropClick: true});
    }

    confirm(): void {
        this.deleteManufacturer(this.manTodelete);
    }

    decline(): void {
        this.modalRef.hide();
    }

    editManufacturer(item) {
        this.router.navigate(['manufacturers', item.id, 'edit']);
    }

    deleteManufacturer(item) {
        this.api.delete('/manufacturers', item.id).subscribe((res: any) => {
            if (res.status == 200) {
                // alert("success");
              let param = new URLSearchParams();
              param.append('filter', '{"order": "creationDate DESC"}');
              this.api.get('/manufacturers', param).subscribe((data: any) => {
                    if (data.status == 200) {
                        this.data = JSON.parse(data._body);
                        this.data = [...this.data];
                    } else
                        console.log(data.statusText);
                });
            } else
                alert('error in deletion');
        });
    }

    ngOnInit() {
    }

}
