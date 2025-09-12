// src/context/TaskContext.tsx
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { SortBy, Task, TaskContextValue } from "../types";

const TaskDisplayContext = createContext<TaskContextValue | undefined>(
  undefined
);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>("");

  return (
    <TaskDisplayContext.Provider
      value={{ selectedTask, setSelectedTask, sortBy, setSortBy }}
    >
      {children}
    </TaskDisplayContext.Provider>
  );
}

export function useTaskDisplayContext() {
  const ctx = useContext(TaskDisplayContext);
  if (!ctx) throw new Error("useTaskContext must be used inside TaskProvider");
  return ctx;
}
