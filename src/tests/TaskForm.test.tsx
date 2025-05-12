import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import TaskForm from "../components/TaskForm";
import userEvent from "@testing-library/user-event";

const errors = {
    title: '',
    dueDate: ''
}
const task = {
    title: 'test',
    dueDate: '',
    completed: false
}
const setTask = vi.fn()
const formAction = vi.fn()


describe('Task Form', () => {

    it("Displays title error when no title is submitted", async () => {
        errors.title = "Title is required"
        render(<TaskForm
            formAction={formAction}
            task={task}
            setTask={setTask}
            errors={errors} />
        )

        await userEvent.click(screen.getByRole("button", { name: "Submit" }))

        const titleError = screen.getByText("Title is required")
        expect(formAction).toHaveBeenCalledTimes(1)
        expect(titleError).toBeInTheDocument()
        formAction.mockClear()
    })
    it("Displays title error when no title is submitted", async () => {
        errors.dueDate = "Due date is required"
        render(<TaskForm
            formAction={formAction}
            task={task}
            setTask={setTask}
            errors={errors} />
        )

        await userEvent.click(screen.getByRole("button", { name: "Submit" }))

        const titleError = screen.getByText("Due date is required")
        expect(formAction).toHaveBeenCalledTimes(1)
        expect(titleError).toBeInTheDocument()
        formAction.mockClear()
    })

    it("Updates title  when user submit a title", async () => {
        const task = {
            title: 'Task 1',
            dueDate: '',
            completed: false
        }
        render(<TaskForm
            formAction={formAction}
            task={task}
            setTask={setTask}
            errors={errors} />
        )

        const titleInput: HTMLInputElement = screen.getByLabelText("Title")
        await userEvent.type(titleInput, "Task 1")

        expect(titleInput.value).toBe("Task 1")
        formAction.mockClear()
    })

    it("Updates due date  when user submit a due date", async () => {
        const task = {
            title: '',
            dueDate: '2025-05-09',
            completed: false
        }
        render(<TaskForm
            formAction={formAction}
            task={task}
            setTask={setTask}
            errors={errors} />
        )

        const dueDateInput: HTMLInputElement = screen.getByLabelText("Due date")
        await fireEvent.change(dueDateInput, { target: { value: "2025-05-09" } })

        expect(dueDateInput.value).toBe("2025-05-09")
        formAction.mockClear()
    })

    it("Display 'Create Task' when no task id is provided", async () => {
        const task = {
            title: '',
            dueDate: '',
            completed: false
        }
        render(<TaskForm
            formAction={formAction}
            task={task}
            setTask={setTask}
            errors={errors} />
        )

        const h1 = screen.getByRole("heading", { name: "Create Task" })


        expect(h1).toBeInTheDocument()

    })

    it("Display 'Edit Task' when no task id is provided", async () => {
        const task = {
            id: '1',
            title: '',
            dueDate: '',
            completed: false
        }
        render(<TaskForm
            formAction={formAction}
            task={task}
            setTask={setTask}
            errors={errors} />
        )

        const h1 = screen.getByRole("heading", { name: "Edit Task" })


        expect(h1).toBeInTheDocument()

    })

})