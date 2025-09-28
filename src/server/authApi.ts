import type { User } from "../types";
import type { LoginResponse } from "./apiTypes";

const backendUrl = "http://localhost:8000";

// Used currently only for the task API
// Todo: Refactor Auth API to also use this (mainly just the getLoggedInUser function)
export async function fetchWithAuth(
  input: RequestInfo | URL,
  init: RequestInit = {},
  accessToken: string,
  refresh: () => Promise<string> // refresh function provided by caller
): Promise<Response> {
  const headers = new Headers(init.headers);

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  let response = await fetch(input, { ...init, headers });

  if (response.status === 401) {
    // Try refreshing once
    const newToken = await refresh();
    if (newToken) {
      headers.set("Authorization", `Bearer ${newToken}`);
      response = await fetch(input, { ...init, headers });
    }
  }

  // If still 401, throw a specific error type
  if (response.status === 401) {
    throw new Error("Unauthorized");
  }

  // Throw for all other HTTP failures too
  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }

  return response;
}

export const authApi = {
  // Requires no Auth or Refresh token
  // Obtains no Auth or Refresh token
  register: async (username: string, password: string) => {
    const response = await fetch(`${backendUrl}/users/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error("Registration failed");
  },

  // Requires no Auth or Refresh token
  // Obtains both Auth and Refresh token
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

  // Requires no Auth or Refresh token
  // Gets rid of Refresh and assumes the Frontend State wipes the Auth token
  logout: async () => {
    const response = await fetch(`${backendUrl}/auth/logout/`, {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) throw new Error("Logout failed");
  },

  // Requires the Refresh token
  // Obtains a new Auth token
  refreshAccessToken: async (): Promise<LoginResponse> => {
    const response = await fetch(`${backendUrl}/auth/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!response.ok) throw new Error("Token refresh failed");
    return response.json();
  },

  // Requires the Auth token
  // Obtains no Auth or Refresh token, but returns user
  getLoggedInUser: async (accessToken: string): Promise<User | null> => {
    if (!accessToken) {
      return null;
    }
    const response = await fetch(`${backendUrl}/users/me/`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (response.status === 401) {
      return null;
    }
    if (!response.ok) throw new Error("Failed to fetch user");
    return response.json();
  },
};
