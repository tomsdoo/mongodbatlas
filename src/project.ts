import { MongoDbAtlasBase } from "./base";
import { Clusters } from "./clusters";
import { Cluster } from "./cluster";

interface ClusterInfo {
  autoScaling: {
    autoIndexingEnabling: boolean;
    compute: object;
    diskGBEnabled: boolean;
  };
  backupEnabled: boolean;
  biConnector: {
    enabled: boolean;
    readPreference: string;
  };
  clusterType: string;
  connectionStrings: {
    standard: string;
    standardSrv: string;
  };
  createDate: string;
  diskSizeGB: number;
  encryptionAtRestProvider: string;
  groupId: string;
  id: string;
  labels: string[];
  links: Array<{
    href: string;
    rel: string;
  }>;
  mongoDBMajorVersion: string;
  mongoDBVersion: string;
  mongoURI: string;
  mongoURIUpdated: string;
  mongoURIWithOptions: string;
  name: string;
  numShards: number;
  paused: boolean;
  pitEnabled: boolean;
  privderBackupEnabled: boolean;
  providerSettings: {
    providerName: string;
    autoScaling: object;
    backingProviderName: string;
    regionName: string;
    instanceSizeName: string;
  };
  replicationFactor: number;
  replicationSpec: object;
  replicationSpecs: object[];
  rootCertType: string;
  srvAddress: string;
  stateName: string;
  terminationProtectionEnabled: boolean;
  versionReleaseSystem: string;
}

interface DatabaseUser {
  awsIAMType: string;
  databaseName: string;
  groupId: string;
  labels: any[];
  ldapAuthType: string;
  links: Array<{
    href: string;
    rel: string;
  }>;
  roles: Array<{
    databaseName: string;
    roleName: string;
  }>;
  scopes: any[];
  username: string;
  x509Type: string;
}

interface Access {
  cidrBlock: string;
  comment: string;
  groupId: string;
  links: Array<{
    href: string;
    rel: string;
  }>;
}

export class Project extends MongoDbAtlasBase {
  protected projectId: string;
  protected _clusters: Clusters;
  constructor(publicKey: string, privateKey: string, projectId: string) {
    super(publicKey, privateKey);
    this.projectId = projectId;
    this.apiBaseUri = `${this.apiBaseUri}/groups/${projectId}`;
    this._clusters = new Clusters(publicKey, privateKey, projectId);
  }

  public get clusters(): Clusters {
    return this._clusters;
  }

  public cluster(clusterName: string): Cluster {
    return new Cluster(
      this.publicKey,
      this.privateKey,
      this.projectId,
      clusterName
    );
  }

  public async get(url?: string): Promise<any> {
    return await super.get(url ?? this.apiBaseUri);
  }

  public async getFreeClusters(): Promise<ClusterInfo[]> {
    return await super
      .get(`${this.apiBaseUri}/clusters`)
      .then(({ results }) =>
        results.filter(
          (cluster: any) => cluster?.providerSettings?.instanceSizeName === "M0"
        )
      );
  }

  public async getUsers(): Promise<DatabaseUser[]> {
    return await this.getAll({
      url: `${this.apiBaseUri}/databaseUsers`,
    });
  }

  public async addAdminUser(
    username: string,
    password: string
  ): Promise<DatabaseUser> {
    return await this.post(`${this.apiBaseUri}/databaseUsers`, {
      databaseName: "admin",
      groupId: this.projectId,
      roles: [{ databaseName: "admin", roleName: "atlasAdmin" }],
      username,
      password,
    });
  }

  public async removeAdminUser(username: string): Promise<{ status: number }> {
    return await this.delete(
      `${this.apiBaseUri}/databaseUsers/admin/${username}`
    );
  }

  public async getIPs(): Promise<Access[]> {
    return await this.getAll({
      url: `${this.apiBaseUri}/accessList`,
    });
  }

  public async addIP(
    ip: string
  ): Promise<{ totalCount: number; results: Access[] }> {
    return await this.post(`${this.apiBaseUri}/accessList`, [
      {
        cidrBlock: ip,
      },
    ]);
  }

  public async removeIP(ip: string): Promise<{ status: number }> {
    return await this.delete(
      `${this.apiBaseUri}/accessList/${encodeURIComponent(ip)}`
    );
  }
}
