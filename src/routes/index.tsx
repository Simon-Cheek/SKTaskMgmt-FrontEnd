/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { createFileRoute } from "@tanstack/react-router";
import TaskCard from "../components/TaskCard";
import { H1, Paragraph } from "../components/Text";

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

const taskDisplayCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fbfeff;
  border-radius: 24px;
  margin: 2em 0.5em;
  height: 200px;
  box-shadow: 0 0 10px 2px rgba(10, 20, 80, 0.05);
`;

function TaskDisplay() {
  return (
    <div css={taskDisplayCss}>
      <Paragraph>Select a Task to View Details</Paragraph>
    </div>
  );
}

function RouteComponent() {
  return (
    <div css={pageWrapperCss}>
      <div css={contentCss}>
        <H1 customCSS={titleDisplayCss}>Title</H1>
        <TaskDisplay />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </div>
    </div>
  );
}
