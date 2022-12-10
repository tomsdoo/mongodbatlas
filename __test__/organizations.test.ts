import { afterEach, beforeEach, describe, it, expect, jest } from "@jest/globals";
import { MongoDbAtlasBase } from "@/base";
import { Organizations } from "@/organizations";

describe("Organizations", () => {
  const publicKey = "dummyPublicKey";
  const privateKey = "dummyPrivateKey";

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {});

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
    const base = new MongoDbAtlasBase(publicKey, privateKey);
    const instance = new Organizations(publicKey, privateKey);
    expect(instance.apiBaseUri).toBe(`${base.apiBaseUri}/orgs`);
  });

});
