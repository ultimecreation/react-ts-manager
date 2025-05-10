import type { ChangeEvent } from "react"

export type Task = {
    id?: string | null,
    title: string,
    dueDate: string,
    completed: boolean,
    sending?: boolean
}

export type TaskRequest = Task & {
    errors?: TaskError | null,
    success: boolean
}

export type TaskError = {
    title?: string
    dueDate?: string
}

export type TmpTask = {
    [key: string]: string | FormDataEntryValue | undefined
}

export type TasksListProps = {
    tasks: Task[]
    handleDeleteTask: (id: string) => void
    handleEditTask: (id: string) => void
    toggleTaskStatus: (event: ChangeEvent<HTMLInputElement>) => void
}