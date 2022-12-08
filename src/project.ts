import { MongoDbAtlasBase } from "./base";

export class Project extends MongoDbAtlasBase {
  protected projectId: string;
  constructor(publicKey: string, privateKey: string, projectId: string){
    super(publicKey, privateKey);
    this.projectId = projectId;
  }
  public async get(){
    return await super.get(`${this.apiBaseUri}/groups/${this.projectId}`);
  }
}
