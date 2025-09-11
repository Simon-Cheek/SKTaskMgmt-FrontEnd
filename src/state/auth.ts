import type { User } from "../types";

const user: User = {
  id: "userId",
  username: "username",
};

export const authenticate = (
  username: String,
  password: String
): User | null => {
  if (username === "test" && password === "password") {
    localStorage.setItem("SK-user", JSON.stringify(user));
    return user;
  } else {
    throw new Error("Invalid credentials");
  }
};

export const deauthenticate = () => {
  localStorage.clearItem("SK-user");
};
