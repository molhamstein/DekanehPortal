export class UserModel {
  public id: string;
  public phoneNumber: string;
  public status: string;
  public email: string;
  public clientType: string;
  public ownerName: string;
  public shopName: string;
  public location: string;
  public notes: string;
  public creationDate: string;
  public realm: string;
  public username: string;
  public emailVerified: boolean;
  public created: string;
  public lastUpdated: string;
  public areaId: string;
  public locationPoint: any;
  public roleIds: string[];
  public privilegeIds: string[];
  public password: string;
  public static foo = 123;
  constructor() {

  }
}
