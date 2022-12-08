import { afterEach, beforeEach, describe, it, expect, jest } from "@jest/globals";
import { Projects } from "@/projects";

describe("Projects", () => {
  const publicKey = "dummyPublicKey";
  const privateKey = "dummyPrivateKey";
  it("constructor", () => {
    const instance = new Projects(publicKey, privateKey);
    expect(instance).toHaveProperty("publicKey", publicKey);
    expect(instance).toHaveProperty("privateKey", privateKey);
  });
});
