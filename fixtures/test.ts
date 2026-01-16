import { test as base } from "@playwright/test";
import { AppState } from "../utils/AppState";
import { AppPage } from "../src/pages/AppPage";

type MyFixtures = {
    api: AppState
    app: AppPage
}

export const test = base.extend<MyFixtures>({

    api: async ({ page }, use) => {
        const appState = new AppState(page);
        await use(appState);
    },

    app: async ({ page }, use) => {
        const appPage = new AppPage(page);
        await appPage.open();
        await use(appPage);
    }
});

export { expect } from '@playwright/test';