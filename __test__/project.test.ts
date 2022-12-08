import { afterEach, beforeEach, describe, it, expect, jest } from "@jest/globals";
import { MongoDbAtlasBase } from "@/base";
import { Project } from "@/project";

describe("Project", () => {
  const publicKey = "dummyPublicKey";
  const privateKey = "dummyPrivateKey";
  const projectId = "dummyProjectId";

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {});

  it("inherits MongoDbAtlasBase", () => {
    expect(new Project(publicKey, privateKey, projectId) instanceof MongoDbAtlasBase).toBe(true);
  });

  it("has publicKey", () => {
    expect(new Project(publicKey, privateKey, projectId)).toHaveProperty("publicKey", publicKey);
  });

  it("has privateKey", () => {
    expect(new Project(publicKey, privateKey, projectId)).toHaveProperty("privateKey", privateKey);
  });

  it("has projectId", () => {
    expect(new Project(publicKey, privateKey, projectId)).toHaveProperty("projectId", projectId);
  });

  it("get()", async () => {
    const mockedProject = {
      name: "dummyProjectName",
    };
    const spyBaseGet = jest
      .spyOn(MongoDbAtlasBase.prototype, "get")
      .mockReturnValue(Promise.resolve(mockedProject));
    const instance = new Project(publicKey, privateKey, projectId);
    expect(await instance.get()).toEqual(mockedProject);
    expect(spyBaseGet).toHaveBeenCalledWith(`${instance.apiBaseUri}/groups/${projectId}`);
  });
});
