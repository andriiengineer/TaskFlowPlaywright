import { Locator, Page } from '@playwright/test';
import { HeaderComponent } from '../components/HeaderComponent';
import { BoardComponent } from '../components/BoardComponent';
import { TaskModalComponent } from '../components/TaskModalComponent';
import { DeleteModalComponent } from '../components/DeleteModalComponent';
import { ContextMenuComponent } from '../components/ContextMenuComponent';

export class AppPage {
    readonly header: HeaderComponent;
    readonly board: BoardComponent;
    readonly taskModal: TaskModalComponent;
    readonly deleteModal: DeleteModalComponent;
    readonly contextMenu: ContextMenuComponent;
    readonly toastContainer: Locator

    constructor(readonly page: Page) {
        this.header = new HeaderComponent(page);
        this.board = new BoardComponent(page);
        this.taskModal = new TaskModalComponent(page);
        this.deleteModal = new DeleteModalComponent(page);
        this.contextMenu = new ContextMenuComponent(page)
        this.toastContainer = this.page.getByTestId('toast-container')
    }


    async open() {
        await this.page.goto('/');
    }

    async getLastToastMessage(): Promise<string> {
        try {
            await this.toastContainer.first().waitFor({ state: 'visible', timeout: 2000 });
            return await this.toastContainer.last().innerText();
        } catch (e) {
            return '';
        }
    }
}