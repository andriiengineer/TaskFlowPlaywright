import { Page, Locator, expect } from '@playwright/test';
import { ContextMenuAction } from '../const';

export class ContextMenuComponent {
    private readonly host: Locator;

    constructor(private readonly page: Page) {
        this.host = this.page.getByTestId('context-menu');
    }

    async selectAction(action: ContextMenuAction): Promise<void> {
        const actionMap: Record<ContextMenuAction, string> = {
            [ContextMenuAction.Edit]: 'context-edit',
            [ContextMenuAction.Duplicate]: 'context-duplicate',
            [ContextMenuAction.CopyLink]: 'context-copy-link',
            [ContextMenuAction.MoveToTodo]: 'context-move-todo',
            [ContextMenuAction.MoveToInProgress]: 'context-move-progress',
            [ContextMenuAction.MoveToDone]: 'context-move-done',
            [ContextMenuAction.Delete]: 'context-delete'
        };

        const testId = actionMap[action];
        
        const menuItem = this.host.getByTestId(testId);

        await menuItem.click();
        
        await expect(this.host).toBeHidden();
    }

    async isVisible(): Promise<boolean> {
        return this.host.isVisible();
    }
}