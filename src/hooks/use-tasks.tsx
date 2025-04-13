import { useEffect, useState } from "react";
import { Task } from "../types/tasks";

export function useTasks() {
  const tasksOnLocalStorage = localStorage.getItem("tasks");

  const [tasks, setTasks] = useState<Task[]>(
    tasksOnLocalStorage ? JSON.parse(tasksOnLocalStorage) : []
  );

  const hideCompletedTasksOnLocalStorage =
    localStorage.getItem("hideCompletedTasks");

  const [hideCompletedTasks, setHideCompletedTasks] = useState(
    Boolean(hideCompletedTasksOnLocalStorage)
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("hideCompletedTasks", hideCompletedTasks.toString());
  }, [hideCompletedTasks]);

  return { tasks, setTasks, hideCompletedTasks, setHideCompletedTasks };
}
