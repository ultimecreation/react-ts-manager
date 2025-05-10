"use server"
import type { RegisterUserRequest, TmpUser, User } from "../types/User"
import { saveUser } from "./db"

export const handleRegisterForm = async (state: RegisterUserRequest, formData: FormData) => {
    await new Promise((resolve) => setTimeout(() => resolve(true), 1000))
    state.errors = {}
    const tmpRegisterUser: TmpUser = {}
    formData.forEach((value: FormDataEntryValue, key: string) => tmpRegisterUser[key] = value)

    if (!tmpRegisterUser.username) state.errors.username = "Username is required"
    if (!tmpRegisterUser.email) state.errors.email = "Email is required"
    if (!tmpRegisterUser.password) state.errors.password = "Password is required"

    state.username = tmpRegisterUser.username! as string
    state.email = tmpRegisterUser.email! as string
    state.password = tmpRegisterUser.password! as string

    const success = await saveUser(tmpRegisterUser as User)
    if (success !== null) {
        state.success = true
        state.username = ""
        state.email = ""
        state.password = ""
    }

    return state
}
