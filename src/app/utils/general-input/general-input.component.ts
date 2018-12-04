import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {isString} from 'util';

@Component({
    selector: 'general-input',
    templateUrl: './general-input.component.html',
    styleUrls: ['./general-input.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => GeneralInputComponent),
        multi: true
    }]
})
export class GeneralInputComponent implements OnInit, ControlValueAccessor {
    @Input() type;
    @Input() title;
    @Input() name;
    @Input() field;
    @Input() items;
    @Input('label') bindLabel = 'label';
    @Input('value') bindValue = 'id';
    @Input() icon = '';
    @Input() extentions = [];
    validators = [];

    constructor() {
    }

    _value;

    get value() {
        return this._value;
    }

    set value(v) {
        this._value = v;
        this.onChange(v);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    onChange = (values) => {
    };

    onTouched = () => {
    };

    setDisabledState(isDisabled: boolean): void {
    }

    writeValue(obj: any): void {
        this._value = obj;
    }

    ngOnInit() {

    }

    ngOnChanges() {
        if (this.field) {
            this.name = this.field['name'];
            this.type = this.field['type'];
            this.title = this.field['title'];
            this.validators = this.field['validators'];
        } else {
            this.field = {};
            this.field['name'] = this.name;
            this.field['type'] = this.type;
            this.field['title'] = this.title;
            this.field['validators'] = this.validators;
            this.field['value'] = this.bindValue;
            this.field['label'] = this.bindLabel;

            if (this.items) {
                if (!isString(this.items[0]))
                    this.field['items'] = this.items;
                else {
                    this.field['items'] = this.items.map((v) => {
                        const temp = {};
                        temp[this.bindLabel] = v;
                        temp[this.bindValue] = v;
                        return temp;
                    });
                }
            }
        }


    }


}
