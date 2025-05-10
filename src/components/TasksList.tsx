import { useEffect, useState, type ChangeEvent } from 'react'
import type { Task, TasksListProps } from '../types/Task'

const TasksList = ({ tasks, handleDeleteTask, handleEditTask, toggleTaskStatus }: TasksListProps) => {
    const [filter, setFilter] = useState('all')
    const [filteredTasks, setFilteredTasks] = useState(tasks)

    useEffect(() => {
        setFilteredTasks(() => {
            if (filter === 'done') return tasks.filter(task => task.completed === true)
            if (filter === 'not-done') return tasks.filter(task => task.completed === false)
            return tasks
        })
    }, [filter, tasks])


    return (
        <>
            <hr />
            <h1>Tasks</h1>
            <ul className="nav nav-pills justify-content-center my-3 ">
                <li className="nav-item">
                    <a className={`nav-link ${filter === "all" ? "active" : ""}`} href="#" onClick={() => setFilter("all")} >All</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${filter === "done" ? "active" : ""}`} href="#" onClick={() => setFilter("done")} >Done</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${filter === "not-done" ? "active" : ""}`} href="#" onClick={() => setFilter("not-done")} >Not done</a>
                </li>
            </ul>
            <ul className="list-unstyled">
                {filteredTasks.map((task: Task, index: number) => (

                    <li className="list-item" key={index}>


                        <div className='d-flex align-items-baseline gap-2'>
                            <input type="checkbox" name="completed" id="completed" value={task.id!} onChange={(event: ChangeEvent<HTMLInputElement>) => toggleTaskStatus(event)} checked={task.completed ? true : false} />
                            <p className='fw-bold'>{task.title} {task.sending ? "Sending" : ""}</p>

                        </div>
                        <div className='d-flex justify-content-between' >
                            <p>Due date : {task.dueDate} </p>
                            <div>

                                <button className='btn btn-outline-success btn-small' onClick={() => handleEditTask(task.id!)}><i className="bi bi-pencil-fill"></i> </button>

                                <button className='btn btn-outline-danger btn-small ms-3' onClick={() => handleDeleteTask(task.id!)}>
                                    <i className="bi bi-trash-fill"></i>
                                </button>
                            </div>
                        </div>

                    </li>
                ))}
            </ul>

        </>
    )
}

export default TasksList