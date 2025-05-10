export type User = {
    id?: string
    username: string
    email: string
    password: string
}

export type LoginUserRequest = Omit<User, "username">

export type RegisterUserRequest = {
    username?: string
    email?: string
    password?: string
    errors: AuthError,
    success: boolean
}

export type TmpUser = {
    [key: string]: string | FormDataEntryValue | undefined
}


export type AuthError = {
    username?: string
    email?: string
    password?: string
}