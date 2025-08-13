import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SK Task" },
    { name: "Task Management", content: "SimonKayla Task Management" },
  ];
}

export default function Home() {
  return <p>Hi</p>;
}
