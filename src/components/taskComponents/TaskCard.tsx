/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { H4, Paragraph } from "../Text";
import Separator from "../Separator";
import { colors } from "../../colors";
import type { Task } from "../../types";
import { formatDate } from "../../utils/dateFormat";
import { UserIcon } from "../UserIcon";
import { useTaskContext } from "../../state/TaskContext";

const cardCss = css`
  display: flex;
  align-items: center;
  padding: 16px 32px;
  max-width: 100%;
  border-radius: 0;
  box-shadow: none;
  border-bottom: 1px solid #e0e0e0;
  &:last-of-type {
    border-bottom: none;
  }
`;

const iconCss = css`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
`;

const contentCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

const textBlockCss = css`
  display: flex;
  flex-direction: column;
`;

const nameCss = css`
  margin: 0;
`;

const priorityCss = (priority: "P1" | "P2" | "P3") => css`
  color: ${priority === "P1"
    ? colors.priority1
    : priority === "P2"
      ? colors.priority2
      : colors.priority3};
`;

const dateCss = css`
  font-size: 0.85em;
  color: ${colors.gray05};
  margin-top: 2px;
`;

function TaskCard({ task }: { task: Task }) {
  const { setSelectedTask } = useTaskContext();

  return task == null ? (
    <div />
  ) : (
    <div css={cardCss} onClick={() => setSelectedTask(task)}>
      <img src={UserIcon(task.assignedTo)} alt="Assigned Icon" css={iconCss} />
      <Separator direction="vertical" />
      <div css={contentCss}>
        <div css={textBlockCss}>
          <H4 customCSS={nameCss}>{task.name}</H4>
          <Paragraph customCSS={dateCss}>{formatDate(task.dueDate)}</Paragraph>
        </div>
        <Paragraph weight="bold" customCSS={priorityCss(task.priority)}>
          {task.priority}
        </Paragraph>
      </div>
    </div>
  );
}

export default TaskCard;
