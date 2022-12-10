import {
  afterEach,
  beforeEach,
  describe,
  it,
  expect,
  jest,
} from "@jest/globals";
import { MongoDbAtlasBase } from "@/base";
import { Clusters } from "@/clusters";

describe("Clusters", () => {
  const publicKey = "dummyPublicKey";
  const privateKey = "dummyPrivateKey";
  const projectId = "dummyProjectId";

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {});

  describe("constructor", () => {
    it("inherits MongoDbAtlasBase", () => {
      const instance = new Clusters(publicKey, privateKey, projectId);
      expect(instance instanceof MongoDbAtlasBase).toBe(true);
    });

    it("has apiBaseUri", () => {
      const base = new MongoDbAtlasBase(publicKey, privateKey);
      const instance = new Clusters(publicKey, privateKey, projectId);
      expect(instance).toHaveProperty(
        "apiBaseUri",
        `${base.apiBaseUri as string}/groups/${projectId}/clusters`
      );
    });
  });
});
