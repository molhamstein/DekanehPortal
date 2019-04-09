export class DamagedProductModel {
    public id: string;
    public abstractProductId: string;
    public count: number;
    public reason: string;
    public note: string;
    public date: Date;

    constructor(id: string, abstractProductId: string, count: number, reason: string, date: Date,note:string) {
        this.id = id;
        this.abstractProductId = abstractProductId;
        this.count = count;
        this.note = note;
        this.reason = reason;
        this.date = date;
    }
}


