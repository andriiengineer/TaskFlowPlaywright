import { test, expect } from '../fixtures/test'
import { TASKS_LIST } from '../src/test-data/tasks.data'
import { TaskPriority, USERS } from '../src/const'

test.describe('Search and Filter tests', () => {

    test.beforeEach(async ({ api, app }) => {
        await app.open()
        await api.injectTasks(TASKS_LIST)
    })

    test('FLT-01 (Search Real-time)', async ({ app }) => {
        const testSearch = 'fix'

        await app.header.searchTask(testSearch)
        let currentTasksOnBoard = await app.board.getBoardState()
        expect(currentTasksOnBoard.length).toBe(3)
        currentTasksOnBoard.forEach(task => {
            expect(task.title.toLowerCase()).toContain(testSearch)
        });
    });

    test('FLT-02 (Combined Filter): Priority Medium and Assignee "AliceS mith', async ({ app }) => {
        const testUser = USERS.AliceSmith
        const testPriority = TaskPriority.Medium

        await app.header.selectAssignee(testUser.fullName)
        await app.header.selectPriority(testPriority)


        let currentTasksOnBoard = await app.board.getBoardState()

        currentTasksOnBoard.forEach(task => {
            expect(task.assignee.toUpperCase().trim()).toEqual(testUser.shortName)
            expect(task.priority.toLowerCase().trim()).toEqual(testPriority.toLowerCase())
        });
    });
})