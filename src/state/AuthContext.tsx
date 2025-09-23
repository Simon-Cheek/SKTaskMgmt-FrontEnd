import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User, AuthContext as AuthContextType } from "../types";
import { authApi } from "../server/authApi";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Login user and set tokens/user
  async function login(username: string, password: string) {
    const data = await authApi.login(username, password);
    setAccessToken(data.access);
    setUser(data.user);
  }

  // Logout user and clear tokens/user
  async function logout() {
    await authApi.logout();
    setAccessToken(null);
    setUser(null);
  }

  // Refresh access token from HttpOnly cookie
  async function refresh() {
    try {
      const data = await authApi.refreshAccessToken();
      setAccessToken(data.access);
      setUser(data.user);
    } catch {
      setAccessToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  // Run refresh on mount
  useEffect(() => {
    refresh();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
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
