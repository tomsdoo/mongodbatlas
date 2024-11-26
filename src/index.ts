import { Organization } from "./organization";
import { Organizations } from "./organizations";
import { Project } from "./project";
import { Projects } from "./projects";

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

  public get organizations(): Organizations {
    return this._organizations;
  }

  public get projects(): Projects {
    return this._projects;
  }

  public organization(orgId: string): Organization {
    return new Organization(this.publicKey, this.privateKey, orgId);
  }

  public project(projectId: string): Project {
    return new Project(this.publicKey, this.privateKey, projectId);
  }
}
