import { MongoDbAtlasBase } from "@/base";
import { Clusters } from "@/clusters";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("Clusters", () => {
  const publicKey = "dummyPublicKey";
  const privateKey = "dummyPrivateKey";
  const projectId = "dummyProjectId";

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("constructor", () => {
    it("inherits MongoDbAtlasBase", () => {
      const instance = new Clusters(publicKey, privateKey, projectId);
      expect(instance instanceof MongoDbAtlasBase).toBe(true);
    });

    it("has apiBaseUri", () => {
      class TestMongoDbAtlasBase extends MongoDbAtlasBase {
        public get apiBaseUriVisible(): string {
          return this.apiBaseUri;
        }
      }
      const base = new TestMongoDbAtlasBase(publicKey, privateKey);
      const instance = new Clusters(publicKey, privateKey, projectId);
      expect(instance).toHaveProperty(
        "apiBaseUri",
        `${base.apiBaseUriVisible}/groups/${projectId}/clusters`,
      );
    });
  });
});
