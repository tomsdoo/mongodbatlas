import { Organization } from "./organization";
import { Organizations } from "./organizations";
import { Projects } from "./projects";
import { Project } from "./project";

export { Projects } from "./projects";
export { Project } from "./project";

export class MongoDbAtlas {
  protected publicKey: string;
  protected privateKey: string;
  protected _projects: Projects;
  protected _organizations: Organizations;
  constructor(publicKey: string, privateKey: string) {
    this.publicKey = publicKey;
    this.privateKey = privateKey;
    this._projects = new Projects(this.publicKey, this.privateKey);
    this._organizations = new Organizations(this.publicKey, this.privateKey);
  }
  public get organizations() {
    return this._organizations;
  }
  public get projects() {
    return this._projects;
  }
  public organization(orgId: string) {
    return new Organization(this.publicKey, this.privateKey, orgId);
  }
  public project(projectId: string) {
    return new Project(this.publicKey, this.privateKey, projectId);
  }
}
