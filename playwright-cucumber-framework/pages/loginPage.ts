import type { Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto(process.env.BASE_URL ?? "https://www.saucedemo.com");
  }

  async login(username = "standard_user", password = "secret_sauce") {
    await this.page.locator('[data-test="username"]').fill(username);
    await this.page.locator('[data-test="password"]').fill(password);
    await this.page.locator('[data-test="login-button"]').click();
  }
}