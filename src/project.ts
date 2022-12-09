import { MongoDbAtlasBase } from "./base";

export class Project extends MongoDbAtlasBase {
  protected projectId: string;
  constructor(publicKey: string, privateKey: string, projectId: string){
    super(publicKey, privateKey);
    this.projectId = projectId;
    this.apiBaseUri = `${this.apiBaseUri}/groups/${projectId}`;
  }
  public async get(url?: string){
    return await super.get(url ?? this.apiBaseUri);
  }
  public async getFreeClusters(){
    return await super.get(`${this.apiBaseUri}/clusters`)
      .then(({ results }) => results.filter((cluster: any) => cluster?.providerSettings?.instanceSizeName === "M0"));
  }
  public async getUsers(){
    return await this.getAll({
      url: `${this.apiBaseUri}/databaseUsers`
    });
  }
}
