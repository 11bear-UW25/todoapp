"use client"

import { useState, useEffect } from "react"
import TaskForm from "./task-form"
import TaskList from "./task-list"
import type { Task } from "@/types/task"

// ★ Supabase の URL と anon key を入れる
const SUPABASE_URL = "https://zwreighnsruynscqppcr.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3cmVpZ2huc3J1eW5zY3FwcGNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1MjA3MDMsImV4cCI6MjEwNTA5NjcwM30.KVxmyIGrhR_WC2eEVaZ0vtTRr3MjhDW7cMsvr1q0I6w"

export default function TodoApp() {

  const [tasks, setTasks] = useState<Task[]>([])
  const [updateTrigger, setUpdateTrigger] = useState(false)

  // GET（一覧取得）
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/tasks?select=*`,
        {
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
        }
      )
      const data = await res.json()
      setTasks(data)
    }

    fetchTasks()
  }, [updateTrigger])

  // POST（追加）
  const addTask = async (name: string) => {
    if (!name.trim()) return

    const id = crypto.randomUUID()
    const completed = false

    await fetch(`${SUPABASE_URL}/rest/v1/tasks`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name, completed }),
    })

    setUpdateTrigger(!updateTrigger)
  }

  // DELETE（削除）
  const deleteTask = async (id: string) => {
    await fetch(`${SUPABASE_URL}/rest/v1/tasks?id=eq.${id}`, {
      method: "DELETE",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    })

    setUpdateTrigger(!updateTrigger)
  }

  // PUT（編集）
  const editTask = async (id: string, name: string) => {
    const target = tasks.find((t) => t.id === id)
    if (!target) return

    const completed = target.completed

    await fetch(`${SUPABASE_URL}/rest/v1/tasks?id=eq.${id}`, {
      method: "PATCH",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, completed }),
    })

    setUpdateTrigger(!updateTrigger)
  }

  // return
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Todoアプリ</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList tasks={tasks} onDeleteTask={deleteTask} onEditTask={editTask} />
    </div>
  )
}
