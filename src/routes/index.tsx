/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { H1, Paragraph } from "../components/Text";
import TaskCardContainer from "../components/taskComponents/TaskCardContainer";
import Separator from "../components/Separator";
import TaskDisplay from "../components/taskComponents/TaskDisplay";
import type { Task } from "../types";
import { colors } from "../colors";

export const Route = createFileRoute("/")({
  component: RouteComponent,

  // Typing with context is a nightmare
  beforeLoad: ({ context }: any) => {
    if (!context.auth?.isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
});

const pageWrapperCss = css`
  display: flex;
  justify-content: center;
  padding: 1em;
`;

const contentCss = css`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  max-width: 1100px;
`;

const displayContainerCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 200px;
  @media (max-width: 767px) {
    height: 120px;
  }
`;

const titleDisplayCss = css`
  text-align: center;
  color: ${colors.gray06};
  @media (max-width: 767px) {
    font-size: 1.5em;
  }
`;

const titleDescriptionCss = css`
  color: ${colors.gray06};
  font-size: 1.1em;
`;

const fakeTask: Task = {
  id: "task-001",
  name: "Finalize Q3 Marketing Plan",
  description:
    "Review all campaign proposals, finalize the ad schedule, and coordinate with the creative team for asset delivery.",
  assignedTo: "Chaela",
  priority: "P1",
  assignedDate: new Date("2025-08-15T09:00:00Z"),
  dueDate: new Date("2025-08-30T17:00:00Z"),
};

function RouteComponent() {
  return (
    <div css={pageWrapperCss}>
      <div css={contentCss}>
        <div css={displayContainerCss}>
          <H1 customCSS={titleDisplayCss}>SimonChaela Task Management</H1>
          <Paragraph weight="semibold" customCSS={titleDescriptionCss}>
            Active Tasks
          </Paragraph>
        </div>
        <TaskDisplay task={fakeTask} />
        <Separator />
        <TaskCardContainer />
      </div>
    </div>
  );
}
