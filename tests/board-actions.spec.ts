import { test, expect } from '../fixtures/test'
import { ContextMenuAction, TaskStatus } from '../src/const';
import { TASK } from '../src/test-data/tasks.data';

test.describe('Board Actions tests', () => {
    test('ACT-01 (Drag & Drop)', async ({ app, api }) => {

        const toDoLocator = app.board.getColumnBody(TaskStatus.Todo)
        const taskLocator = app.board.getTaskById(TASK[0].id)

        await api.injectTasks(TASK)
        await taskLocator.dragTo(toDoLocator)

        expect(await app.board.getTasksCountInColumn(TaskStatus.Backlog)).toBe(0)
        expect(await app.board.getTasksCountInColumnByUICounter(TaskStatus.Backlog)).toBe(0)

        expect(await app.board.getTasksCountInColumn(TaskStatus.Todo)).toBe(1)
        expect(await app.board.getTasksCountInColumnByUICounter(TaskStatus.Todo)).toBe(1)
    });


    test('ACT-02 (Undo/Redo Flow)', async ({ app, api }) => {

        test.info().annotations.push({
            type: 'issue',
            description: 'Bug: Undo reverts two actions instead of one; subsequent Redo state becomes inconsistent.'
        });
        test.fixme()
        const taskLocator = app.board.getTaskById(TASK[0].id)

        await api.injectTasks(TASK)

        expect(await app.board.getTasksCountInColumn(TaskStatus.Backlog)).toBe(1)

        await taskLocator.click({ button: 'right' })
        await app.contextMenu.selectAction(ContextMenuAction.Delete)
        await app.deleteModal.delete()

        expect(await app.board.getTasksCountInColumn(TaskStatus.Backlog)).toBe(0)

        await app.header.clickUndo()
        expect(await app.board.getTasksCountInColumn(TaskStatus.Backlog)).toBe(1)

        await app.header.clicRedo()
        expect(await app.board.getTasksCountInColumn(TaskStatus.Backlog)).toBe(0)

    });

    test.fixme(true, 'Bug: Only one task is moved during bulk drag and drop instead of all selected tasks.');

})