"use server"

import type { Task } from "../types/Task"
import type { User } from "../types/User"

export const getTasks = async () => {
    const tasks = await (await fetch("http://localhost:3000/tasks")).json()
    return tasks
}

export const getTask: (id: string) => Promise<Task> = async (id: string) => {
    const task = await (await fetch(`http://localhost:3000/tasks/${id}`)).json()
    return task
}

export const saveTask: (task: Task) => Promise<Task> = async (task: Task) => {
    const savedTask = await (await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(task)
    })).json()
    return savedTask
}

export const updateTask: (task: Task) => Promise<Task> = async (task: Task) => {
    const updatedTask = await (await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: "PUT",
        body: JSON.stringify(task)
    })).json()
    return updatedTask
}

export const deleteTask: (id: string) => Promise<string> = async (id: string) => {
    if (typeof id !== "undefined") {
        const foundTask = await getTask(id)
        if (foundTask) {
            return await (await fetch(`http://localhost:3000/tasks/${id}`, {
                method: "DELETE"
            })).json()
        }
    }

}

export const saveUser: (user: User) => Promise<User> = async (user: User) => {

    const userFound = await (await fetch(`http://localhost:3000/users?email=${user.email}&password=${user.password}`)).json()
    if (userFound.length === 0) {
        console.log(user)
        const foundUser = await (await fetch("http://localhost:3000/users", {
            method: "POST",
            body: JSON.stringify(user)
        })).json()

        return foundUser
    }
    return null
}

export const getUser: (id: string) => Promise<User> = async (id: string) => {
    const userFound = await (await fetch(`http://localhost:3000/users/${id}`)).json()
    if (userFound.length === 0) {
        return userFound[0]
    }
    return null
}

export const loginUser = async (user: User) => {
    const userFound = await (await fetch(`http://localhost:3000/users?password=${user.password}&email=${user.email}`)).json()

    if (userFound.length === 0) return null
    delete userFound[0].password
    return userFound[0]
}