"use client"

import { useState, useEffect } from "react"
import TaskForm from "./task-form"
import TaskList from "./task-list"
import type { Task } from "@/types/task"
import { v4 as uuidv4 } from "uuid"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default function TodoApp() {

  const [tasks, setTasks] = useState<Task[]>([])
  const [updateTrigger, setUpdateTrigger] = useState(false)

  // GET（一覧取得）
  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase.from("tasks").select("*")
      if (!error && data) setTasks(data)
    }
    fetchTasks()
  }, [updateTrigger])

  // POST（追加）
  const addTask = async (name: string) => {
  if (!name.trim()) return

  const id = crypto.randomUUID()   // ← ここで自動生成される
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


  // PUT（編集）
  const editTask = async (id: string, name: string) => {
    const target = tasks.find((t) => t.id === id)
    if (!target) return

    const completed = target.completed

    await supabase.from("tasks").update({ name, completed }).eq("id", id)
    setUpdateTrigger(!updateTrigger)
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Todoアプリ</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList tasks={tasks} onDeleteTask={deleteTask} onEditTask={editTask} />
    </div>
  )
}
