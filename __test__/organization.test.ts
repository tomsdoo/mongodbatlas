import { afterEach, beforeEach, describe, it, expect, jest } from "@jest/globals";
import { MongoDbAtlasBase } from "@/base";
import { Organization } from "@/organization";

describe("Organization", () => {
  const publicKey = "dummyPublicKey";
  const privateKey = "dummyPrivateKey";
  const orgId = "dummyOrgId";

  describe("constructor", () => {
    it("has publicKey", () => {
      expect(new Organization(publicKey, privateKey, orgId)).toHaveProperty("publicKey", publicKey);
    });

    it("has privateKey", () => {
      expect(new Organization(publicKey, privateKey, orgId)).toHaveProperty("privateKey", privateKey);
    });

    it("has orgId", () => {
      expect(new Organization(publicKey, privateKey, orgId)).toHaveProperty("orgId", orgId);
    });

    it("inherit MongoDbAtlasBase", () => {
      const instance = new Organization(publicKey, privateKey, orgId);
      expect(instance instanceof MongoDbAtlasBase).toBe(true);
    });

    it("has apiBaseUri", () => {
      const base = new MongoDbAtlasBase(publicKey, privateKey);
      const instance = new Organization(publicKey, privateKey, orgId);
      expect(instance).toHaveProperty("apiBaseUri", `${base.apiBaseUri}/orgs`);
    });
  });
});
