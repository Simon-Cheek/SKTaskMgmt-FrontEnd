/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TaskCard from "./TaskCard";
import TaskTabs from "./TaskTabs";

function TaskCardContainer() {
  const containerCss = css`
    border-radius: 20px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  `;

  return (
    <div css={containerCss}>
      <TaskTabs />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
    </div>
  );
}

export default TaskCardContainer;
