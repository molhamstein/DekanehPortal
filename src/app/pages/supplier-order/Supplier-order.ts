import { Coupon } from '../coupons/coupon';

export class SupplierOrder {
    note: string;
    products: SupplierOrderProduct[];
    status: string;
    id:string
    supplierId:string
    constructor(data) {
        this.id = data.id || null
        this.note = data.note || ""
        this.products = data.products || []
        this.status = data.status || "pending"
        this.supplierId=data.supplierId
    }
}
export class SupplierOrderProduct {
    count: number;
    buyingPrice: number;
    productAbstractId: string
}
