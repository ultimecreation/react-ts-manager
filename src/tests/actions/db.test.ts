import { describe } from "vitest";
import { deleteTask, getTask, getUser, updateTask } from "../../actions/db";
import { server } from "../../msw/server";
import type { Task } from "../../types/Task";

beforeAll(() => server.listen())
beforeEach(() => {
    server.resetHandlers()
})
afterAll(() => server.close())

describe("Action db", () => {
    test("Get task by id ", async () => {
        const data = await getTask("1")
        expect(data).toEqual([{
            id: "1",
            title: "task 1",
            dueDate: "2025-05-09",
            completed: false,
        }])

    })
    test("Get task by id ", async () => {
        const data = await getTask("1")
        expect(data).toEqual([{
            id: "1",
            title: "task 1",
            dueDate: "2025-05-09",
            completed: false,
        }])

    })
    test("Update task by id ", async () => {
        const task: Task = {
            id: "1",
            title: "task 1",
            dueDate: "2025-05-09",
            completed: false,
        }
        const data = await updateTask(task)
        expect(data).toEqual([{
            id: "1",
            title: "task 1 updated",
            dueDate: "2025-05-09",
            completed: false,
        }])

    })
    test("delete task by id ", async () => {

        const response = await deleteTask("1")
        expect(response).toEqual({})

    })
    test("Get User by id ", async () => {
        const data = await getUser("1")
        expect(data).toEqual(null)

    })
    test("Save user", async () => {
        const data = await getUser("1")
        expect(data).toEqual(null)

    })
})