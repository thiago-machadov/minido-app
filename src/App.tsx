import { AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { CreatedTask } from "./components/created-task";
import { NewTask } from "./components/new-task";
import { Task } from "./types";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [hideCompletedTasks, setHideCompletedTasks] = useState(false);

  const [mousePosition, setMousePosition] = useState({ x: 50, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setMousePosition({
          x: Math.max(0, Math.min(100, (x / rect.width) * 100)),
          y: Math.max(0, Math.min(100, (y / rect.height) * 100)),
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const gradientStyle = {
    backgroundImage: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #bb7000 0%, #1a0100 50%, #2f2f2f 100%)`,
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col overflow-hidden rounded-[10px] bg-border-gradient p-[1.5px] w-[280px] h-[354px]"
      style={gradientStyle}
    >
      <div className="bg-gray-2/95 w-full h-full flex rounded-[9px] flex-col gap-3 py-4 px-5">
        <NewTask setTasks={setTasks} />
        <AnimatePresence initial={false}>
          {tasks.map((task) =>
            hideCompletedTasks && task.completed ? null : (
              <CreatedTask key={task.id} task={task} setTasks={setTasks} />
            )
          )}
        </AnimatePresence>
      </div>
      <button
        onClick={() => setHideCompletedTasks(!hideCompletedTasks)}
        className="hover:scale-105 transition-all duration-300 hover:cursor-pointer absolute bottom-4 right-5 text-xs text-gray-1/50"
      >
        {hideCompletedTasks ? "show" : "hide"} completed tasks
      </button>
    </div>
  );
}

export default App;
