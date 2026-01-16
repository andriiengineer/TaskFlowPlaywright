import { Page, Locator } from "@playwright/test";

export class DeleteModalComponent {

    private readonly host: Locator;
    private readonly deleteMessage: Locator
    private readonly cancelBtn: Locator;
    private readonly deleteBtn: Locator;


    constructor(private readonly page: Page) {
        this.host = this.page.getByTestId('delete-modal');
        this.deleteMessage = this.host.getByTestId('delete-message');
        this.cancelBtn = this.host.getByTestId('delete-cancel-btn');
        this.deleteBtn = this.host.getByTestId('delete-confirm-btn');
    }

    async getModalTitleText(): Promise<string> {
        return await this.deleteMessage.innerText();
    }

    async delete() {
        await this.deleteBtn.click();
    }

    async cancel() {
        await this.cancelBtn.click();
    }

}