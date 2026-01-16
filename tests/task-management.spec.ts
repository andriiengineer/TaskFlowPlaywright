import { test, expect } from '../fixtures/test'
import { ContextMenuAction } from '../src/const';
import { TASK } from '../src/test-data/tasks.data';

test.describe('CRUD Task', () => {
    test('CR-01 Try to create task without Title, and get Error message ', async ({ app, api }) => {
        await api.clear()
        await app.header.clickNewTask()

        await app.taskModal.save()

        expect(await app.taskModal.getTitleErrorText()).toEqual('Title is required')

    });

    test('CR-02 Create Task + Toast', async ({ app, api }) => {

        await api.injectTasks(TASK)
        await app.header.clickNewTask()

        await app.taskModal.fillTitle('Test 0987654321 !@#$')

        await app.taskModal.save()

        await app.board.expectTaskToHaveTitle('TASK-1000', 'Test 0987654321 !@#$')
        expect(await app.getLastToastMessage()).toContain('Task created successfully')

    });

    test('CR-03 Context Menu Edit', async ({ app, api }) => {

        await api.injectTasks(TASK)
        const taskLocator = app.board.getTaskById(TASK[0].id)
        await app.board.expectTaskToHaveTitle(TASK[0].id, TASK[0].title)
        await taskLocator.click({ button: 'right' })
        await app.contextMenu.selectAction(ContextMenuAction.Edit)
        await app.taskModal.fillTitle(TASK[0].title + ' - EDIT NOW HERE')
        await app.taskModal.save()

        await app.board.expectTaskToHaveTitle(TASK[0].id, TASK[0].title + ' - EDIT NOW HERE')
        expect(await app.getLastToastMessage()).toContain('Task updated successfully')

    });


    test('CR-04 Context Menu Delete', async ({ app, api }) => {

        await api.injectTasks(TASK)
        const taskLocator = app.board.getTaskById(TASK[0].id)
        await app.board.expectTaskToHaveTitle(TASK[0].id, TASK[0].title)
        await taskLocator.click({ button: 'right' })
        await app.contextMenu.selectAction(ContextMenuAction.Delete)
        await app.deleteModal.delete()

        expect(await app.board.getAllTasks().count()).toBe(0)
        expect(await app.getLastToastMessage()).toContain('Deleted 1 task(s)')

    });
})