import React, { useState, useEffect } from 'react'
import style from "./todo.module.scss"

export default function Todo() {
    const [input, setInput] = useState("")
    const [task, setTask] = useState([])
    const [update, setUpdate] = useState(false)
    const [activeId, setActiveId] = useState(null)
    const addTask = () => {
        if (!input.trim()) {
            alert("Please write the task before adding!")
        }
        else if (activeId) {
            setTask(
                task.map((val) => {
                    if (val.id == activeId) {
                        return { ...val, text: input }
                    }
                    return val
                })
            )
            setActiveId(null)
            setUpdate(false)
        }
        else {
            const newTask = { id: new Date().getTime().toString(), text: input, status: false }
            setTask([...task, newTask])
            document.getElementById("task_container").scrollBy({
                top: document.getElementById("task_container").scrollHeight,
                behavior: "smooth"
            });
        }
        setInput("")
    }
    const deleteTask = (id) => {
        const correctTask = task.filter((val) => {
            return val.id !== id
        })
        setTask(correctTask)
    }
    const doneTask = (id) => {
        const completedTask = task?.map((val) => {
            if (val.id === id) {
                val.status = true;
            }
            return val
        })
        setTask(completedTask)
    }
    const editTask = (id) => {
        const target = task.find((val) => {
            return val.id == id
        })
        setInput(target.text)
        setActiveId(id)
        setUpdate(true)
    }
    const removeAll = () => {
        if (window.confirm("Are you want remove all task?")) {
            setTask([])
        }
    }

    return (
        <>
            <div className={style.container + " row p-4 col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4 m-auto  rounded shadow "}>
                <div className={style.wrapper}>
                    <h2 className="text-center p-2   m-auto rounded">Todo App</h2>
                    <div className={style.add + " row m-0 p-0  my-3 col-12"}>
                        <input className="col-9 p-2 me-auto rounded" type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Write task here..." />
                        {
                            !update ?
                                <button className={style.addBtn + " col-2 p-2 ms-auto"} onClick={addTask}>Add</button>
                                :
                                <button className={style.update + " col-3 p-2 ms-auto"} onClick={addTask}>Update</button>
                        }
                    </div>
                    <hr />
                    <div id="task_container" className={style.task + "  row col-12 p-1 mx-auto mb-3 "}>
                        {
                            task.map((val) =>
                                <div key={val.id} className="row item col-12 m-auto my-2 p-1 rounded">
                                    <p className="col-9 m-auto ">{val.text }</p>
                                    <div className={style.iconContainer}>
                                    {
                                            !val.status ?
                                            <>
                                            <button className={style.icon + " col-auto m-auto p-1"} onClick={() => editTask(val.id)}><i className={style.edit + " fa-solid fa-pencil"}></i></button>
                                            <button className={style.icon + " col-auto m-auto p-1"} onClick={() => deleteTask(val.id)}><i className={style.cancel + " fa-solid fa-x"}></i></button>
                                            <button className={style.icon + " col-auto m-auto p-1"} onClick={() => doneTask(val.id)}><i className={style.done + " fa-solid fa-check"}></i></button>
                                            </>
                                            :
                                            <span>Completed</span>
                                        }
                                        </div>
                                </div>
                            )
                        }

                    </div>
                    <div className={style.exit + " mt-auto row col-12  p-2"}>
                        {
                            task[0] ?
                                <>
                                    <button className={style.remove + " col-auto mx-auto mb-2 mb-sm-2 px-3"} onClick={removeAll}>Remove all</button>
                                </>
                                : null
                        }
                    </div>
                </div>
            </div>
        </>
    )
}