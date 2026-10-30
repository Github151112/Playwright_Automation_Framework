import type { Page } from "@playwright/test";

export class ProductsPage {
  constructor(private page: Page) {}

  get title() { return this.page.locator('[data-test="title"]'); }
  get products() { return this.page.locator('[data-test="inventory-item"]'); }
  get cartItems() { return this.page.locator('[data-test="inventory-item"]'); }

  async addFirstProduct() {
    await this.page.locator('[data-test^="add-to-cart-"]').first().click();
  }

  async openCart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }
}