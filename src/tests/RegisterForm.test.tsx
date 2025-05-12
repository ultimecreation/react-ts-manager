import { render, screen } from "@testing-library/react";
import { describe } from "vitest";
import RegisterForm from "../components/RegisterForm";
import { userEvent } from '@testing-library/user-event'

const fakeUser = {
    username: "test-user",
    email: "test-user@mail.com",
    password: "123"
}
describe("Register Form", () => {
    describe("Interactions", () => {

        it("Updates username when user enter its username", async () => {
            render(<RegisterForm />)

            const usernameInput: HTMLInputElement = screen.getByLabelText("Username")
            const submitBtn = screen.getByRole("button", { name: "Submit" })

            await userEvent.type(usernameInput, fakeUser.username)
            await userEvent.click(submitBtn)
            expect(usernameInput.value).toBe(fakeUser.username)
        })

        it("Updates email when user enter its email", async () => {
            render(<RegisterForm />)

            const emailInput: HTMLInputElement = screen.getByLabelText("Email")
            const submitBtn = screen.getByRole("button", { name: "Submit" })

            await userEvent.type(emailInput, fakeUser.email)
            await userEvent.click(submitBtn)
            expect(emailInput.value).toBe(fakeUser.email)
        })

        it("Updates password when user enter its password", async () => {
            render(<RegisterForm />)

            const passwordInput: HTMLInputElement = screen.getByLabelText("Password")
            const submitBtn = screen.getByRole("button", { name: "Submit" })

            await userEvent.type(passwordInput, fakeUser.password)
            await userEvent.click(submitBtn)
            expect(passwordInput.value).toBe(fakeUser.password)
        })
    })

    describe("Error handling", () => {
        it("Receives username error when user submit form without username", async () => {
            render(<RegisterForm />)

            const submitBtn = screen.getByRole("button", { name: "Submit" })
            await userEvent.click(submitBtn)

            const usernameError = await screen.findByText("Username is required")
            expect(usernameError).toBeInTheDocument()
        })

        it("Receives email error when user submit form without email", async () => {
            render(<RegisterForm />)

            const submitBtn = screen.getByRole("button", { name: "Submit" })
            await userEvent.click(submitBtn)

            const emailError = await screen.findByText("Email is required")
            expect(emailError).toBeInTheDocument()
        })

        it("Receives password error when user submit form without password", async () => {
            render(<RegisterForm />)

            const submitBtn = screen.getByRole("button", { name: "Submit" })
            await userEvent.click(submitBtn)

            const passwordError = await screen.findByText("Password is required")
            expect(passwordError).toBeInTheDocument()
        })
    })
})