import { motion } from "motion/react";
import { nanoid } from "nanoid";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Task } from "../types/tasks";

interface NewTaskProps {
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

export function NewTask({ setTasks }: NewTaskProps) {
  const [newTask, setNewTask] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center gap-2 w-full px-5">
      <motion.div className="hover:cursor-not-allowed opacity-50 rounded-full border border-gray-1 w-4 h-4" />
      <input
        ref={inputRef}
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && newTask.trim() !== "") {
            setTasks((prevState) => {
              return [
                { id: nanoid(), title: newTask, completed: false },
                ...prevState,
              ];
            });

            setNewTask("");
          }
        }}
        maxLength={60}
        placeholder="Type your task here"
        className="py-1 px-2 flex-1 w-full text-gray-1 placeholder:text-gray-1/50 text-sm font-medium outline-none"
      />
    </div>
  );
}
