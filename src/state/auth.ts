import type { User } from "../types";
import { mockRegisteredUsers as users } from "./users";

export const authenticate = (
  username: String,
  password: String
): User | null => {
  if (password != "password") {
    return null;
  }
  for (const user of users) {
    if (username == user.username) {
      return user;
    }
  }
  return null;
};

export const deauthenticate = () => {
  localStorage.removeItem("SK-user");
};
