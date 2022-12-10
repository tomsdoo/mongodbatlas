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
  constructor(publicKey: string, privateKey: string) {
    super(publicKey, privateKey);
    this.apiBaseUri = `${this.apiBaseUri}/groups`;
  }
  public async getAll() {
    return await super.getAll({
      transform: ({ id, name, links, orgId }: Project) => ({
        id,
        name,
        href: links.find(({ rel }) => rel === "self")?.href,
        orgId,
      }),
    });
  }

  public async add(orgId: string, name: string) {
    return await this.post(this.apiBaseUri, {
      name,
      orgId,
    });
  }
}
