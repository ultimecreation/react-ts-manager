import { describe } from "vitest";
import TasksPage from "../components/TasksPage";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


describe('Task page', () => {
    it("Task page exists", () => {
        render(<TasksPage />)
        const taskPageContainer = screen.getByTestId("TaskPage")

        expect(taskPageContainer).toBeInTheDocument()
    })

    it("Updates form fields properly", async () => {
        render(<TasksPage />)

        const titleInput: HTMLInputElement = screen.getByLabelText("Title")
        const dueDateInput: HTMLInputElement = screen.getByLabelText("Due date")
        const submitBtn = screen.getByRole("button", { name: "Submit" })

        await userEvent.type(titleInput, "Task 1")
        await fireEvent.change(dueDateInput, { target: { value: "2025-05-09" } })
        await userEvent.click(submitBtn)

        expect(titleInput.value).toBe("Task 1")
        expect(dueDateInput.value).toBe("2025-05-09")

    })

    it("Displays title and due date errors when form is submitted with  empty fields", async () => {
        render(<TasksPage />)

        const submitBtn = screen.getByRole("button", { name: "Submit" })

        await userEvent.click(submitBtn)

        const titleError = screen.getByText("Title is required")
        const dueDateError = screen.getByText("Due date is required")
        expect(titleError).toBeInTheDocument()
        expect(dueDateError).toBeInTheDocument()

    })

})