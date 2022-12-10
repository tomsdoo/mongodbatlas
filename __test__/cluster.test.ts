import { afterEach, beforeEach, describe, it, expect, jest } from "@jest/globals";
import { MongoDbAtlasBase } from "@/base";
import { Cluster } from "@/cluster";

describe("Cluster", () => {
  const publicKey = "dummyPublicKey";
  const privateKey = "dummyPrivateKey";
  const projectId = "dummyProjectId";
  const clusterName = "dummyClusterName";

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {});

  describe("constructor", () => {
    let instance: Cluster;
    beforeEach(() => {
      instance = new Cluster(publicKey, privateKey, projectId, clusterName);
    });

    it("inherits MongoDbAtlasBase", () => {
      expect(instance instanceof MongoDbAtlasBase).toBe(true);
    });

    it("has projectId", () => {
      expect(instance).toHaveProperty("projectId", projectId);
    });

    it("has clusterName", () => {
      expect(instance).toHaveProperty("clusterName", clusterName);
    });

    it("has apiBaseUri", () => {
      const base = new MongoDbAtlasBase(publicKey, privateKey);
      expect(instance).toHaveProperty("apiBaseUri", `${base.apiBaseUri}/groups/${projectId}/clusters/${clusterName}`);
    });
  });
});
