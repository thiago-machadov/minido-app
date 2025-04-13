import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Dispatch, SetStateAction } from "react";
import { Task } from "../types/tasks";

interface CreatedTaskProps {
  task: Task;
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

export function CreatedTask({ task, setTasks }: CreatedTaskProps) {
  return (
    <motion.div
      layout
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      exit={{ x: -500 }}
      className="px-5 flex items-center gap-2 w-full"
    >
      <motion.div
        role="button"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        className={`hover:cursor-pointer transition-all duration-300 rounded-full border border-gray-1 w-4 h-4 ${
          task.completed && "border-none"
        }`}
        onClick={() => {
          setTasks((prevState) => {
            return prevState.map((t) =>
              t.id === task.id ? { ...t, completed: !t.completed } : t
            );
          });
        }}
      >
        <AnimatePresence>
          {task.completed && (
            <motion.div
              className="rounded-full bg-yellow-1 w-full h-full"
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
      <div className="relative w-full flex-1">
        <AnimatePresence>
          {task.completed && (
            <motion.span
              className="rounded-full h-[1px] bg-yellow-1 absolute top-1/2 -translate-y-1/2"
              initial={{ width: "0%" }}
              animate={{ width: "90%" }}
              exit={{ width: "0%" }}
            />
          )}
        </AnimatePresence>
        <div className="group flex items-center justify-between">
          <input
            value={task.title}
            className={`outline-none transition-all duration-300 hover:cursor-text py-1 px-2 flex-1 w-full text-sm font-medium text-gray-1 ${
              task.completed && "italic font-normal"
            }`}
          />
          <button
            onClick={() => {
              setTasks((prevState) => {
                return prevState.filter((t) => t.id !== task.id);
              });
            }}
            className="hover:cursor-pointer hover:scale-125 transition-all duration-300"
          >
            <X
              className={`group-hover:opacity-100 opacity-0 transition-all duration-300 size-4 stroke-2 ${
                task.completed ? "stroke-yellow-1" : "stroke-gray-1"
              }`}
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
