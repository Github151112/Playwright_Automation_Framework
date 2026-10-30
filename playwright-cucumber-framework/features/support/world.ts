import { World, IWorldOptions, setWorldConstructor } from "@cucumber/cucumber";
import type { Browser, BrowserContext, Page, APIRequestContext, APIResponse } from "@playwright/test";

export class CustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  api?: APIRequestContext;
  response?: APIResponse;
  responseBody?: any;
  postId?: number;

  constructor(options: IWorldOptions) {
    super(options);
  }
}
setWorldConstructor(CustomWorld);