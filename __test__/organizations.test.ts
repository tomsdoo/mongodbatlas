import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";
import { MongoDbAtlasBase } from "@/base";
import { Organizations } from "@/organizations";

describe("Organizations", () => {
  const publicKey = "dummyPublicKey";
  const privateKey = "dummyPrivateKey";

  afterEach(() => {
    vi.clearAllMocks();
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
