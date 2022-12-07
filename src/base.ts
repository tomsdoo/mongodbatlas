// @ts-expect-error
import DigestFetch from "digest-fetch";

class MongoDbAtlasBase {
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

interface Project {
  clusterCount: number;
  created: string;
  id: string;
  links: Array<{
    href: string;
    rel: string;
  }>;
  name: string;
  orgId: string;

}

export class Projects extends MongoDbAtlasBase {
  constructor(publicKey: string, privateKey: string){
    super(publicKey, privateKey);
  }
  public async get(){
    const interval = 10;
    let page = 1;
    let items: any[] = [];
    while(true){
      const url = new URL(`${this.apiBaseUri}/groups`);
      Object.entries({
        itemsPerPage: interval,
        pageNum: page,
      }).forEach(([ key, value ]) => {
        url.searchParams.append(key, value.toString());
      });
      const { results, totalCount } = await super.get(url.href);
      items = [
        ...items,
        ...results.map(({ id, name, links, orgId }: Project) => ({
          id,
          name,
          href: links.find(({ rel }) => rel === "self")?.href,
          orgId,
        })),
      ];
      if(items.length >= totalCount){
        break;
      }
      page++;
    }
    return items;
  }
 }
