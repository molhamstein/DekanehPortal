export class DamagedProductModel {
    public id: string;
    public damageProducts = []
    public reason: string;
    public note: string;
    public date: Date;

    constructor(id: string, products, reason: string, date: Date, note: string) {
        this.id = id;
        this.damageProducts = products
        this.note = note;
        this.reason = reason;
        this.date = date;
    }
}


