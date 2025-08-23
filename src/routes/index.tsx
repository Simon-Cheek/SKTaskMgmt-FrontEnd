import { createFileRoute } from "@tanstack/react-router";
import TaskCard from "../components/TaskCard";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
    </>
  );
}
