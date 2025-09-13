import type { Task } from "../types";

export const validPriorities: Array<Task["priority"]> = ["P1", "P2", "P3"];

export function validatePriority(
  priority: string
): priority is Task["priority"] {
  return validPriorities.includes(priority as Task["priority"]);
}
