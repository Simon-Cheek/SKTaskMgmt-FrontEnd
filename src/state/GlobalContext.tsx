// src/context/GlobalContext.tsx
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { GlobalContextType, Task, User } from "../types";
import { authenticate, deauthenticate } from "./auth";

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  async function login(username: string, password: string) {
    const user: User | null = authenticate(username, password);
    if (user == null) {
      throw new Error("Login Failed");
    }
    setUser(user);
  }

  function logout() {
    deauthenticate();
    setUser(null);
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
