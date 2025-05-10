import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Navbar from '../components/Navbar'
import { BrowserRouter } from 'react-router'
import { renderWithAuth } from '../../test_utils/testUtils'
// const fakeUser = {
//     username: "test-user",
//     email: "test-user@mail.com",
//     password: "123"
// }

// const saveFakeUser = async (user: User) => {
//     return await (await fetch(`http://localhost:3000/users`, {
//         method: "POST",
//         body: JSON.stringify(user)
//     })).json()
// }


describe("Navbar", () => {
    it("Navbar exists in the document", () => {
        render(<BrowserRouter>
            <Navbar />
        </BrowserRouter>)
        const nav = screen.getByRole("navigation")
        expect(nav).toBeInTheDocument()
    })

    it("Link to Homepage exists", () => {
        render(<BrowserRouter>
            <Navbar />
        </BrowserRouter>)
        const homeLink = screen.getByRole("link", { name: "Task Manager" })
        expect(homeLink).toBeInTheDocument()
    })

    it("Link to Homepage point to '/'", () => {
        render(<BrowserRouter>
            <Navbar />
        </BrowserRouter>)
        const homeLink = screen.getByRole("link", { name: "Task Manager" })
        expect(homeLink.getAttribute('href')).toEqual('/')
    })

    it("Link to login page exists", () => {
        render(<BrowserRouter>
            <Navbar />
        </BrowserRouter>)
        const loginLink = screen.getByRole("link", { name: "Login" })
        expect(loginLink).toBeInTheDocument()
    })

    it("Link to login point to '/login'", () => {
        render(<BrowserRouter>
            <Navbar />
        </BrowserRouter>)
        const loginLink = screen.getByRole("link", { name: "Login" })
        expect(loginLink.getAttribute('href')).toEqual('/login')
    })

    it("Link to tasks page exists", async () => {
        renderWithAuth(<Navbar />)

        const tasksLink = await screen.findByRole("link", { name: "Tasks" })
        expect(tasksLink).toBeInTheDocument()
    })

    it("Link to tasks point to '/tasks'", async () => {
        renderWithAuth(<Navbar />)

        const tasksLink = await screen.findByRole("link", { name: "Tasks" })
        expect(tasksLink.getAttribute('href')).toEqual('/tasks')
    })

    it("Link to register page exists", () => {
        render(<BrowserRouter>
            <Navbar />
        </BrowserRouter>)
        const registerLink = screen.getByRole("link", { name: "Register" })
        expect(registerLink).toBeInTheDocument()
    })

    it("Link to register point to '/register'", () => {
        render(<BrowserRouter>
            <Navbar />
        </BrowserRouter>)
        const registerLink = screen.getByRole("link", { name: "Register" })
        expect(registerLink.getAttribute('href')).toEqual('/register')
    })
})