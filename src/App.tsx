import { Eye, EyeClosed } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { CreatedTask } from "./components/created-task";
import { NewTask } from "./components/new-task";
import { useTasks } from "./hooks/use-tasks";

function App() {
  const { tasks, setTasks, hideCompletedTasks, setHideCompletedTasks } =
    useTasks();

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
      className="relative flex flex-col overflow-hidden rounded-[10px] bg-border-gradient p-[1.5px] w-[550] h-[450px]"
      style={gradientStyle}
    >
      <div className="bg-gray-2/95 w-full h-full flex rounded-[9px] flex-col gap-3 py-4">
        <NewTask setTasks={setTasks} />
        <div className="scrollbar-thin flex flex-col gap-3 overflow-y-auto w-full h-full">
          <AnimatePresence initial={false}>
            {tasks.map((task) =>
              hideCompletedTasks && task.completed ? null : (
                <CreatedTask key={task.id} task={task} setTasks={setTasks} />
              )
            )}
          </AnimatePresence>
        </div>
      </div>
      <button
        onClick={() => setHideCompletedTasks(!hideCompletedTasks)}
        className="backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 hover:scale-105 transition-all duration-300 hover:cursor-pointer absolute bottom-4 right-5 text-xs text-gray-1/50"
      >
        {hideCompletedTasks ? (
          <EyeClosed className="stroke-2 size-3 stroke-gray-1/50" />
        ) : (
          <Eye className="stroke-2 size-3 stroke-gray-1/50" />
        )}{" "}
        completed tasks
      </button>
    </div>
  );
}

export default App;
