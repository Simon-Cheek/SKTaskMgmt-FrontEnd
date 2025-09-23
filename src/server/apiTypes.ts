import type { User } from "../types";

export type LoginResponse = {
  access: string;
  user: User;
};
