import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world";
import { ApiClient } from "../../src/apiClient";

function api(world: CustomWorld) {
  if (!world.api) throw new Error("API context missing. Check @api tag and hooks.");
  return new ApiClient(world.api);
}

When("I request post {int}", async function (this: CustomWorld, id: number) {
  this.response = await api(this).getPost(id);
  this.responseBody = await this.response.json();
});

Then("API status should be {int}", async function (this: CustomWorld, status: number) {
  expect(this.response?.status()).toBe(status);
});

Then("the response should have a title and user ID", async function (this: CustomWorld) {
  expect(this.responseBody.title).toEqual(expect.any(String));
  expect(this.responseBody.userId).toEqual(expect.any(Number));
});

When(
  "I create a post titled {string}",
  async function (this: CustomWorld, title: string) {
    this.response = await api(this).createPost(
      title,
      "Created by Playwright"
    );

    const responseText = await this.response.text();

    console.log("Create status:", this.response.status());
    console.log("Create response:", responseText);

    if (!this.response.ok()) {
      throw new Error(
        `Create failed with HTTP ${this.response.status()}: ${responseText}`
      );
    }

    this.responseBody = JSON.parse(responseText);
    this.postId = this.responseBody.id;

    if (this.postId === undefined || this.postId === null) {
      throw new Error(
        `Create response did not contain an id: ${responseText}`
      );
    }
  }
);

When(
  "I update the created post title to {string}",
  async function (this: CustomWorld, title: string) {
    if (!this.postId) {
      throw new Error("Create a post before updating it.");
    }

    this.response = await api(this).updatePost(
      this.postId,
      title,
      "Updated body"
    );

    const body = await this.response.text();

    console.log("Update status:", this.response.status());
    console.log("Update response:", body);

    if (!this.response.ok()) {
      throw new Error(
        `Update failed with HTTP ${this.response.status()}: ${body}`
      );
    }

    this.responseBody = JSON.parse(body);
  }
);

Then("the response title should be {string}", async function (this: CustomWorld, title: string) {
  expect(this.responseBody.title).toBe(title);
});

When("I delete the created post", async function (this: CustomWorld) {
  if (!this.postId) throw new Error("Create a post before deleting it.");
  this.response = await api(this).deletePost(this.postId);
});