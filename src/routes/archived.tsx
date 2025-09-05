/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { createFileRoute } from "@tanstack/react-router";
import { H1 } from "../components/Text";
import TaskCardContainer from "../components/TaskCardContainer";
import Separator from "../components/Separator";
import TaskDisplay from "../components/TaskDisplay";
// import type { Task } from "../types";
import { colors } from "../colors";

export const Route = createFileRoute("/archived")({
  component: RouteComponent,
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
  height: 100px;
  @media (max-width: 767px) {
    height: 80px;
  }
`;

const titleDisplayCss = css`
  text-align: center;
  color: ${colors.gray06};
  font-size: 1.7em;
`;

// const fakeTask: Task = {
//   id: "task-001",
//   name: "Finalize Q3 Marketing Plan",
//   description:
//     "Review all campaign proposals, finalize the ad schedule, and coordinate with the creative team for asset delivery.",
//   assignedTo: "Alex Johnson",
//   priority: "P1",
//   assignedDate: new Date("2025-08-15T09:00:00Z"),
//   dueDate: new Date("2025-08-30T17:00:00Z"),
// };

function RouteComponent() {
  return (
    <div css={pageWrapperCss}>
      <div css={contentCss}>
        <div css={displayContainerCss}>
          <H1 customCSS={titleDisplayCss}>Archived Tasks</H1>
        </div>
        <TaskDisplay task={null} />
        <Separator />
        <TaskCardContainer />
      </div>
    </div>
  );
}
