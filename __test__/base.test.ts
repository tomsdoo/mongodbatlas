import {
  afterEach,
  beforeEach,
  describe,
  it,
  expect,
  vi,
  type MockInstance,
} from "vitest";
import { MongoDbAtlasBase } from "@/base";
import type { DigestClient } from "digest-fetch";

const { spyConstructor } = vi.hoisted(() => ({
  spyConstructor: vi.fn(),
}));

vi.mock("digest-fetch", () => ({
  DigestClient: class DigestClient {
    public user: string;
    public password: string;
    constructor(user: string, password: string) {
      spyConstructor(user, password);
      this.user = user;
      this.password = password;
    }

    public async fetch(url: string, options?: any): Promise<any> {
      return await Promise.resolve({
        json: async () => await Promise.resolve({}),
      });
    }
  },
}));

describe("MongoDbAtlasBase", () => {
  const publicKey = "dummyPublicKey";
  const privateKey = "dummyPrivateKey";

  class TestMongoDbAtlasBase extends MongoDbAtlasBase {
    public getClient(): DigestClient {
      return super.getClient();
    }

    public async sendCore(
      method: string,
      url: string,
      body?: any,
    ): Promise<any> {
      return await super.sendCore(method, url, body);
    }
  }

  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(() => {});

  it("constructor", () => {
    const instance = new TestMongoDbAtlasBase(publicKey, privateKey);
    expect(instance).toHaveProperty("publicKey", publicKey);
    expect(instance).toHaveProperty("privateKey", privateKey);
  });
  it("getClient()", () => {
    const instance = new TestMongoDbAtlasBase(publicKey, privateKey);
    const client = instance.getClient();
    expect(client).toHaveProperty("user", publicKey);
    expect(client).toHaveProperty("password", privateKey);
    expect(spyConstructor).toHaveBeenCalledWith(
      "dummyPublicKey",
      "dummyPrivateKey",
    );
  });
  describe("sendCore()", () => {
    let spyGetClient: MockInstance;
    beforeEach(() => {
      spyGetClient = vi
        .spyOn(TestMongoDbAtlasBase.prototype, "getClient")
        // @ts-expect-error type of instance
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
      const instance = new TestMongoDbAtlasBase(publicKey, privateKey);
      await expect(instance.get(dummyUrl)).resolves.toEqual({
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
      const instance = new TestMongoDbAtlasBase(publicKey, privateKey);
      await expect(instance.post(dummyUrl, body)).resolves.toEqual({
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
      const instance = new TestMongoDbAtlasBase(publicKey, privateKey);
      await expect(instance.put(dummyUrl, body)).resolves.toEqual({
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
      const instance = new TestMongoDbAtlasBase(publicKey, privateKey);
      await expect(instance.delete(dummyUrl)).resolves.toEqual({
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
      const spySendCore = vi
        .spyOn(TestMongoDbAtlasBase.prototype, "sendCore")
        .mockResolvedValue(mockedValue);
      const dummyUrl = "dummyUrl";
      const instance = new TestMongoDbAtlasBase(publicKey, privateKey);
      await expect(instance.get(dummyUrl)).resolves.toEqual(mockedValue);
      expect(spySendCore).toHaveBeenCalledWith("GET", dummyUrl);
    });

    it("POST", async () => {
      const body = {
        test: "body",
      };
      const mockedValue = {
        test: true,
      };
      const spySendCore = vi
        .spyOn(TestMongoDbAtlasBase.prototype, "sendCore")
        .mockResolvedValue(mockedValue);
      const dummyUrl = "dummyUrl";
      const instance = new TestMongoDbAtlasBase(publicKey, privateKey);
      await expect(instance.post(dummyUrl, body)).resolves.toEqual(mockedValue);
      expect(spySendCore).toHaveBeenCalledWith("POST", dummyUrl, body);
    });

    it("PUT", async () => {
      const body = {
        test: "body",
      };
      const mockedValue = {
        test: true,
      };
      const spySendCore = vi
        .spyOn(TestMongoDbAtlasBase.prototype, "sendCore")
        .mockResolvedValue(mockedValue);
      const dummyUrl = "dummyUrl";
      const instance = new TestMongoDbAtlasBase(publicKey, privateKey);
      await expect(instance.put(dummyUrl, body)).resolves.toEqual(mockedValue);
      expect(spySendCore).toHaveBeenCalledWith("PUT", dummyUrl, body);
    });

    it("DELETE", async () => {
      const mockedValue = {
        test: true,
      };
      const spySendCore = vi
        .spyOn(TestMongoDbAtlasBase.prototype, "sendCore")
        .mockResolvedValue(mockedValue);
      const dummyUrl = "dummyUrl";
      const instance = new TestMongoDbAtlasBase(publicKey, privateKey);
      await expect(instance.delete(dummyUrl)).resolves.toEqual(mockedValue);
      expect(spySendCore).toHaveBeenCalledWith("DELETE", dummyUrl);
    });
  });
});
