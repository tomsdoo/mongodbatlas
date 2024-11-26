import { MongoDbAtlasBase } from "@/base";
import { Organizations } from "@/organizations";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("Organizations", () => {
  const publicKey = "dummyPublicKey";
  const privateKey = "dummyPrivateKey";

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("has publicKey", () => {
    const instance = new Organizations(publicKey, privateKey);
    expect(instance).toHaveProperty("publicKey", publicKey);
  });

  it("has privateKey", () => {
    const instance = new Organizations(publicKey, privateKey);
    expect(instance).toHaveProperty("privateKey", privateKey);
  });

  it("inherits MongoDbAtlasBase", () => {
    const instance = new Organizations(publicKey, privateKey);
    expect(instance instanceof MongoDbAtlasBase).toBe(true);
  });

  it("has apiBaseUri", () => {
    class TestMongoDbAtlasBase extends MongoDbAtlasBase {
      public get apiBaseUriVisible(): string {
        return this.apiBaseUri;
      }
    }
    class TestOrganizations extends Organizations {
      public get apiBaseUriVisible(): string {
        return this.apiBaseUri;
      }
    }

    const base = new TestMongoDbAtlasBase(publicKey, privateKey);
    const instance = new TestOrganizations(publicKey, privateKey);
    expect(instance.apiBaseUriVisible).toBe(`${base.apiBaseUriVisible}/orgs`);
  });
});
