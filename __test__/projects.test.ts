import { MongoDbAtlasBase } from "@/base";
import { Projects } from "@/projects";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("Projects", () => {
  const publicKey = "dummyPublicKey";
  const privateKey = "dummyPrivateKey";

  class TestProjects extends Projects {
    public get apiBaseUriVisible(): string {
      return this.apiBaseUri;
    }
  }

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("has publicKey", () => {
    const instance = new Projects(publicKey, privateKey);
    expect(instance).toHaveProperty("publicKey", publicKey);
  });

  it("has privateKey", () => {
    const instance = new Projects(publicKey, privateKey);
    expect(instance).toHaveProperty("privateKey", privateKey);
  });

  it("inherits MongoDbAtlasBase", () => {
    const instance = new Projects(publicKey, privateKey);
    expect(instance instanceof MongoDbAtlasBase).toBe(true);
  });

  it("getAll()", async () => {
    const records = new Array(199).fill(0).map((_, i) => ({
      id: `id${i}`,
      name: `name${i}`,
      links: [
        {
          rel: `self`,
          href: `href${i}`,
        },
      ],
      orgId: `orgId${i}`,
    }));
    const spyGet = vi
      .spyOn(Projects.prototype, "get")
      .mockImplementation(async (url?: string) => {
        const searchParams = new URL(url ?? "").searchParams;
        const pageNum = Number(searchParams.get("pageNum"));
        const itemsPerPage = Number(searchParams.get("itemsPerPage"));
        const skip = (pageNum - 1) * itemsPerPage;
        return {
          results: records.slice(skip, skip + itemsPerPage),
          totalCount: records.length,
        };
      });
    const projects = await new Projects(publicKey, privateKey).getAll();
    expect(projects).toHaveLength(199);
    expect(projects[0]).toEqual({
      id: "id0",
      name: "name0",
      href: "href0",
      orgId: "orgId0",
    });
    expect(spyGet).toHaveBeenCalledTimes(2);
  });

  it("add()", async () => {
    const orgId = "dummyOrgId";
    const name = "dummyName";
    const mockedValue = {};
    const spyPost = vi
      .spyOn(Projects.prototype, "post")
      .mockReturnValue(Promise.resolve(mockedValue));
    const instance = new TestProjects(publicKey, privateKey);
    expect(await instance.add(orgId, name)).toEqual(mockedValue);
    expect(spyPost).toHaveBeenCalledWith(instance.apiBaseUriVisible, {
      orgId,
      name,
    });
  });
});
