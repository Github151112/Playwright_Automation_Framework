import { Before, After, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, request } from "@playwright/test";
import { CustomWorld } from "./world";
import "dotenv/config";

setDefaultTimeout(60000);

Before(async function (this: CustomWorld, scenario) {
  const tags = scenario.pickle.tags.map(tag => tag.name);
  if (tags.includes("@ui")) {
    this.browser = await chromium.launch({
      headless: (process.env.HEADLESS ?? "true").toLowerCase() !== "false"
    });
    this.context = await this.browser.newContext({ viewport: { width: 1365, height: 768 } });
    this.page = await this.context.newPage();
  }
  if (tags.includes("@api")) {
    this.api = await request.newContext({
      baseURL: process.env.API_BASE_URL ?? "http://localhost:3000",
      extraHTTPHeaders: { Accept: "application/json", "Content-Type": "application/json" }
    });
  }
});

After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    try {
      await this.attach(await this.page.screenshot({ fullPage: true }), "image/png");
    } catch (error) {
      console.warn("Screenshot could not be attached:", error);
    }
  }
  await this.api?.dispose();
  await this.context?.close();
  await this.browser?.close();
});