
import { useFormStatus } from 'react-dom'
import type { TaskFormProps } from '../types/Form'
import type { ChangeEvent } from 'react'


const TaskForm = ({ formAction, task, setTask, errors }: TaskFormProps) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const formElement = e.target as unknown as HTMLFormElement
        if (formElement.type === 'checkbox') {
            setTask(prevState => {
                return {
                    ...prevState,
                    [formElement.name]: !formElement.checked
                }
            })
        }

        setTask(prevState => {
            return {
                ...prevState,
                [formElement.name]: formElement.value
            }
        })
    }

    return (
        <>
            <h1>{!task.id ? "Create" : "Edit"} Task</h1>
            <form onSubmit={formAction} >
                {task.id && (
                    <>
                        <input type="hidden" name="id" defaultValue={task.id} />
                        <input type="hidden" name="completed" defaultChecked={task.completed ? true : false} />
                    </>
                )}
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        id="title"
                        value={task.title}
                        onChange={handleChange}
                    />
                    {errors?.title && <p className="text-danger">{errors.title} </p>
                    }                </div>
                <div className="mb-3">
                    <label htmlFor="dueDate" className="form-label">Due date</label>
                    <input
                        type="date"
                        className="form-control"
                        name="dueDate"
                        id="dueDate"
                        value={task.dueDate}
                        onChange={handleChange}
                    />
                    {errors?.dueDate && <p className="text-danger">{errors.dueDate} </p>
                    }
                </div>
                {/* {task.id && (
                    <div className="mb-3">
                        <div className="form-check">
                            <input className="form-check-input" name="completed" type="checkbox" id="completed" onChange={handleChange} checked={task.completed === true ? true : false} />
                            <label className="form-check-label" htmlFor="completed">
                                Completed
                            </label>
                        </div>
                    </div>

                )} */}
                <SubmitBtn />


            </form>
        </ >
    )
}

export default TaskForm
const SubmitBtn = () => {
    const { pending } = useFormStatus();
    return <button type="submit" className="btn btn-primary" disabled={pending}>  {pending ? "Submitting..." : "Submit"}</button>
}