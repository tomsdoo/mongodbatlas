import { MongoDbAtlasBase } from "@/base";

export class Cluster extends MongoDbAtlasBase {
  protected projectId: string;
  protected clusterName: string;
  constructor(
    publicKey: string,
    privateKey: string,
    projectId: string,
    clusterName: string,
  ) {
    super(publicKey, privateKey);
    this.projectId = projectId;
    this.clusterName = clusterName;
    this.apiBaseUri = `${this.apiBaseUri}/groups/${projectId}/clusters/${clusterName}`;
  }
}
