import { describe, it, expect, jest } from "@jest/globals";
import { MongoDbAtlasBase } from "@/base";

describe("MongoDbAtlasBase", () => {
  it("constructor", () => {
    const publicKey = "dummyPublicKey";
    const privateKey = "dummyPrivateKey";
    const instance = new MongoDbAtlasBase(publicKey, privateKey);
    expect(instance).toHaveProperty("publicKey", "dummyPublicKey");
    expect(instance).toHaveProperty("privateKey", "dummyPrivateKey");
  });
});
