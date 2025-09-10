export interface Task {
  id: string;
  name: string;
  description?: string;
  assignedTo: string;
  priority: "P1" | "P2" | "P3";
  assignedDate: Date;
  dueDate: Date;
}

export type Priority = "P1" | "P2" | "P3";

export type User = { id: string; username: string };

export interface GlobalContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  isAuthenticated: boolean;
}
