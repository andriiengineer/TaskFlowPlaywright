import { Page } from "@playwright/test";

export class AppState {
    constructor(private page: Page) {

    }

    async injectTasks(tasks: any[]) {
        const tasksJson = JSON.stringify(tasks)
        
        await this.page.evaluate(`
            tasks = ${tasksJson};
            renderBoard();
            updateCounts();
        `);
    }

    async clear() {
        await this.page.evaluate('tasks = []; renderBoard(); updateCounts();')
    }
}