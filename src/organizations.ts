import { MongoDbAtlasBase } from "@/base";

export class Organizations extends MongoDbAtlasBase {
  constructor(publicKey: string, privateKey: string) {
    super(publicKey, privateKey);
    this.apiBaseUri = `${this.apiBaseUri}/orgs`;
  }
}
