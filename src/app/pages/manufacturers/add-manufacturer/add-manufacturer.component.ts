import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../services/api.service';
import {TranslateService} from '@ngx-translate/core';
import {ConstService} from '../../../services/const.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-add-manufacturer',
    templateUrl: './add-manufacturer.component.html',
    styleUrls: ['./add-manufacturer.component.css']
})
export class AddManufacturerComponent implements OnInit {
    manufacturerForm: FormGroup;
    submitted: boolean = false;
    id;
    code = '';
    nameAr = '';
    nameEn = '';

    constructor(private route: ActivatedRoute, private c: ConstService, private router: Router, private api: ApiService, public translate: TranslateService) {
        this.route.params.subscribe(params => {
            if (params['id'] != undefined) {
                this.id = params['id'];
            }
        });
    }

    // click:boolean=true:
    addManufactur() {
        this.submitted = true;
        let hasError: boolean;
        for (var key in this.manufacturerForm.controls) {
            // check if the property/key is defined in the object itself, not in parent
            if (this.manufacturerForm.controls.hasOwnProperty(key)) {
                if (this.manufacturerForm.controls[key].invalid) {
                    hasError = true;
                    break;
                }
            }
        }
        if (!hasError) {
            if (this.id == undefined) {
                this.api.post('/manufacturers', this.manufacturerForm.value).subscribe((res) => {
                    if (res.status == 200) {
                        console.log(res);
                        this.router.navigate(['manufacturers', 'view']);
                    } else {
                        alert(res.statusText);
                    }
                });
            } else {
                this.api.put('/manufacturers/' + this.id, this.manufacturerForm.value).subscribe((res) => {
                    if (res.status == 200) {
                        console.log(res);
                        this.router.navigate(['manufacturers', 'view']);
                    } else {
                        alert(res.statusText);
                    }
                });
            }
        } else {
            alert(this.c.translateUtterance('Manufactures.errorInForm'));
        }
    }

    ngOnInit() {
        this.manufacturerForm = new FormGroup({
            nameAr: new FormControl('', [Validators.required,]),
            nameEn: new FormControl('', [Validators.required,]),
            code: new FormControl('', [Validators.required,]),
        });
        if (this.id != undefined) {
            this.api.get('/manufacturers').subscribe((data: any) => {
                if (data.status == 200)
                    JSON.parse(data._body).map((man: any) => {
                        if (man.id == this.id) {
                            this.manufacturerForm = new FormGroup({
                                nameAr: new FormControl(man.nameAr, [Validators.required,]),
                                nameEn: new FormControl(man.nameEn, [Validators.required,]),
                                code: new FormControl(man.code, [Validators.required,]),
                            });
                        }
                    });
                else
                    console.log(data.statusText);
            });
        }
    }
}

