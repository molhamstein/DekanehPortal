import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {FieldService} from '../field.service';

// import {PrivilegeService} from "../../../../../workflow/src/app/services/privilege/privilege.service";
@Component({
    selector: 'my-table',
    templateUrl: './my-table.component.html',
    styleUrls: ['./my-table.component.scss']
})

export class MyTableComponent implements OnInit {

    @Input() loading = true;
    @Input() showHeader = true;
    @Input('rows') data;
    @Input('cols') cols;
    @Input('actions') actions: any[];
    @HostBinding('style.font-size')
    @Input() fontSize = '12px';
    @Input('showIndex') showIndex = false;
    // @Input('index') index=false;
    headerColorValue;
    @Output() selectedChange = new EventEmitter();
    private selectedValue;

    constructor(private fieldService: FieldService) {

    }

    get headeColor() {
        return this.headerColorValue;
    }

    @Input() set headeColor(val) {

        this.headerColorValue = val;
    }

    @Input('selected') get selected() {
        return this.selectedValue;
    };

    set selected(i: number) {
        this.selectedValue = i;
        this.selectedChange.emit(i);
    }

    onAction() {

    }

    ngOnInit() {
        if (!this.headerColorValue) {
            this.headeColor = '#395870';
        }

        // if(this.index && this.data)
        //   for(var i=0;i<this.data.length;i++)
        //   {
        //     this.data[i]['index']=i;
        //   }
    }

    // ngOnChanges()
    // {
    //   this.ngOnInit();
    // }
}
