import { afterEach, describe, expect, it, vi } from "vitest";
import { MongoDbAtlas } from "@/index";
import { Project } from "@/project";
import { Projects } from "@/projects";

describe("MongoDbAtlas", () => {
  const publicKey = "dummyPublicKey";
  const privateKey = "dummyPrivateKey";

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("has pubicKey", () => {
    expect(new MongoDbAtlas(publicKey, privateKey)).toHaveProperty(
      "publicKey",
      publicKey,
    );
  });

  it("has privateKey", () => {
    expect(new MongoDbAtlas(publicKey, privateKey)).toHaveProperty(
      "privateKey",
      privateKey,
    );
  });

  it("has projects", () => {
    const instance = new MongoDbAtlas(publicKey, privateKey);
    expect(instance).toHaveProperty("_projects");
    expect(instance).toHaveProperty("projects");
    expect(instance.projects instanceof Projects).toBe(true);
  });

  it("project()", () => {
    const instance = new MongoDbAtlas(publicKey, privateKey);
    const projectId = "dummyProjectId";
    expect(instance.project(projectId) instanceof Project).toBe(true);
  });
});
