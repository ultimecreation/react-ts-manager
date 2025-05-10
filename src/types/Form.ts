import type { Dispatch, FormEvent, SetStateAction } from "react";
import type { Task, TaskError } from "./Task";

export type TaskFormActionType = (e: FormEvent<HTMLFormElement>) => void

export type TaskFormProps = {
    formAction: TaskFormActionType
    task: Task
    setTask: Dispatch<SetStateAction<Task>>
    errors: TaskError
}