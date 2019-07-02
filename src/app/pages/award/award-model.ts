export class AwardModel {
    public id: string;
    public nameAr: string;
    public nameEn: string;
    public details: string;
    public from: string;
    public to: string;
    public occurrence: number;
    public occurrenceType: string;
    public times: number;
    public countLimit: number;
    public count: number;
    public clientTypes: string[];
    public areaIds: string[];
    public action: {};
    public coupons: {}[];
    public prizes:{}[]

    constructor(id: string, nameAr: string, nameEn: string, details: string, subCategoryId: string, manufacturerId: string, media: any, officialMassMarketPrice: number, officialConsumerPrice: number) {
        this.id = id;
        this.nameAr = nameAr;
        this.nameEn = nameEn;
        // this.officialMassMarketPrice = officialMassMarketPrice;
        // this.officialConsumerPrice = officialConsumerPrice;
        this.details = details;
        // this.subCategoryId = subCategoryId;
        // this.media = media;
        // this.manufacturerId = manufacturerId
    }
}

// export class Media {
//     public url: string;
//     public jpgUrl: string;
//     public thumbnail: string;
//     public id: string;
// }

// export class OfferProducts {
//     public quantity: number;
//     public productId: string;
//     public id: string;
// }

