"use client";

import { useState, useEffect } from "react";
import TaskForm from "./task-form";
import TaskList from "./task-list";
import type { Task } from "@/types/task";

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // タスク取得（GET）
  const fetchTasks = async () => {
    const res = await fetch("/api/tasks", {
      method: "GET",
    });

    const json = await res.json();
    setTasks(json.tasks || []);
  };

  // 初回ロード
  useEffect(() => {
    fetchTasks();
  }, []);

  // タスク追加（POST）
  const addTask = async (name: string) => {
    const newTask = {
      id: crypto.randomUUID(),
      name,
      completed: false,
    };

    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    fetchTasks();
  };

  // タスク更新（PUT）
  const updateTask = async (id: string, name: string, completed: boolean) => {
    await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name, completed }),
    });

    fetchTasks();
  };

  // タスク削除（DELETE）
  const deleteTask = async (id: string) => {
    const responce = await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();
    setUpdataTrigger(!updataTrigger);
  };

  return (
    <div>
      <TaskForm onAddTask={addTask} />
      <TaskList
        tasks={tasks}
        onUpdateTask={updateTask}
        onDeleteTask={deleteTask}
      />
    </div>
  );
}
