import { afterEach, beforeEach, describe, it, expect, jest } from "@jest/globals";
import { MongoDbAtlasBase } from "@/base";

const digestFetchCalledHistory = {
  constructor: [],
  fetch: [],
};

jest.mock("digest-fetch", () =>
  class DigestFetch {
    public user: string;
    public password: string;
    constructor(user: string, password: string){
      digestFetchCalledHistory.constructor.push({ user, password });
      this.user = user;
      this.password = password;
    }
    public async fetch(url: string, options?: any){
      digestFetchCalledHistory.fetch.push({url, options});
      return Promise.resolve({
        json: async () => Promise.resolve({}),
      });
    }
  }
);

describe("MongoDbAtlasBase", () => {
  const publicKey = "dummyPublicKey";
  const privateKey = "dummyPrivateKey";

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {});

  it("constructor", () => {
    const instance = new MongoDbAtlasBase(publicKey, privateKey);
    expect(instance).toHaveProperty("publicKey", publicKey);
    expect(instance).toHaveProperty("privateKey", privateKey);
  });
  it("getClient()", () => {
    const instance = new MongoDbAtlasBase(publicKey, privateKey);
    const client = instance.getClient();
    expect(client).toHaveProperty("user", publicKey);
    expect(client).toHaveProperty("password", privateKey);
    expect(digestFetchCalledHistory.constructor.slice(-1)[0]).toEqual({
      user: "dummyPublicKey",
      password: "dummyPrivateKey",
    });
  });
});
