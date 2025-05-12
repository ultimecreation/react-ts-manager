import { render, screen } from "@testing-library/react";
import { describe, vi } from "vitest";
import TasksList from "../components/TasksList";
import type { Task } from "../types/Task";
import userEvent from "@testing-library/user-event";

describe("TasksList", () => {
    const tasks: Task[] = []
    const handleDeleteTask = vi.fn()
    const handleEditTask = vi.fn()
    const toggleTaskStatus = vi.fn()
    const fakeTasksArray: Task[] = [
        {
            id: "1",
            title: "task 1",
            dueDate: "2025-05-09",
            completed: false,
        },

        {
            id: "2",
            title: "task 2",
            dueDate: "2025-05-09",
            completed: true,
        }
    ]

    it("Dispalys 'No tasks found' when no tasks are found", () => {
        render(<TasksList
            tasks={tasks}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
            toggleTaskStatus={toggleTaskStatus} />
        )

        const noTaskFoundText = screen.getByText("No tasks found")
        expect(noTaskFoundText).toBeInTheDocument()
    })

    it("Display the right number of tasks with default setting", () => {
        const tasks: Task[] = [...fakeTasksArray]

        const { container } = render(<TasksList
            tasks={tasks}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
            toggleTaskStatus={toggleTaskStatus} />
        )
        const taskItems = container.getElementsByClassName("list-item")

        expect(taskItems.length).toBe(2)
    })

    it("Display the right number of tasks when user click on 'Done' button", async () => {
        const tasks: Task[] = [...fakeTasksArray]

        const { container } = render(<TasksList
            tasks={tasks}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
            toggleTaskStatus={toggleTaskStatus} />
        )

        await userEvent.click(screen.getByText("Done"))
        const taskItems = container.getElementsByClassName("list-item")

        expect(taskItems.length).toBe(1)
    })

    it("Display the right number of tasks when user click on 'All' button", async () => {
        const tasks: Task[] = [...fakeTasksArray]

        const { container } = render(<TasksList
            tasks={tasks}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
            toggleTaskStatus={toggleTaskStatus} />
        )

        await userEvent.click(screen.getByText("All"))
        const taskItems = container.getElementsByClassName("list-item")

        expect(taskItems.length).toBe(2)
    })

    it("Display the right number of tasks when user click on 'Not done' button", async () => {
        const tasks: Task[] = [...fakeTasksArray]

        const { container } = render(<TasksList
            tasks={tasks}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
            toggleTaskStatus={toggleTaskStatus} />
        )

        await userEvent.click(screen.getByText("Not done"))
        const taskItems = container.getElementsByClassName("list-item")

        expect(taskItems.length).toBe(1)
    })

    it("Call 'Edit' handler when user click 'Edit' button", async () => {
        const tasks: Task[] = [fakeTasksArray[0]]

        const { container } = render(<TasksList
            tasks={tasks}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
            toggleTaskStatus={toggleTaskStatus} />
        )
        const editBtn = container.getElementsByClassName("bi bi-pencil-fill")[0]
        await userEvent.click(editBtn)


        expect(handleEditTask).toHaveBeenCalledTimes(1)
    })

    it("Call 'Delete' handler when user click 'Delete' button", async () => {
        const tasks: Task[] = [fakeTasksArray[0]]

        const { container } = render(<TasksList
            tasks={tasks}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
            toggleTaskStatus={toggleTaskStatus} />
        )
        const editBtn = container.getElementsByClassName("bi bi-trash-fill")[0]
        await userEvent.click(editBtn)


        expect(handleEditTask).toHaveBeenCalledTimes(1)
    })
})