export class ProductModel {
  public nameAr: string;
  public nameEn: string;
  public pack: string;
  public description: string;
  public horecaPrice: number;
  public wholeSalePrice: number;
  public wholeSaleMarketPrice: number;
  public marketOfficialPrice: number;
  public dockanBuyingPrice: number;
  public horecaPriceDiscount: number;
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
  public categoryId: string;
  public subCategoryId: string;
  public offersIds: string[];
  public tagsIds: string[];
  public media: Media;
  public offerProducts: OfferProducts[];
}

export class Media {
  public url: string;
  // type: image;
  public thumbnail: string;
  public id: string;
}

export class OfferProducts {
  public quantity: number;
  public productId: string;
  public id: string;
}

