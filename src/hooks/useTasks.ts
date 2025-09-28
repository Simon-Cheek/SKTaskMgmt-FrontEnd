// src/hooks/useTasks.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task } from "../types";
import { useAuth } from "../state/AuthContext";
import { taskApi } from "../server/taskApi";

export function useTasks() {
  const queryClient = useQueryClient();
  const { logout, accessToken, refresh } = useAuth();

  // helper to wrap query/mutation fns with auth error handling
  const withAuthHandling = <TArgs extends any[], TResult>(
    fn: (...args: TArgs) => Promise<TResult>
  ) => {
    return async (...args: TArgs): Promise<TResult> => {
      try {
        return await fn(...args);
      } catch (err: any) {
        if (err instanceof Error && err.message === "Unauthenticated") {
          await logout();
        }
        throw err; // rethrow so React Query still sees it as an error
      }
    };
  };

  // --- Queries ---
  const allTasksQuery = useQuery<Task[]>({
    queryKey: ["tasks", "all"],
    queryFn: () =>
      withAuthHandling(() => taskApi.fetchTasks(accessToken || "", refresh))(),
  });

  const activeTasksQuery = useQuery<Task[]>({
    queryKey: ["tasks", "active"],
    queryFn: () =>
      withAuthHandling(() =>
        taskApi.fetchActiveTasks(accessToken || "", refresh)
      )(),
  });

  const archivedTasksQuery = useQuery<Task[]>({
    queryKey: ["tasks", "archived"],
    queryFn: () =>
      withAuthHandling(() =>
        taskApi.fetchArchivedTasks(accessToken || "", refresh)
      )(),
  });

  // --- Mutations ---
  const addTaskMutation = useMutation({
    mutationFn: withAuthHandling((task: Task) =>
      taskApi.addTask(task, accessToken || "", refresh)
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: withAuthHandling((taskId: string) =>
      taskApi.deleteTask(taskId, accessToken || "", refresh)
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const markAsCompleteMutation = useMutation({
    mutationFn: withAuthHandling((id: string) =>
      taskApi.markAsComplete(id, accessToken || "", refresh)
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: withAuthHandling((task: Task) =>
      taskApi.updateTask(task, accessToken || "", refresh)
    ),
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
    updateTask: updateTaskMutation.mutate,
  };
}
