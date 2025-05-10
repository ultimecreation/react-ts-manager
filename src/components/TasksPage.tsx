
import TaskForm from './TaskForm'
import type { TaskFormActionType } from '../types/Form'
import type { Task } from '../types/Task'
import { startTransition, useEffect, useOptimistic, useState, type ChangeEvent, type FormEvent, } from 'react'
import { deleteTask, getTask, getTasks, saveTask, updateTask } from '../actions/db'
import TasksList from './TasksList'

const TasksPage = () => {

    const initialState: Task = {
        title: "",
        dueDate: "",
        completed: false
    }
    const [errors, setErrors] = useState({})
    const [task, setTask] = useState(initialState)
    const [tasks, setTasks] = useState<Task[]>([])
    const [optimisticTasks, dispatch] = useOptimistic(tasks, reducer)

    const handleTaskForm: TaskFormActionType = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const tmpTask: Task = initialState
        setErrors({})

        const formElement = e.target as HTMLFormElement
        const formData = new FormData(formElement)
        const data = Object.fromEntries(formData)

        if (data.id !== null) tmpTask.id = data.id as string
        tmpTask.title = data.title as string
        tmpTask.dueDate = data.dueDate as string
        tmpTask.completed = formElement.completed?.defaultChecked ?? false

        if (tmpTask.title === "") await setErrors((prevState) => {
            return { ...prevState, title: "Title is required" }
        })
        if (tmpTask.dueDate === "") await setErrors((prevState) => {
            return { ...prevState, dueDate: "Due date is required" }
        })

        if (tmpTask.title !== '' && tmpTask.dueDate !== '') {

            if (typeof tmpTask.id !== 'undefined') {
                await handleUpdateTask(tmpTask)
            } else {
                await handleCreateTask(tmpTask)
            }
            const savedTasks = await getTasks()

            startTransition(async () => {
                setTasks(savedTasks)
                setTask({
                    title: "",
                    dueDate: "",
                    completed: false
                })
            })
        }
        return
    }

    const handleCreateTask: (tmpTask: Task) => void = async (tmpTask: Task) => {
        startTransition(async () => {
            dispatch({ type: "ADD", payload: { ...tmpTask, sending: true } })
            await new Promise((resolve) => setTimeout(() => resolve(true), 1000))
        })

        startTransition(async () => {
            await saveTask(tmpTask)
        })
    }
    const handleUpdateTask: (tmpTask: Task) => void = async (tmpTask: Task) => {
        startTransition(async () => {
            dispatch({ type: "UPDATE", payload: { ...tmpTask, sending: true } })
            await new Promise((resolve) => setTimeout(() => resolve(true), 1000))
        })

        startTransition(async () => {
            await updateTask(tmpTask as unknown as Task)
        })
    }
    const handleDeleteTask: (id: string) => void = async (id: string) => {
        if (id !== '') {
            const foundTask = await getTask(id) as unknown as Task

            startTransition(async () => {
                dispatch({ type: "UPDATE", payload: { ...foundTask, sending: true } })
                await new Promise((resolve) => setTimeout(() => resolve(true), 1000))

                startTransition(async () => {
                    dispatch({ type: "DELETE", payload: { ...foundTask } })
                    await deleteTask(foundTask.id!)

                    startTransition(async () => {
                        const savedTasks = await getTasks()
                        setTasks(savedTasks)
                    })
                })

            })
        }
    }

    const handleEditTask: (id: string) => void = async (id: string) => {
        if (id !== '') {
            const foundTask = await getTask(id)
            setTask(foundTask)
        }
    }

    const toggleTaskStatus: (event: ChangeEvent<HTMLInputElement>) => void = async (event: ChangeEvent<HTMLInputElement>) => {
        const tmpTask: Task = await getTask(event.target.value)
        tmpTask.completed = !event.target.checked

        startTransition(async () => {
            dispatch({ type: "UPDATE", payload: { ...tmpTask, sending: true } })
            await new Promise((resolve) => setTimeout(() => resolve(true), 1000))

            startTransition(async () => {
                setTask(initialState)
                await updateTask(tmpTask as unknown as Task)
                const savedTasks = await getTasks()

                startTransition(async () => {
                    return setTasks(savedTasks)
                })
            })
        })
    }

    useEffect(() => {
        getTasks().then(tasks => setTasks(tasks))
    }, [])


    return (
        <div className='col-md-6 col-lg-5 mx-auto'>


            <TaskForm
                formAction={handleTaskForm}
                task={task}
                setTask={setTask}
                errors={errors}
            />
            <TasksList
                tasks={optimisticTasks}
                handleDeleteTask={handleDeleteTask}
                handleEditTask={handleEditTask}
                toggleTaskStatus={toggleTaskStatus}
            />

        </div>
    )
}

export default TasksPage

const reducer: (state: Task[], action: { type: string, payload: Task }) => Task[] = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return [...state, action.payload]
        case 'UPDATE': {
            const taskIndexToRemove = state.findIndex((task) => task.id === action.payload.id)
            state[taskIndexToRemove] = { ...action.payload }
            return [...state]
        }
        case 'DELETE':
            return state.filter(task => task.id !== action.payload.id)

        default:
            return state
    }
}