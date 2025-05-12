import { render, screen } from "@testing-library/react"
import LoginForm from "../components/LoginForm"
import { describe, it } from "vitest"
import userEvent from "@testing-library/user-event"

const fakeUser = {
    username: "test-user",
    email: "test-user@mail.com",
    password: "123"
}
describe("Login", () => {
    describe("Interactions", () => {
        it("Update email when user enter an email", async () => {
            render(<LoginForm />)

            const emailInput: HTMLInputElement = screen.getByLabelText("Email")

            await userEvent.type(emailInput, fakeUser.email)

            expect(emailInput.value).toBe(fakeUser.email)
        })
        it("Update password when user enter an password", async () => {
            render(<LoginForm />)

            const passwordInput: HTMLInputElement = screen.getByLabelText("Password")

            await userEvent.type(passwordInput, fakeUser.password)

            expect(passwordInput.value).toBe(fakeUser.password)
        })
    })

    describe("Error handling", () => {
        it("Dispalys email error when submitted email is empty", async () => {
            render(<LoginForm />)

            const submitBtn = screen.getByRole("button", { name: "Submit" })

            await userEvent.click(submitBtn)

            const emailError = await screen.findByText("Email is required")

            expect(emailError).toBeInTheDocument()


        })
        it("Dispalys password error when submitted password is empty", async () => {
            render(<LoginForm />)

            const submitBtn = screen.getByRole("button", { name: "Submit" })

            await userEvent.click(submitBtn)

            const passwordError = await screen.findByText("Password is required")

            expect(passwordError).toBeInTheDocument()


        })
    })
})