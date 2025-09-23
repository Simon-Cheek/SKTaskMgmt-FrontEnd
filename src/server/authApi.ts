// api.ts
import type { User } from "../types";
import type { LoginResponse } from "./apiTypes";

const backendUrl = "http://localhost:8000";

export const authApi = {
  register: async (username: string, password: string) => {
    const response = await fetch(`${backendUrl}/users/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error("Registration failed");
  },

  login: async (username: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(`${backendUrl}/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error("Login failed");
    return response.json();
  },

  logout: async () => {
    const response = await fetch(`${backendUrl}/auth/logout/`, {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) throw new Error("Logout failed");
  },

  refreshAccessToken: async (): Promise<LoginResponse> => {
    const response = await fetch(`${backendUrl}/auth/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!response.ok) throw new Error("Token refresh failed");
    return response.json();
  },

  getLoggedInUser: async (accessToken: string): Promise<User> => {
    const response = await fetch(`${backendUrl}/users/me/`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!response.ok) throw new Error("Failed to fetch user");
    return response.json();
  },
};
