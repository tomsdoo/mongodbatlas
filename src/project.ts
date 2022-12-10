import { MongoDbAtlasBase } from "./base";
import { Clusters } from "./clusters";
import { Cluster } from "./cluster";

export class Project extends MongoDbAtlasBase {
  protected projectId: string;
  protected _clusters: Clusters;
  constructor(publicKey: string, privateKey: string, projectId: string) {
    super(publicKey, privateKey);
    this.projectId = projectId;
    this.apiBaseUri = `${this.apiBaseUri}/groups/${projectId}`;
    this._clusters = new Clusters(publicKey, privateKey, projectId);
  }
  public get clusters() {
    return this._clusters;
  }
  public cluster(clusterName: string) {
    return new Cluster(
      this.publicKey,
      this.privateKey,
      this.projectId,
      clusterName
    );
  }
  public async get(url?: string) {
    return await super.get(url ?? this.apiBaseUri);
  }
  public async getFreeClusters() {
    return await super
      .get(`${this.apiBaseUri}/clusters`)
      .then(({ results }) =>
        results.filter(
          (cluster: any) => cluster?.providerSettings?.instanceSizeName === "M0"
        )
      );
  }
  public async getUsers() {
    return await this.getAll({
      url: `${this.apiBaseUri}/databaseUsers`,
    });
  }
  public async addAdminUser(username: string, password: string) {
    return await this.post(`${this.apiBaseUri}/databaseUsers`, {
      databaseName: "admin",
      groupId: this.projectId,
      roles: [{ databaseName: "admin", roleName: "atlasAdmin" }],
      username,
      password,
    });
  }
  public async removeAdminUser(username: string) {
    return await this.delete(
      `${this.apiBaseUri}/databaseUsers/admin/${username}`
    );
  }
  public async getIPs() {
    return await this.getAll({
      url: `${this.apiBaseUri}/accessList`,
    });
  }
  public async addIP(ip: string) {
    return await this.post(`${this.apiBaseUri}/accessList`, [
      {
        cidrBlock: ip,
      },
    ]);
  }
  public async removeIP(ip: string) {
    return await this.delete(
      `${this.apiBaseUri}/accessList/${encodeURIComponent(ip)}`
    );
  }
}
