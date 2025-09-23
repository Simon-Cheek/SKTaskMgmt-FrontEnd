// src/hooks/useTasks.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task } from "../types";
import {
  addTask,
  deleteTask,
  fetchTasks,
  fetchActiveTasks,
  fetchArchivedTasks,
  markAsComplete,
  updateTask,
} from "../mockServer/mockServer";

export function useTasks() {
  const queryClient = useQueryClient();

  // --- Queries ---
  const allTasksQuery = useQuery<Task[]>({
    queryKey: ["tasks", "all"],
    queryFn: fetchTasks,
  });

  const activeTasksQuery = useQuery<Task[]>({
    queryKey: ["tasks", "active"],
    queryFn: fetchActiveTasks,
  });

  const archivedTasksQuery = useQuery<Task[]>({
    queryKey: ["tasks", "archived"],
    queryFn: fetchArchivedTasks,
  });

  // --- Mutations ---
  const addTaskMutation = useMutation({
    mutationFn: (task: Task) => addTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const markAsCompleteMutation = useMutation({
    mutationFn: (id: string) => markAsComplete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: (task: Task) => updateTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return {
    // Data
    allTasks: allTasksQuery.data ?? [],
    activeTasks: activeTasksQuery.data ?? [],
    archivedTasks: archivedTasksQuery.data ?? [],

    // Loading states
    isLoadingAll: allTasksQuery.isLoading,
    isLoadingActive: activeTasksQuery.isLoading,
    isLoadingArchived: archivedTasksQuery.isLoading,

    // Mutations
    addTask: addTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
    markAsComplete: markAsCompleteMutation.mutate,
    updateTask: updateTaskMutation.mutate, // ✅ new hook
  };
}
