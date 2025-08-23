/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { createFileRoute } from "@tanstack/react-router";
import { H1 } from "../components/Text";
import TaskCardContainer from "../components/TaskCardContainer";
import Separator from "../components/Separator";
import TaskDisplay from "../components/TaskDisplay";
import type { Task } from "../types";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

const pageWrapperCss = css`
  display: flex;
  justify-content: center;
  padding: 2em;
`;

const contentCss = css`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  max-width: 1200px;
`;

const titleDisplayCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const fakeTask: Task = {
  id: "task-001",
  name: "Finalize Q3 Marketing Plan",
  description:
    "Review all campaign proposals, finalize the ad schedule, and coordinate with the creative team for asset delivery.",
  assignedTo: "Alex Johnson",
  priority: "P1",
  assignedDate: new Date("2025-08-15T09:00:00Z"),
  dueDate: new Date("2025-08-30T17:00:00Z"),
};

function RouteComponent() {
  return (
    <div css={pageWrapperCss}>
      <div css={contentCss}>
        <H1 customCSS={titleDisplayCss}>Title</H1>
        <TaskDisplay task={fakeTask} />
        <Separator />
        <TaskCardContainer />
      </div>
    </div>
  );
}
