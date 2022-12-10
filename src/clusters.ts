import { MongoDbAtlasBase } from "./base";

export class Clusters extends MongoDbAtlasBase {
  constructor(publicKey: string, privateKey: string, projectId: string){
    super(publicKey, privateKey);
    this.apiBaseUri = `${this.apiBaseUri}/groups/${projectId}/clusters`;
  }
}
