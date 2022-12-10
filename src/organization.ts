import { MongoDbAtlasBase } from "./base";

export class Organization extends MongoDbAtlasBase {
  protected orgId: string;
  constructor(publicKey: string, privateKey: string, orgId: string){
    super(publicKey, privateKey);
    this.orgId = orgId;
    this.apiBaseUri = `${this.apiBaseUri}/orgs`;
  }
}
