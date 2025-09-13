export interface Task {
  id?: string;
  name: string;
  description?: string;
  assignedTo: string;
  priority: "P1" | "P2" | "P3";
  assignedDate: Date;
  dueDate: Date;
  status: "Active" | "Complete" | "Expired";
}

export interface AuthContext {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export type Priority = "P1" | "P2" | "P3";

export type User = { id: string; username: string };

export type SortBy = "" | "priority" | "assignedUser" | "dueDate";

export interface TaskContextValue {
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
  sortBy: SortBy;
  setSortBy: (sortBy: SortBy) => void;
}
