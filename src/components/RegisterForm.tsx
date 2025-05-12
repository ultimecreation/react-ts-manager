import { useActionState } from 'react'
import { handleRegisterForm } from '../actions/form'
import type { RegisterUserRequest } from '../types/User'


const RegisterForm = () => {
    const initialState: RegisterUserRequest = {
        username: "",
        email: "",
        password: "",
        errors: {},
        success: false
    }

    const [state, formAction, pending] = useActionState(handleRegisterForm, initialState)

    return (
        <div className='col-6 mx-auto'>
            <h1>Register</h1>
            <form action={formAction}>

                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        id="username"
                        defaultValue={state.username}
                    />
                    {state.errors.username && <p className="text-danger">{state.errors.username} </p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        defaultValue={state.email}
                    />
                    {state.errors.email && <p className="text-danger">{state.errors.email} </p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                        defaultValue={state.password}
                        autoComplete="password"
                    />
                    {state.errors.password && <p className="text-danger">{state.errors.password} </p>}
                </div>
                {state.success && <p className="alert alert-success">You are Registered in!</p>}
                <button type="submit" className="btn btn-primary" disabled={pending}>{pending ? "Submitting" : "Submit"}</button>
            </form>
        </div>
    )
}

export default RegisterForm