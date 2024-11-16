import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";
import { MongoDbAtlasBase } from "@/base";
import { Project } from "@/project";
import { Clusters } from "@/clusters";
import { Cluster } from "@/cluster";

describe("Project", () => {
  const publicKey = "dummyPublicKey";
  const privateKey = "dummyPrivateKey";
  const projectId = "dummyProjectId";

  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(() => {});

  describe("constructor", () => {
    it("inherits MongoDbAtlasBase", () => {
      expect(
        new Project(publicKey, privateKey, projectId) instanceof
          MongoDbAtlasBase,
      ).toBe(true);
    });

    it("has publicKey", () => {
      expect(new Project(publicKey, privateKey, projectId)).toHaveProperty(
        "publicKey",
        publicKey,
      );
    });

    it("has privateKey", () => {
      expect(new Project(publicKey, privateKey, projectId)).toHaveProperty(
        "privateKey",
        privateKey,
      );
    });

    it("has projectId", () => {
      expect(new Project(publicKey, privateKey, projectId)).toHaveProperty(
        "projectId",
        projectId,
      );
    });

    it("has apiBaseUri", () => {
      const mongoDbAtlasBase = new MongoDbAtlasBase(publicKey, privateKey);
      const instance = new Project(publicKey, privateKey, projectId);
      expect(instance).toHaveProperty(
        "apiBaseUri",
        `${mongoDbAtlasBase.apiBaseUri}/groups/${projectId}`,
      );
    });

    it("has clusters", () => {
      const instance = new Project(publicKey, privateKey, projectId);
      expect(instance).toHaveProperty("clusters");
      expect(instance.clusters instanceof Clusters).toBe(true);
    });
  });

  describe("clsuter()", () => {
    it("instance of Cluster", () => {
      const clusterName = "dummyClusterName";
      const clusterInstance = new Project(
        publicKey,
        privateKey,
        projectId,
      ).cluster(clusterName);
      expect(clusterInstance instanceof Cluster).toBe(true);
    });
  });

  it("get()", async () => {
    const mockedProject = {
      name: "dummyProjectName",
    };
    const spyBaseGet = vi
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
    const spyBaseGet = vi
      .spyOn(MongoDbAtlasBase.prototype, "get")
      .mockReturnValue(Promise.resolve(mockedValue));
    const instance = new Project(publicKey, privateKey, projectId);
    expect(await instance.getFreeClusters()).toEqual([
      {
        id: "dummyClusterId",
        providerSettings: {
          providerName: "TENANT",
          backingProviderName: "GCP",
          instanceSizeName: "M0",
        },
      },
    ]);
    expect(spyBaseGet).toHaveBeenCalledWith(`${instance.apiBaseUri}/clusters`);
  });

  it("getUsers()", async () => {
    const mockedValue = [];
    const spyGetAll = vi
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
        detail:
          "The password provided is too weak, as it can be found in most commonly used password lists.",
        error: 400,
        erroCode: "COMMON_PASSWORD",
        parameters: [],
        reason: "Bad Request",
      };
      const username = "dummyUserName";
      const password = "listedPassword";
      const spyPost = vi
        .spyOn(Project.prototype, "post")
        .mockReturnValue(Promise.resolve(mockedValue));
      const instance = new Project(publicKey, privateKey, projectId);
      expect(await instance.addAdminUser(username, password)).toEqual(
        mockedValue,
      );
      expect(spyPost).toHaveBeenCalledWith(
        `${instance.apiBaseUri}/databaseUsers`,
        {
          databaseName: "admin",
          groupId: projectId,
          roles: [{ databaseName: "admin", roleName: "atlasAdmin" }],
          username,
          password,
        },
      );
    });

    it("success()", async () => {
      const mockedValue = {};
      const username = "dummyUserName";
      const password = "dummyPassword1234!#";
      const spyPost = vi
        .spyOn(Project.prototype, "post")
        .mockReturnValue(Promise.resolve(mockedValue));
      const instance = new Project(publicKey, privateKey, projectId);
      expect(await instance.addAdminUser(username, password)).toEqual(
        mockedValue,
      );
      expect(spyPost).toHaveBeenCalledWith(
        `${instance.apiBaseUri}/databaseUsers`,
        {
          databaseName: "admin",
          groupId: projectId,
          roles: [{ databaseName: "admin", roleName: "atlasAdmin" }],
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
      const spyDelete = vi
        .spyOn(Project.prototype, "delete")
        .mockReturnValue(Promise.resolve(mockedValue));
      const instance = new Project(publicKey, privateKey, projectId);
      expect(await instance.removeAdminUser(username)).toEqual(mockedValue);
      expect(spyDelete).toHaveBeenCalledWith(
        `${instance.apiBaseUri}/databaseUsers/admin/${username}`,
      );
    });

    it("success", async () => {
      const mockedValue = {
        status: 204,
      };
      const username = "dummyUserName";
      const spyDelete = vi
        .spyOn(Project.prototype, "delete")
        .mockReturnValue(Promise.resolve(mockedValue));
      const instance = new Project(publicKey, privateKey, projectId);
      expect(await instance.removeAdminUser(username)).toEqual(mockedValue);
      expect(spyDelete).toHaveBeenCalledWith(
        `${instance.apiBaseUri}/databaseUsers/admin/${username}`,
      );
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
      const spy = vi
        .spyOn(Project.prototype, "getAll")
        .mockReturnValue(Promise.resolve(mockedValue));
      const instance = new Project(publicKey, privateKey, projectId);
      expect(await instance.getIPs()).toEqual(mockedValue);
      expect(spy).toHaveBeenCalledWith({
        url: `${instance.apiBaseUri}/accessList`,
      });
    });
  });

  describe("addIP()", () => {
    it("400", async () => {
      const mockedValue = {
        detail:
          "The address null must be in valid IP address or CIDR notation.",
        error: 400,
        errorCode: "INVALID_IP_ADDRESS_OR_CIDR_NOTATION",
        parameters: [null],
        reason: "Bad Request",
      };
      const spy = vi
        .spyOn(Project.prototype, "post")
        .mockReturnValue(Promise.resolve(mockedValue));
      const instance = new Project(publicKey, privateKey, projectId);
      expect(await instance.addIP("111.111.111.111/24")).toEqual(mockedValue);
      expect(spy).toHaveBeenCalledWith(`${instance.apiBaseUri}/accessList`, [
        {
          cidrBlock: "111.111.111.111/24",
        },
      ]);
    });

    it("success", async () => {
      const mockedValue = {
        totalCount: 1,
        results: [
          {
            cidrBlock: "111.111.111.111/24",
            comment: "",
            groupId: projectId,
            links: [
              {
                rel: "self",
                href: "dummyUrl",
              },
            ],
          },
        ],
      };
      const spy = vi
        .spyOn(Project.prototype, "post")
        .mockReturnValue(Promise.resolve(mockedValue));
      const instance = new Project(publicKey, privateKey, projectId);
      expect(await instance.addIP("111.111.111.111/24")).toEqual(mockedValue);
      expect(spy).toHaveBeenCalledWith(`${instance.apiBaseUri}/accessList`, [
        {
          cidrBlock: "111.111.111.111/24",
        },
      ]);
    });
  });

  describe("removeIP()", () => {
    it("404", async () => {
      const ip = "111.111.111.111/12";
      const mockedValue = {
        detail: `IP Address ${ip} not on Atlas access list for group ${projectId}.`,
        error: 404,
        errorCode: "ATLAS_NETWORK_PERMISSION_ENTRY_NOT_FOUND",
        parameters: [ip, projectId],
        reason: "Not Found",
      };
      const spyDelete = vi
        .spyOn(Project.prototype, "delete")
        .mockReturnValue(Promise.resolve(mockedValue));
      const instance = new Project(publicKey, privateKey, projectId);
      expect(await instance.removeIP(ip)).toEqual(mockedValue);
      expect(spyDelete).toHaveBeenCalledWith(
        `${instance.apiBaseUri}/accessList/${encodeURIComponent(ip)}`,
      );
    });

    it("success", async () => {
      const ip = "111.111.111.111/12";
      const mockedValue = {
        status: 204,
      };
      const spyDelete = vi
        .spyOn(Project.prototype, "delete")
        .mockReturnValue(Promise.resolve(mockedValue));
      const instance = new Project(publicKey, privateKey, projectId);
      expect(await instance.removeIP(ip)).toEqual(mockedValue);
      expect(spyDelete).toHaveBeenCalledWith(
        `${instance.apiBaseUri}/accessList/${encodeURIComponent(ip)}`,
      );
    });
  });
});
