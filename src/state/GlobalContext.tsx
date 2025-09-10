// src/context/GlobalContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Task, User } from "../types";

interface GlobalContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Example: restore auth on mount (e.g. from localStorage or API)
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
    setIsLoading(false);
  }, []);

  async function login(username: string, password: string) {
    // Replace with real API call
    if (username === "test" && password === "password") {
      const u = { id: "1", username };
      setUser(u);
      localStorage.setItem("user", JSON.stringify(u));
    } else {
      throw new Error("Invalid credentials");
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <GlobalContext.Provider
      value={{
        user,
        login,
        logout,
        tasks,
        setTasks,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  const ctx = useContext(GlobalContext);
  if (!ctx) throw new Error("useGlobal must be used inside GlobalProvider");
  return ctx;
}
