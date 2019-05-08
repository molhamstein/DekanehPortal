export class ProductModel {
    public nameAr: string;
    public nameEn: string;
    public pack: string;
    public description: string;
    public horecaPrice: number;
    public consumerPrice: number
    public wholeSalePrice: number;
    public horecaPriceDiscount: number;
    public consumerPriceDiscount: number
    public wholeSalePriceDiscount: number;
    public isFeatured: boolean;
    public isOffer: boolean;
    public availableTo: string;
    public status: string;
    public offerSource: string;
    public offerMaxQuantity: number;
    public code: string;
    public sku: string;
    public id: string;
    public creationDate: string;
    public categoryId: string;
    public subCategoryId: string;
    public productAbstractId: string;
    public parentCount: number
    public manufacturerId: string;
    public offersIds: string[];
    public tagsIds: string[];
    public media: Media;
    public offerProducts: OfferProducts[];

    constructor(nameAr: string, nameEn: string, pack: string, description: string, horecaPrice: number, wholeSalePrice: number, horecaPriceDiscount: number, wholeSalePriceDiscount: number, isFeatured: boolean, isOffer: boolean, availableTo: string, status: string, offerSource: string, offerMaxQuantity: number, code: string, sku: string, categoryId: string, subCategoryId: string, offersIds: string[], tagsIds: string[], media: Media, offerProducts: OfferProducts[], manufacturerId: string, productAbstractId: string, parentCount: number,consumerPrice:number,consumerPriceDiscount:number) {
        this.nameAr = nameAr;
        this.nameEn = nameEn;
        this.pack = pack;
        this.description = description;
        this.horecaPrice = horecaPrice;
        this.wholeSalePrice = wholeSalePrice;
        this.horecaPriceDiscount = horecaPriceDiscount;
        this.wholeSalePriceDiscount = wholeSalePriceDiscount;
        this.isFeatured = isFeatured;
        this.isOffer = isOffer;
        this.availableTo = availableTo;
        this.status = status;
        this.offerSource = offerSource;
        this.offerMaxQuantity = offerMaxQuantity;
        this.code = code;
        this.sku = sku;
        this.categoryId = categoryId;
        this.subCategoryId = subCategoryId;
        this.offersIds = offersIds;
        this.tagsIds = tagsIds;
        this.media = media;
        this.offerProducts = offerProducts;
        this.manufacturerId = manufacturerId;
        this.productAbstractId = productAbstractId || ""
        this.parentCount = parentCount || 0
        this.consumerPriceDiscount=consumerPriceDiscount||0
        this.consumerPrice=consumerPrice||0
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

