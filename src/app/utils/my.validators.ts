export class myValidators {
    static extentionFile(ext: any[]) {
        return (file) => {
            if (!file.value)
                return null;
            var name = file.value['name'].match(/.+\.(.+)/)[1];
            if (ext.indexOf(name) == -1)
                return {extentionError: {message: 'invalid extention.  allowed extention: ' + ext.join(', ')}};
            return null;
        };

    }

    static rulesValidator(second = 'type', isvalue = true) {
        var lastValue = '';
        return (control: FormControl) => {
            if (!control.value)
                return null;
            if (!control.parent) {
                return null;
            }
            var other = control.parent.controls[second];
            if (!other.value) {
                return null;
            }

            if (lastValue != control.value) {
                setTimeout(() => {
                    other.setValue(other.value);
                }, 0);
            }
            lastValue = control.value;
            if (isvalue) {
                var value = control.value;

                if (other.value == 'between') {
                    var regex = /^ *\d+ *- *\d+ *$/;
                    {
                        if (!regex.exec(value)) {
                            return {
                                rulesValidator: {
                                    message: 'value should be in form \'decimal - decimal\''
                                }

                            };
                        }
                    }
                }


                if (['=', '<=', '>=', '>', '<'].indexOf(other.value) >= 0) {
                    var regex = /^ *\d+ *$/;
                    {
                        if (!regex.exec(value)) {
                            return {
                                rulesValidator: {
                                    message: 'value should be in form \'decimal\''
                                }

                            };
                        }
                    }
                }
            }
        };

    }
}

import {FormControl} from '@angular/forms';