/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TaskCard from "./TaskCard";
import TaskTabs from "./TaskTabs";
import Card from "../Card";
import Separator from "../Separator";
import { colors } from "../../colors";
import { useGlobal } from "../../state/GlobalContext";

function TaskCardContainer() {
  const overflowCss = css`
    max-height: 300px;
    overflow-y: auto;

    @media (min-width: 768px) {
      max-height: 600px;
    }
  `;

  const sepCss = css`
    border-top: 1px solid ${colors.gray03};
  `;

  const { tasks } = useGlobal();

  return (
    <Card>
      <TaskTabs />
      <div css={overflowCss}>
        {tasks.map((task) => (
          <TaskCard task={task} />
        ))}
      </div>
      <Separator customCSS={sepCss} />
    </Card>
  );
}

export default TaskCardContainer;
