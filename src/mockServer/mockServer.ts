import type { Task } from "../types";

// In-memory store with some sample tasks
let tasks: Task[] = [
  {
    id: "1",
    name: "Design landing page",
    description: "Create wireframes and mockups",
    assignedTo: "Simon",
    priority: "P1",
    assignedDate: new Date("2025-09-10"),
    dueDate: new Date("2025-09-15"),
    status: "Active",
  },
  {
    id: "2",
    name: "Set up database",
    description: "Install MySQL and create initial schema",
    assignedTo: "Chaela",
    priority: "P2",
    assignedDate: new Date("2025-09-11"),
    dueDate: new Date("2025-09-20"),
    status: "Complete",
  },
];

// Simulate network latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ---- Core fetchers ----
export async function fetchTasks(): Promise<Task[]> {
  await delay(200);
  return [...tasks];
}

export async function fetchActiveTasks(): Promise<Task[]> {
  await delay(200);
  return tasks.filter((t) => t.status === "Active");
}

export async function fetchArchivedTasks(): Promise<Task[]> {
  await delay(200);
  return tasks.filter((t) => t.status === "Complete" || t.status === "Expired");
}

// ---- Mutations ----
export async function addTask(task: Task): Promise<Task> {
  await delay(200);
  tasks.push(task);
  return task;
}

export async function updateTask(updated: Task): Promise<Task> {
  await delay(200);
  tasks = tasks.map((t) => (t.id === updated.id ? updated : t));
  return updated;
}

export async function deleteTask(id: string): Promise<void> {
  await delay(200);
  tasks = tasks.filter((t) => t.id !== id);
}

export async function markAsComplete(id: string): Promise<void> {
  await delay(200);
  tasks = tasks.map((t) => (t.id === id ? { ...t, status: "Complete" } : t));
}
