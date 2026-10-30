import type { APIRequestContext } from "@playwright/test";

export class ApiClient {
  constructor(private api: APIRequestContext) {}

  getPost(id: number) {
    return this.api.get(`/posts/${id}`);
  }

createPost(title: string, body: string, userId = 1) {
  return this.api.post("/posts", {
    data: { title, body, userId }
  });
}

  updatePost(id: number, title: string, body: string, userId = 1) {
    return this.api.patch(`/posts/${id}`, {
      data: { title, body, userId }
    });
  }

  deletePost(id: number) {
    return this.api.delete(`/posts/${id}`);
  }
}