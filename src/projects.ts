import { MongoDbAtlasBase } from "./base";

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

interface Options {
  interval?: number;
}

export class Projects extends MongoDbAtlasBase {
  constructor(publicKey: string, privateKey: string){
    super(publicKey, privateKey);
  }
  public async getAll(options?: Options){
    const interval = options?.interval ?? 100;
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
      const { results, totalCount } = await this.get(url.href);
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
