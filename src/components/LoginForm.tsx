import { use, useState, type ChangeEvent, type FormEvent } from 'react'

import type { AuthError, LoginUserRequest, User } from '../types/User'
import { loginUser } from '../actions/db'
import { AuthContext } from '../context/AuthContext'

const LoginForm = () => {
    const authContext = use(AuthContext)
    const initialState: LoginUserRequest = {
        email: "",
        password: "",
    }
    const [errors, setErrors] = useState<AuthError>({})
    const [tmpUser, setTmpUser] = useState(initialState)
    const [successMsg, setSuccessMsg] = useState("")
    // const [state, formAction, pending] = useActionState(handleLoginForm, initialState)

    const handleFormAction = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrors({})

        // const formElement = e.target as HTMLFormElement
        // const formData = new FormData(formElement)
        // const data = Object.fromEntries(formData)


        // tmpUser.email = data.email as string
        // tmpUser.password = data.password as string

        if (tmpUser.email === '') setErrors((prevState) => {
            return { ...prevState, email: "Email is required" }
        })
        if (tmpUser.password === '') setErrors((prevState) => {
            return { ...prevState, password: "Password is required" }
        })
        if (tmpUser.email === '' && tmpUser.password === '') return


        const userFound = await loginUser(tmpUser as User)
        if (userFound !== null) {
            authContext?.login(userFound)
            setTmpUser(initialState)
            setSuccessMsg("You are logged in!")
            setTimeout(() => setSuccessMsg(""), 1000)
        }


    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const formElement = e.target as unknown as HTMLFormElement

        setTmpUser(prevState => {
            return {
                ...prevState,
                [formElement.name]: formElement.value
            }
        })
    }

    return (
        <>
            <div className='col-6 mx-auto'>

                <h1>Login</h1>
                <form onSubmit={handleFormAction} >

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            value={tmpUser.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="text-danger">{errors.email} </p>
                        }                </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            value={tmpUser.password}
                            onChange={handleChange}
                            autoComplete="password"
                        />
                        {errors.password && <p className="text-danger">{errors.password} </p>
                        }
                    </div>
                    {successMsg && <p className="alert alert-success">{successMsg}</p>}
                    <button type="submit" className="btn btn-primary" >Submit</button>
                </form>
            </div>
        </>

    )
}

export default LoginForm
// const SubmitBtn = () => {
//     const { pending } = useFormStatus();
//     return <button type="submit" className="btn btn-primary" disabled={pending}>  {pending ? "Submitting..." : "Submit"}</button>
// }