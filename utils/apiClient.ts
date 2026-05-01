import { APIRequestContext, expect } from '@playwright/test';

export class ApiClient {
  constructor(private request: APIRequestContext) {}

  async getPost(id: number) {
    const res = await this.request.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    expect(res.status()).toBe(200);
    return res.json();
  }
}
