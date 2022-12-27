import React, {  } from 'react'
import Navbar from '../navbar/Navbar'
import Todo from '../todo/Todo'
import s from "./home.module.scss"
export default function Home() {
    return (
        <div className={s.container}>
            <Navbar />
            <Todo/>
        </div>
    )
}
