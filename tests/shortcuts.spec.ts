import { test, expect } from '../fixtures/test'
import { TASK } from '../src/test-data/tasks.data';

test.describe('Keyboard Shortcuts', () => {
    test('Should open Create Modal by pressing "N"', async ({ app, page }) => {
        await page.keyboard.press('n')
        await expect(app.taskModal.host).toBeVisible()
    });

    test('Should delete tasks  pressing "delete"', async ({ api, app, page }) => {
        await api.injectTasks(TASK)
        const taskLocator = app.board.getTaskById(TASK[0].id)
        await taskLocator.click()
        await page.keyboard.press('Delete')
        await app.deleteModal.delete()
        expect(await app.board.getAllTasks().count()).toBe(0)
    });

    test('Should Duplicate  by pressing "Ctrl+D"', async ({ api, app, page }) => {
        await api.injectTasks(TASK)
        const taskLocator = app.board.getTaskById(TASK[0].id)
        await taskLocator.click()
        await page.keyboard.press('Control+d')
        await app.board.expectTaskToHaveTitle('TASK-1000', `${TASK[0].title} (Copy)`)
    });
})