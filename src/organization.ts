import { MongoDbAtlasBase } from "./base";

interface User {
  country: string;
  createdAt: string;
  emailAddress: string;
  firstname: string;
  id: string;
  lastAuth: string;
  lastName: string;
  links: Array<{
    href: string;
    rel: string;
  }>;
  mobileName: string;
  roles: Array<{
    groupId?: string;
    orgId?: string;
    roleName: string;
  }>,
  teamIds: string[];
  username: string;
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

export class Organization extends MongoDbAtlasBase {
  protected orgId: string;
  constructor(publicKey: string, privateKey: string, orgId: string) {
    super(publicKey, privateKey);
    this.orgId = orgId;
    this.apiBaseUri = `${this.apiBaseUri}/orgs/${orgId}`;
  }

  public async getUsers(): Promise<User[]> {
    return await this.getAll({
      url: `${this.apiBaseUri}/users`,
    });
  }

  public async getProjects(): Promise<Project[]> {
    return await this.getAll({
      url: `${this.apiBaseUri}/groups`,
    });
  }
}
