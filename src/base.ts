// @ts-expect-error
import DigestFetch from "digest-fetch";

export class MongoDbAtlasBase {
  protected apiBaseUri: string;
  protected publicKey: string;
  protected privateKey: string;
  constructor(publicKey: string, privateKey: string){
    this.apiBaseUri = "https://cloud.mongodb.com/api/atlas/v1.0";
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }
  protected getClient(){
    return new DigestFetch(this.publicKey, this.privateKey);
  }
  protected async sendCore(method: string, url: string, body?: any){
    return await this.getClient().fetch(url, {
      method,
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    })
      .then((res: any) => res.json());
  }
  public async get(url: string){
    return await this.sendCore("GET", url);
  }
  public async post(url: string, body: any){
    return await this.sendCore("POST", url, body);
  }
  public async put(url: string, body: any){
    return await this.sendCore("PUT", url, body);
  }
  public async delete(url: string){
    return await this.sendCore("DELETE", url);
  }
}
