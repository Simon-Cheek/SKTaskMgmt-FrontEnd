// src/hooks/useTasks.ts
import { useQuery } from "@tanstack/react-query";
import type { Task } from "../types";
import { useAuth } from "../state/AuthContext";
import { taskApi } from "../server/taskApi";

export function useArchivedTasks() {
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
        throw err;
      }
    };
  };

  const archivedTasksQuery = useQuery<Task[]>({
    queryKey: ["tasks", "archived"],
    queryFn: () =>
      withAuthHandling(() =>
        taskApi.fetchArchivedTasks(accessToken || "", refresh)
      )(),
  });

  return {
    archivedTasks: archivedTasksQuery.data ?? [],
    isLoadingArchived: archivedTasksQuery.isLoading,
  };
}
