import { Projects } from "./projects";
import { Project } from "./project";

export { Projects } from "./projects";
export { Project } from "./project";

export class MongoDbAtlas {
  protected publicKey: string;
  protected privateKey: string;
  protected _projects: Projects;
  constructor(publicKey: string, privateKey: string){
    this.publicKey = publicKey;
    this.privateKey = privateKey;
    this._projects = new Projects(this.publicKey, this.privateKey);
  }
  public get projects(){
    return this._projects;
  }
  public project(projectId: string){
    return new Project(this.publicKey, this.privateKey, projectId);
  }
}