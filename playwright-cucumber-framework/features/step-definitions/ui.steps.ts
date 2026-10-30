import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world";
import { LoginPage } from "../../pages/loginPage";
import { ProductsPage } from "../../pages/productsPage";

Given("I open the demo shop", async function (this: CustomWorld) {
  await new LoginPage(this.page!).open();
});

When("I log in with valid credentials", async function (this: CustomWorld) {
  await new LoginPage(this.page!).login();
});

Then("I should see the product list", async function (this: CustomWorld) {
  const products = new ProductsPage(this.page!);
  await expect(products.title).toHaveText("Products");
  await expect(products.products).toHaveCount(6);
});

Given("I am logged in to the demo shop", async function (this: CustomWorld) {
  await new LoginPage(this.page!).open();
  await new LoginPage(this.page!).login();
  await expect(new ProductsPage(this.page!).title).toHaveText("Products");
});

When("I add the first product to the cart", async function (this: CustomWorld) {
  await new ProductsPage(this.page!).addFirstProduct();
});

When("I open the cart", async function (this: CustomWorld) {
  await new ProductsPage(this.page!).openCart();
});

Then("the cart should contain one product", async function (this: CustomWorld) {
  const products = new ProductsPage(this.page!);
  await expect(this.page!.locator('[data-test="title"]')).toHaveText("Your Cart");
  await expect(products.cartItems).toHaveCount(1);
});