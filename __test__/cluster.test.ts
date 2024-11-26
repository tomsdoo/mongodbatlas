import { MongoDbAtlasBase } from "@/base";
import { Cluster } from "@/cluster";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("Cluster", () => {
  const publicKey = "dummyPublicKey";
  const privateKey = "dummyPrivateKey";
  const projectId = "dummyProjectId";
  const clusterName = "dummyClusterName";

  afterEach(() => {
    vi.clearAllMocks();
  });

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
      class TestMongoDbAtlasBase extends MongoDbAtlasBase {
        public get apiBaseUriVisible(): string {
          return this.apiBaseUri;
        }
      }
      const base = new TestMongoDbAtlasBase(publicKey, privateKey);
      expect(instance).toHaveProperty(
        "apiBaseUri",
        `${base.apiBaseUriVisible}/groups/${projectId}/clusters/${clusterName}`,
      );
    });
  });
});
