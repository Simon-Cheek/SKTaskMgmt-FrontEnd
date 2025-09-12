/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { H1 } from "../components/Text";
import TaskCardContainer from "../components/taskComponents/TaskCardContainer";
import Separator from "../components/Separator";
import TaskDisplay from "../components/taskComponents/TaskDisplay";
import { colors } from "../colors";
import { TaskProvider } from "../state/TaskDisplayContext";

export const Route = createFileRoute("/archived")({
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

function RouteComponent() {
  return (
    <div css={pageWrapperCss}>
      <div css={contentCss}>
        <div css={displayContainerCss}>
          <H1 customCSS={titleDisplayCss}>Archived Tasks</H1>
        </div>
        <TaskProvider>
          <TaskDisplay />
          <Separator />
          <TaskCardContainer />
        </TaskProvider>
      </div>
    </div>
  );
}
