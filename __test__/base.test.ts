import {
  afterEach,
  beforeEach,
  describe,
  it,
  expect,
  jest,
} from "@jest/globals";
import { MongoDbAtlasBase } from "@/base";

const digestFetchCalledHistory = {
  constructor: [],
  fetch: [],
};

jest.mock(
  "digest-fetch",
  () =>
    class DigestFetch {
      public user: string;
      public password: string;
      constructor(user: string, password: string) {
        digestFetchCalledHistory.constructor.push({ user, password });
        this.user = user;
        this.password = password;
      }

      public async fetch(url: string, options?: any): Promise<any> {
        digestFetchCalledHistory.fetch.push({ url, options });
        return await Promise.resolve({
          json: async () => await Promise.resolve({}),
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
  describe("sendCore()", () => {
    let spyGetClient: jest.Spied<any>;
    beforeEach(() => {
      spyGetClient = jest
        .spyOn(MongoDbAtlasBase.prototype, "getClient")
        .mockReturnValue({
          fetch: async (url: string, options?: any) =>
            await Promise.resolve({
              json: async () =>
                await Promise.resolve({
                  url,
                  options,
                }),
            }),
        });
    });

    it("GET", async () => {
      const dummyUrl = "dummyUrl";
      const instance = new MongoDbAtlasBase(publicKey, privateKey);
      expect(await instance.get(dummyUrl)).toEqual({
        url: "dummyUrl",
        options: {
          method: "GET",
          headers: {
            "content-type": "application/json",
            accept: "application/json",
          },
        },
      });
      expect(spyGetClient).toHaveBeenCalled();
    });

    it("POST", async () => {
      const dummyUrl = "dummyUrl";
      const body = {
        test: true,
      };
      const instance = new MongoDbAtlasBase(publicKey, privateKey);
      expect(await instance.post(dummyUrl, body)).toEqual({
        url: "dummyUrl",
        options: {
          method: "POST",
          headers: {
            "content-type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify(body),
        },
      });
      expect(spyGetClient).toHaveBeenCalled();
    });

    it("PUT", async () => {
      const dummyUrl = "dummyUrl";
      const body = {
        test: true,
      };
      const instance = new MongoDbAtlasBase(publicKey, privateKey);
      expect(await instance.put(dummyUrl, body)).toEqual({
        url: "dummyUrl",
        options: {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify(body),
        },
      });
      expect(spyGetClient).toHaveBeenCalled();
    });

    it("DELETE", async () => {
      const dummyUrl = "dummyUrl";
      const instance = new MongoDbAtlasBase(publicKey, privateKey);
      expect(await instance.delete(dummyUrl)).toEqual({
        url: "dummyUrl",
        options: {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            accept: "application/json",
          },
        },
      });
      expect(spyGetClient).toHaveBeenCalled();
    });
  });

  describe("request", () => {
    it("GET", async () => {
      const mockedValue = {
        test: true,
      };
      const spySendCore = jest
        .spyOn(MongoDbAtlasBase.prototype, "sendCore")
        .mockReturnValue(Promise.resolve(mockedValue));
      const dummyUrl = "dummyUrl";
      const instance = new MongoDbAtlasBase(publicKey, privateKey);
      expect(await instance.get(dummyUrl)).toEqual(mockedValue);
      expect(spySendCore).toHaveBeenCalledWith("GET", dummyUrl);
    });

    it("POST", async () => {
      const body = {
        test: "body",
      };
      const mockedValue = {
        test: true,
      };
      const spySendCore = jest
        .spyOn(MongoDbAtlasBase.prototype, "sendCore")
        .mockReturnValue(Promise.resolve(mockedValue));
      const dummyUrl = "dummyUrl";
      const instance = new MongoDbAtlasBase(publicKey, privateKey);
      expect(await instance.post(dummyUrl, body)).toEqual(mockedValue);
      expect(spySendCore).toHaveBeenCalledWith("POST", dummyUrl, body);
    });

    it("PUT", async () => {
      const body = {
        test: "body",
      };
      const mockedValue = {
        test: true,
      };
      const spySendCore = jest
        .spyOn(MongoDbAtlasBase.prototype, "sendCore")
        .mockReturnValue(Promise.resolve(mockedValue));
      const dummyUrl = "dummyUrl";
      const instance = new MongoDbAtlasBase(publicKey, privateKey);
      expect(await instance.put(dummyUrl, body)).toEqual(mockedValue);
      expect(spySendCore).toHaveBeenCalledWith("PUT", dummyUrl, body);
    });

    it("DELETE", async () => {
      const mockedValue = {
        test: true,
      };
      const spySendCore = jest
        .spyOn(MongoDbAtlasBase.prototype, "sendCore")
        .mockReturnValue(Promise.resolve(mockedValue));
      const dummyUrl = "dummyUrl";
      const instance = new MongoDbAtlasBase(publicKey, privateKey);
      expect(await instance.delete(dummyUrl)).toEqual(mockedValue);
      expect(spySendCore).toHaveBeenCalledWith("DELETE", dummyUrl);
    });
  });
});
