import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";
import { MongoDbAtlasBase } from "@/base";
import { Organization } from "@/organization";

describe("Organization", () => {
  const publicKey = "dummyPublicKey";
  const privateKey = "dummyPrivateKey";
  const orgId = "dummyOrgId";

  class TestMongoDbAtlasBase extends MongoDbAtlasBase {
    public get apiBaseUriVisible(): string {
      return this.apiBaseUri;
    }
  }

  class TestOrganization extends Organization {
    public get apiBaseUriVisible(): string {
      return this.apiBaseUri;
    }
  }

  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(() => {});

  describe("constructor", () => {
    it("has publicKey", () => {
      expect(new Organization(publicKey, privateKey, orgId)).toHaveProperty(
        "publicKey",
        publicKey,
      );
    });

    it("has privateKey", () => {
      expect(new Organization(publicKey, privateKey, orgId)).toHaveProperty(
        "privateKey",
        privateKey,
      );
    });

    it("has orgId", () => {
      expect(new Organization(publicKey, privateKey, orgId)).toHaveProperty(
        "orgId",
        orgId,
      );
    });

    it("inherit MongoDbAtlasBase", () => {
      const instance = new Organization(publicKey, privateKey, orgId);
      expect(instance instanceof MongoDbAtlasBase).toBe(true);
    });

    it("has apiBaseUri", () => {
      const base = new TestMongoDbAtlasBase(publicKey, privateKey);
      const instance = new Organization(publicKey, privateKey, orgId);
      expect(instance).toHaveProperty(
        "apiBaseUri",
        `${base.apiBaseUriVisible}/orgs/${orgId}`,
      );
    });
  });

  describe("getUsers()", () => {
    it("success", async () => {
      const mockedValue = [
        {
          country: "US",
          createdAt: "2000-01-01T00:00:00Z",
          emailAddress: "someone@dom.ain",
          firstName: "firstName",
          id: "dummyUserId",
          lastAuth: "2000-01-01T00:00:00Z",
          lastName: "lastName",
          links: [],
          mobileNumber: "",
          roles: [],
          teamIds: [],
          username: "someone@dom.ain",
        },
      ];
      const spyGetAll = vi
        .spyOn(Organization.prototype, "getAll")
        .mockReturnValue(Promise.resolve(mockedValue));
      const instance = new TestOrganization(publicKey, privateKey, orgId);
      expect(await instance.getUsers()).toEqual(mockedValue);
      expect(spyGetAll).toHaveBeenCalledWith({
        url: `${instance.apiBaseUriVisible}/users`,
      });
    });
  });

  describe("getProjects()", () => {
    it("success", async () => {
      const mockedValue = [
        {
          clusterCount: 1,
          created: "2000-01-01T00:00:00Z",
          id: "dummyProjectId",
          links: [],
          name: "dummyProjectName",
          orgId: "dummyOrgId",
        },
      ];
      const spyGetAll = vi
        .spyOn(Organization.prototype, "getAll")
        .mockReturnValue(Promise.resolve(mockedValue));
      const instance = new TestOrganization(publicKey, privateKey, orgId);
      expect(await instance.getProjects()).toEqual(mockedValue);
      expect(spyGetAll).toHaveBeenCalledWith({
        url: `${instance.apiBaseUriVisible}/groups`,
      });
    });
  });
});
