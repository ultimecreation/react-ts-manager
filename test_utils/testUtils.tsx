import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router"
import { AuthContextProvider } from '../src/context/AuthContext'
import type { ReactNode } from "react"
const fakeUser = {
    username: "test-user",
    email: "test-user@mail.com",
    password: "123"
}

export const renderWithAuth = (component: ReactNode) => {
    localStorage.setItem('user', JSON.stringify(fakeUser))
    return render(<BrowserRouter>
        <AuthContextProvider      >
            {component}
        </AuthContextProvider>
    </BrowserRouter>)
}

