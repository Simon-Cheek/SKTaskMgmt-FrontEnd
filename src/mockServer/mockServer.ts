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
  },
  {
    id: "2",
    name: "Set up database",
    description: "Install MySQL and create initial schema",
    assignedTo: "Chaela",
    priority: "P2",
    assignedDate: new Date("2025-09-11"),
    dueDate: new Date("2025-09-20"),
  },
];

// Simulate network latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchTasks(): Promise<Task[]> {
  await delay(200); // simulate network delay
  return [...tasks]; // return a copy
}

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
