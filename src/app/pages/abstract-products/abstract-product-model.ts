export class AbstractProductModel {
    public id: string;
    public nameAr: string;
    public nameEn: string;
    public categoryId: string;
    public officialMassMarketPrice: number;
    public officialConsumerPrice: number;
    public subCategoryId: string;
    public manufacturerId: string;
    public media: Media;

    constructor(id: string, nameAr: string, nameEn: string, categoryId: string, subCategoryId: string, manufacturerId: string, media: Media, officialMassMarketPrice: number, officialConsumerPrice: number) {
        this.id = id;
        this.nameAr = nameAr;
        this.nameEn = nameEn;
        this.officialMassMarketPrice = officialMassMarketPrice;
        this.officialConsumerPrice = officialConsumerPrice;
        this.categoryId = categoryId;
        this.subCategoryId = subCategoryId;
        this.media = media;
        this.manufacturerId = manufacturerId
    }
}

export class Media {
    public url: string;
    public jpgUrl: string;
    public thumbnail: string;
    public id: string;
}

export class OfferProducts {
    public quantity: number;
    public productId: string;
    public id: string;
}

