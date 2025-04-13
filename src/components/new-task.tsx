import { motion } from "motion/react";
import { nanoid } from "nanoid";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useKeyboard } from "../hooks/use-keyboard";
import { Task } from "../types";

interface NewTaskProps {
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

export function NewTask({ setTasks }: NewTaskProps) {
  const [newTask, setNewTask] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useKeyboard({
    keysMap: {
      FOCUS_ON_NEW_TASK_INPUT: ["Meta", "n"],
    },
    keysHandlers: {
      FOCUS_ON_NEW_TASK_INPUT: () => {
        setNewTask("");
        inputRef.current?.focus();
      },
    },
  });

  return (
    <div className="flex items-center gap-2 w-full">
      <motion.div className="hover:cursor-not-allowed opacity-50 rounded-full border border-gray-1 w-4 h-4" />
      <input
        ref={inputRef}
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setTasks((prevState) => {
              return [
                { id: nanoid(), title: newTask, completed: false },
                ...prevState,
              ];
            });

            setNewTask("");
          }
        }}
        placeholder="Type your task here"
        className="py-1 px-2 flex-1 w-full text-gray-1 placeholder:text-gray-1/50 text-sm font-medium outline-none"
      />
    </div>
  );
}
