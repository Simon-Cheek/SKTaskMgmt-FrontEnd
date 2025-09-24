import { createContext, useContext, useState, type ReactNode } from "react";
import type { User, AuthContext as AuthContextType } from "../types";
import { authApi } from "../server/authApi";
import type { LoginResponse } from "../server/apiTypes";
import { flushSync } from "react-dom";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // Login user and set tokens/user
  async function login(username: string, password: string) {
    setIsLoading(true);
    try {
      const data: LoginResponse = await authApi.login(username, password);

      // We want to FORCE react to set the user information before anything else
      flushSync(() => {
        setAccessToken(data.access);
        setUser(data.user);
      });
    } catch {
      setAccessToken("");
      setUser(null);
      throw Error("Login Failed");
    } finally {
      setIsLoading(false);
    }
  }

  // Logout user and clear tokens/user
  async function logout() {
    await authApi.logout();
    setAccessToken("");
    setUser(null);
  }

  // Refresh access token from HttpOnly cookie
  async function refresh(): Promise<string> {
    try {
      const data: LoginResponse = await authApi.refreshAccessToken();
      setAccessToken(data.access);
      setUser(data.user);
      return data.access || ""; // We need to return token synchronously so it can be used for retries
    } catch {
      setAccessToken("");
      setUser(null);
      return "";
    }
  }

  // Gets Logged In User using Auth Token
  async function getLoggedInUser(): Promise<User | null> {
    setIsLoading(true);
    try {
      let data: User | null = await authApi.getLoggedInUser(accessToken);

      // Not Authenticated - One Refresh Retry
      if (data == null) {
        const newToken: string = await refresh();
        if (newToken) {
          data = await authApi.getLoggedInUser(newToken);
        }
      }
      setUser(data);
      return data;
    } catch {
      setAccessToken("");
      setUser(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        getLoggedInUser,
        accessToken,
        isAuthenticated: !!user,
        isLoading,
        refresh, // optional, can expose to manually refresh if needed
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook for consuming auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
