// src/hooks/useTasks.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task } from "../types";
import { addTask, fetchTasks } from "../mockServer/mockServer";

export function useTasks() {
  const queryClient = useQueryClient();

  // Fetch tasks
  const tasksQuery = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  // Add task
  const addTaskMutation = useMutation({
    mutationFn: (task: Task) => addTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return {
    tasks: tasksQuery.data ?? [],
    isLoading: tasksQuery.isLoading,
    addTask: addTaskMutation.mutate,
  };
}
