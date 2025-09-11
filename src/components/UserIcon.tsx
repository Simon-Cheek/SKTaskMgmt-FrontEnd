import SimonTaskIcon from "../assets/sIcon.svg";
import ChaelaTaskIcon from "../assets/kIcon.svg";

const userIcons: Record<string, any> = {
  Simon: SimonTaskIcon,
  Chaela: ChaelaTaskIcon,
};

export function UserIcon(username: string) {
  return userIcons[username] ?? null;
}
