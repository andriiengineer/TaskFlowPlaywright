import { test, expect } from '../fixtures/test'

test.describe('Smoke, Health Check', () => {
    test('Test-0001: Check App Layout', async ({app, api }) => {
        await api.clear()
        await expect(await app.header.getLogoText()).toEqual('TaskFlow')
        await expect(await app.board.getAllTasks().count()).toBe(0)
    });
})