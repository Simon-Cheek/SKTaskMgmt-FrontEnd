/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { H1, Paragraph } from "../components/Text";
import TaskCardContainer from "../components/taskComponents/TaskCardContainer";
import Separator from "../components/Separator";
import TaskDisplay from "../components/taskComponents/TaskDisplay";
import { colors } from "../colors";
import { TaskProvider } from "../state/TaskDisplayContext";
import { useTasks } from "../hooks/useTasks";

export const Route = createFileRoute("/")({
  component: RouteComponent,

  // Typing with context is a nightmare
  beforeLoad: async ({ context }: any) => {
    const auth = context.auth;

    // Wait until auth finishes loading / refreshes
    if (auth?.isLoading) {
      await auth.refresh();
    }

    // Now check authentication
    if (!auth?.isAuthenticated) {
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

function RouteComponent() {
  const { activeTasks } = useTasks();

  return (
    <div css={pageWrapperCss}>
      <div css={contentCss}>
        <div css={displayContainerCss}>
          <H1 customCSS={titleDisplayCss}>SimonChaela Task Management</H1>
          <Paragraph weight="semibold" customCSS={titleDescriptionCss}>
            Active Tasks
          </Paragraph>
        </div>
        <TaskProvider>
          <TaskDisplay />
          <Separator />
          <TaskCardContainer tasks={activeTasks} />
        </TaskProvider>
      </div>
    </div>
  );
}
