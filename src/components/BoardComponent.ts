import { Page, Locator, expect } from '@playwright/test';
import { TaskStatus, TaskPriority, TaskLabel } from '../const';

export interface TaskUI {
    id: string;
    title: string;
    assignee: string;
    priority: string;
}

export class BoardComponent {
    private readonly host: Locator;

    constructor(private readonly page: Page) {
        this.host = this.page.getByTestId('kanban-board');
    }

    private getColumn(status: TaskStatus): Locator {
        const columnIds: Record<TaskStatus, string> = {
            [TaskStatus.Backlog]: 'column-backlog',
            [TaskStatus.Todo]: 'column-todo',
            [TaskStatus.InProgress]: 'column-in-progress',
            [TaskStatus.Review]: 'column-review',
            [TaskStatus.Done]: 'column-done'
        };
        return this.host.getByTestId(columnIds[status]);
    }

    getTasksByPriority(priority: TaskPriority): Locator {
        return this.getAllTasks().filter({
            has: this.page.locator('.task-priority', { hasText: priority })
        });
    }

    getTasksByLabel(label: TaskLabel): Locator {
        return this.getAllTasks().filter({
            has: this.page.locator('.task-label', { hasText: label })
        });
    }

    async getBoardState(): Promise<TaskUI[]> {
        const tasks = await this.getAllTasks().all();
        const boardData: TaskUI[] = [];

        for (const card of tasks) {
            boardData.push({
                id: (await card.locator('.task-id').textContent())?.trim() ?? '',
                title: (await card.locator('.task-title').textContent())?.trim() ?? '',
                assignee: (await card.locator('.task-assignee').textContent())?.trim() ?? '',
                priority: (await card.locator('.task-priority').textContent())?.trim() ?? '',
            });
        }
        return boardData;
    }

    async expectTaskToHaveTitle(taskId: string, expectedTitle: string) {
        const titleLocator = this.getTaskTitle(taskId);
        await expect(titleLocator).toContainText(expectedTitle);
    }

    getAllTasks(): Locator {
        return this.host.locator('.task-card:visible');
    }

    getTaskField(taskId: string, fieldClass: '.task-title' | '.task-assignee' | '.task-priority'): Locator {
        return this.getTaskById(taskId).locator(fieldClass);
    }

    getTaskById(taskId: string): Locator {
        return this.host.getByTestId(`task-${taskId}`);
    }

    getTaskTitle(taskId: string): Locator {
        return this.getTaskById(taskId).locator('.task-title');
    }

    getTaskPriorityBadge(taskId: string): Locator {
        return this.getTaskById(taskId).locator('.task-priority');
    }

    getTaskAssigneeLabel(taskId: string): Locator {
        return this.getTaskById(taskId).locator('.task-assignee');
    }

    getColumnBody(status: TaskStatus): Locator {
        return this.getColumn(status).locator('.column-body');
    }

    async getTasksCountInColumn(status: TaskStatus): Promise<number> {
        return await this.getTasksInColumn(status).count();
    }

    async getTasksCountInColumnByUICounter(status: TaskStatus): Promise<number> {
        return Number.parseInt(await this.getColumn(status).locator('.column-count').innerText());
    }

    getTasksInColumn(status: TaskStatus): Locator {
        return this.getColumnBody(status).locator('.task-card');
    }
}