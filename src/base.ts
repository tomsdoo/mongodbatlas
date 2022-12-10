// @ts-expect-error
import DigestFetch from "digest-fetch";

interface GetAllOptions {
  url?: string;
  itemsPerPage?: number;
  transform?: Function;
}

export class MongoDbAtlasBase {
  protected apiBaseUri: string;
  protected publicKey: string;
  protected privateKey: string;
  constructor(publicKey: string, privateKey: string) {
    this.apiBaseUri = "https://cloud.mongodb.com/api/atlas/v1.0";
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }

  protected getClient(): DigestFetch {
    return new DigestFetch(this.publicKey, this.privateKey);
  }

  protected async sendCore(
    method: string,
    url: string,
    body?: any
  ): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/return-await
    return await this.getClient()
      .fetch(url, {
        method,
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        ...(body ? { body: JSON.stringify(body) } : {}),
      })
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      .then((res: any) => res.json().catch((e: Error) => res));
  }

  public async get(url?: string): Promise<any> {
    return await this.sendCore("GET", url ?? this.apiBaseUri);
  }

  public async getAll(options?: GetAllOptions): Promise<any[]> {
    const itemsPerPage = options?.itemsPerPage ?? 100;
    const url = options?.url ?? this.apiBaseUri;
    let pageNum = 1;
    let items: any[] = [];
    while (true) {
      const currentUrl = new URL(url);
      Object.entries({
        itemsPerPage,
        pageNum,
      }).forEach(([key, value]) => {
        currentUrl.searchParams.append(key, value.toString());
      });
      const { results, totalCount } = await this.get(currentUrl.href);
      items = [...items, ...results.map(options?.transform ?? ((v: any) => v))];
      if (items.length >= totalCount) {
        break;
      }
      pageNum++;
    }
    return items;
  }

  public async post(url: string, body: any): Promise<any> {
    return await this.sendCore("POST", url, body);
  }

  public async put(url: string, body: any): Promise<any> {
    return await this.sendCore("PUT", url, body);
  }

  public async delete(url?: string): Promise<any> {
    return await this.sendCore("DELETE", url ?? this.apiBaseUri);
  }
}
