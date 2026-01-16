import { Page, Locator } from '@playwright/test';

export class HeaderComponent {

    private readonly logo: Locator;
    private readonly searchInput: Locator;
    private readonly filterAssignee: Locator;
    private readonly filterPriority: Locator;
    private readonly newTaskBtn: Locator;
    private readonly undoBtn: Locator;
    private readonly redoBtn: Locator;

    constructor(private readonly page: Page) {
        this.logo = page.getByTestId('logo')
        this.searchInput = page.getByTestId('search-input')
        this.filterAssignee = page.getByTestId('filter-assignee')
        this.filterPriority = page.getByTestId('filter-priority')
        this.newTaskBtn = page.getByTestId('new-task-btn')
        this.undoBtn = page.getByTestId('undo-btn')
        this.redoBtn = page.getByTestId('redo-btn')
    }

    async getLogoText(): Promise<string> {
        return await this.logo.innerText();
    }

    async clickUndo() {
        await this.undoBtn.click();
    }

    async clicRedo() {
        await this.redoBtn.click();
    }

    async clickNewTask() {
        await this.newTaskBtn.click();
    }

    async searchTask(query: string) {
        await this.searchInput.fill(query);
    }

    async selectAssignee(assignee: string) {
        await this.filterAssignee.selectOption(assignee);
    }

    async selectPriority(priority: string) {
        await this.filterPriority.selectOption(priority);
    }
}