// taskApi.ts
import type { Task } from "../types";
import { fetchWithAuth } from "./authApi";

const API_URL = "http://localhost:8000/tasks/";

export const taskApi = {
  async fetchTasks(
    accessToken: string,
    refresh: () => Promise<string>
  ): Promise<Task[]> {
    const res = await fetchWithAuth(API_URL, {}, accessToken, refresh);
    if (!res.ok) throw new Error("Failed to fetch tasks");
    return res.json();
  },

  async fetchArchivedTasks(
    accessToken: string,
    refresh: () => Promise<string>
  ): Promise<Task[]> {
    const res = await fetchWithAuth(
      API_URL + "archived/",
      {},
      accessToken,
      refresh
    );
    if (!res.ok) throw new Error("Failed to fetch archived tasks");
    return res.json();
  },

  async fetchActiveTasks(
    accessToken: string,
    refresh: () => Promise<string>
  ): Promise<Task[]> {
    const res = await fetchWithAuth(
      API_URL + "?status=Active",
      {},
      accessToken,
      refresh
    );
    if (!res.ok) throw new Error("Failed to fetch active tasks");
    return res.json();
  },

  async addTask(
    task: Task,
    accessToken: string,
    refresh: () => Promise<string>
  ): Promise<Task> {
    const res = await fetchWithAuth(
      API_URL,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      },
      accessToken,
      refresh
    );
    if (!res.ok) throw new Error("Failed to add task");
    return res.json();
  },

  async updateTask(
    task: Task,
    accessToken: string,
    refresh: () => Promise<string>
  ): Promise<Task> {
    const res = await fetchWithAuth(
      `${API_URL}${task.id}/`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      },
      accessToken,
      refresh
    );
    if (!res.ok) throw new Error("Failed to update task");
    return res.json();
  },

  async deleteTask(
    id: string,
    accessToken: string,
    refresh: () => Promise<string>
  ): Promise<void> {
    const res = await fetchWithAuth(
      `${API_URL}${id}/`,
      { method: "DELETE" },
      accessToken,
      refresh
    );
    if (!res.ok) throw new Error("Failed to delete task");
  },

  async markAsComplete(
    id: string,
    accessToken: string,
    refresh: () => Promise<string>
  ): Promise<Task> {
    const res = await fetchWithAuth(
      `${API_URL}${id}/complete/`,
      { method: "PUT" },
      accessToken,
      refresh
    );
    if (!res.ok) throw new Error("Failed to mark task as complete");
    return res.json();
  },
};
