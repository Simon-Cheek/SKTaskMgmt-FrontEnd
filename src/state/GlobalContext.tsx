// src/context/GlobalContext.tsx
import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { GlobalContextType, Task, User } from "../types";

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  async function login(username: string, password: string) {
    if (username === "test" && password === "password") {
      const u = { id: "1", username };
      setUser(u);
      localStorage.setItem("user", JSON.stringify(u));
    } else {
      console.log("Wrong");
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
