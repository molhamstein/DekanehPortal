interface Ivalidator {
    validator: Object;
    name: String;
    message: string;

}

export interface field {
    title: string;
    name: string;
    type: string;
    crud: string;
    validators: Ivalidator[];
    apiName?: string;
    label?: string;
    value?: string;
    multiple?: boolean;
}
