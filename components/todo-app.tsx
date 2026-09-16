"use client"

import { useState, useEffect } from "react"
import TaskForm from "./task-form"
import TaskList from "./task-list"
import type { Task } from "@/types/task"
import { v4 as uuidv4 } from "uuid"

export default function TodoApp() {

  const [tasks, setTasks] = useState<Task[]>([])
  const [updateTrigger, setUpdateTrigger] = useState(false)

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data.tasks))
  }, [updateTrigger])

  const addTask = async (name: string) => {
    if (!name.trim()) return;

    const id = uuidv4();
    const completed = false;

    try {
      await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name, completed }),
      });
    } catch (error) {
      console.error("エラーが発生しました", error);
    }

    setUpdateTrigger(!updateTrigger);
  };

  const deleteTask = async (id: string) => {
    await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    setUpdateTrigger(!updateTrigger);
  };

 const editTask = async (id: string, name: string) => {
  const target = tasks.find((t) => t.id === id);
  if (!target) return;

  const completed = target.completed;

  await fetch("/api/tasks", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, name, completed }),
  });

  setUpdateTrigger(!updateTrigger);
};

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Todoアプリ</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList tasks={tasks} onDeleteTask={deleteTask} onEditTask={editTask} />
    </div>
  )
}
