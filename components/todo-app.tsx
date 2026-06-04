"use client"

import { useState } from "react"
import TaskForm from "./task-form"
import TaskList from "./task-list"
import type { Task } from "@/types/task"

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: "サンプルタスク1", completed: false },
    { id: 2, name: "サンプルタスク2", completed: true },
    { id: 3, name: "サンプルタスク3", completed: false },
  ])

  const addTask = (name: string) => {
    // 機能しないように実装
    console.log("Add task:", name)
  }

  const deleteTask = (id: number) => {
    // 機能しないように実装
    console.log("Delete task:", id)
  }

  const editTask = (id: number, name: string) => {
    // 機能しないように実装
    console.log("Edit task:", id, name)
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Todoアプリ</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList tasks={tasks} onDeleteTask={deleteTask} onEditTask={editTask} />
    </div>
  )
}
