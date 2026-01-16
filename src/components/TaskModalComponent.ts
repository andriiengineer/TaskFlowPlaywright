import { Page, Locator } from "@playwright/test";
import { TaskPriority, TaskStatus, TaskLabel } from "../const";

export class TaskModalComponent {

    readonly host: Locator;
    private readonly modalTitle: Locator
    private readonly titleInput: Locator;
    private readonly titleError: Locator;
    private readonly descriptionInput: Locator;
    private readonly statusSelect: Locator;
    private readonly prioritySelect: Locator;
    private readonly assigneeSelect: Locator;
    private readonly dueDateInput: Locator;
    private readonly saveBtn: Locator;
    private readonly cancelBtn: Locator;


    constructor(private readonly page: Page) {
        this.host = this.page.getByTestId('task-modal');
        this.modalTitle = this.host.getByTestId('modal-title');
        this.titleInput = this.host.getByTestId('task-title-input');
        this.titleError = this.host.getByTestId('title-error');
        this.descriptionInput = this.host.getByTestId('task-description-input');
        this.statusSelect = this.host.getByTestId('task-status-select');
        this.prioritySelect = this.host.getByTestId('task-priority-select');
        this.assigneeSelect = this.host.getByTestId('task-assignee-select');
        this.dueDateInput = this.host.getByTestId('task-due-date-input');
        this.saveBtn = this.host.getByTestId('modal-save-btn');
        this.cancelBtn = this.host.getByTestId('modal-cancel-btn');

    }

    async fillTitle(title: string) {
        await this.titleInput.fill(title);
    }

    async fillDescription(description: string) {
        await this.descriptionInput.fill(description);
    }

    async setStatus(status: TaskStatus) {
        await this.statusSelect.selectOption(status);
    }

    async setPriority(priority: TaskPriority) {
        await this.prioritySelect.selectOption(priority);
    }

    async setAssignee(assignee: string) {
        await this.assigneeSelect.selectOption(assignee);
    }

    async setDueDate(date: string) {
        await this.dueDateInput.fill(date);
    }

    async selectLabels(labels: TaskLabel | TaskLabel[]) {
        const labelsArray = Array.isArray(labels) ? labels : [labels];

        for (const label of labelsArray) {
            const checkbox = this.host.getByTestId(`label-${label.toLocaleLowerCase}-checkbox`);
            await checkbox.check();
        }
    }

    async save() {
        await this.saveBtn.click();
    }

    async cancel() {
        await this.cancelBtn.click();
    }

    async getModalTitleText(): Promise<string> {
        return await this.modalTitle.innerText();
    }

    async getTitleErrorText(): Promise<string> {
        return await this.titleError.innerText();
    }
}
