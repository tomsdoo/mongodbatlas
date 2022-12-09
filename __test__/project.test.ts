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

  it("has apiBaseUri", () => {
    const mongoDbAtlasBase = new MongoDbAtlasBase(publicKey, privateKey);
    const instance = new Project(publicKey, privateKey, projectId);
    expect(instance).toHaveProperty("apiBaseUri", `${mongoDbAtlasBase.apiBaseUri}/groups/${projectId}`);
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
    expect(spyBaseGet).toHaveBeenCalledWith(instance.apiBaseUri);
  });

  it("getFreeClusters()", async () => {
    const mockedValue = {
      totalCount: 2,
      results: [
        {
          id: "dummyClusterId",
          providerSettings: {
            providerName: "TENANT",
            backingProviderName: "GCP",
            instanceSizeName: "M0",
          },
        },
        {
          id: "dummyClusterIdAlt",
          providerSettings: {
            providerName: "TENANT",
            backingProviderName: "GCP",
            instanceSizeName: "M1",
          },
        },
      ],
    };
    const spyBaseGet = jest
      .spyOn(MongoDbAtlasBase.prototype, "get")
      .mockReturnValue(Promise.resolve(mockedValue));
    const instance = new Project(publicKey, privateKey, projectId);
    expect(await instance.getFreeClusters()).toEqual([{
      id: "dummyClusterId",
      providerSettings: {
        providerName: "TENANT",
        backingProviderName: "GCP",
        instanceSizeName: "M0",
      },
    }]);
    expect(spyBaseGet).toHaveBeenCalledWith(`${instance.apiBaseUri}/clusters`);
  });

  it("getUsers()", async () => {
    const mockedValue = [];
    const spyGetAll = jest
      .spyOn(Project.prototype, "getAll")
      .mockReturnValue(Promise.resolve(mockedValue));
    const instance = new Project(publicKey, privateKey, projectId);
    expect(await instance.getUsers()).toEqual(mockedValue);
    expect(spyGetAll).toHaveBeenCalledWith({
      url: `${instance.apiBaseUri}/databaseUsers`,
    });
  });

  describe("addAdminUser()", () => {
    it("error", async () => {
      const mockedValue = {
        detail: "The password provided is too weak, as it can be found in most commonly used password lists.",
        error: 400,
        erroCode: "COMMON_PASSWORD",
        parameters: [],
        reason: "Bad Request",
      };
      const username = "dummyUserName";
      const password = "listedPassword";
      const spyPost = jest
        .spyOn(Project.prototype, "post")
        .mockReturnValue(Promise.resolve(mockedValue));
      const instance = new Project(publicKey, privateKey, projectId);
      expect(await instance.addAdminUser(username, password)).toEqual(mockedValue);
      expect(spyPost).toHaveBeenCalledWith(
        `${instance.apiBaseUri}/databaseUsers`,
        {
          databaseName: "admin",
          groupId: projectId,
          roles: [{databaseName: "admin", roleName: "atlasAdmin"}],
          username,
          password,
        },
      );
    });

    it("success()", async () => {
      const mockedValue = {};
      const username = "dummyUserName";
      const password = "dummyPassword1234!#";
      const spyPost = jest
        .spyOn(Project.prototype, "post")
        .mockReturnValue(Promise.resolve(mockedValue));
      const instance = new Project(publicKey, privateKey, projectId);
      expect(await instance.addAdminUser(username, password)).toEqual(mockedValue);
      expect(spyPost).toHaveBeenCalledWith(
        `${instance.apiBaseUri}/databaseUsers`,
        {
          databaseName: "admin",
          groupId: projectId,
          roles: [{databaseName: "admin", roleName: "atlasAdmin"}],
          username,
          password,
        },
      );
    });
  });

  describe("removeAdminUser()", () => {
    it("404", async () => {
      const mockedValue = {
        status: 404,
      };
      const username = "dummyUserName";
      const spyDelete = jest
        .spyOn(Project.prototype, "delete")
        .mockReturnValue(Promise.resolve(mockedValue));
      const instance = new Project(publicKey, privateKey, projectId);
      expect(await instance.removeAdminUser(username)).toEqual(mockedValue);
      expect(spyDelete).toHaveBeenCalledWith(`${instance.apiBaseUri}/databaseUsers/admin/${username}`);
    });

    it("success", async () => {
      const mockedValue = {
        status: 204,
      };
      const username = "dummyUserName";
      const spyDelete = jest
        .spyOn(Project.prototype, "delete")
        .mockReturnValue(Promise.resolve(mockedValue));
      const instance = new Project(publicKey, privateKey, projectId);
      expect(await instance.removeAdminUser(username)).toEqual(mockedValue);
      expect(spyDelete).toHaveBeenCalledWith(`${instance.apiBaseUri}/databaseUsers/admin/${username}`);
    });
  });

  describe("getIPs()", () => {
    it("success", async () => {
      const mockedValue = [
        {
          cidrBlock: "111.111.111.111/24",
          comment: "",
          groupId: projectId,
          links: [
            {
              href: "dummyLink",
              rel: "self",
            },
          ],
        },
      ];
      const spy = jest
        .spyOn(Project.prototype, "getAll")
        .mockReturnValue(Promise.resolve(mockedValue));
      const instance = new Project(publicKey, privateKey, projectId);
      expect(await instance.getIPs()).toEqual(mockedValue);
      expect(spy).toHaveBeenCalledWith({
        url: `${instance.apiBaseUri}/accessList`,
      });
    });
  });

});
