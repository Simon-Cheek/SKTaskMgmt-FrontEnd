/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { H4, Paragraph } from "./Text";
import type { Priority, Task } from "../types";
import TaskIcon from "../assets/kIcon.svg";
import Card from "./Card";
import { colors } from "../colors";
import Separator from "./Separator";
import Btn from "./Button";

const cardCss = css`
  padding: 32px 32px;
`;

const emptyStateCss = css`
  background-color: #fbfeff;
  border-radius: 24px;
  margin: 2em 0.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  width: 100%;
  text-align: center;
`;

const iconCss = css`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  box-shadow: 0 1px 4px rgba(10, 20, 80, 0.08);
`;

const taskHeaderCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const leftSectionCss = css`
  display: flex;
  align-items: center;
`;

const priorityCss = (priority: Priority) => css`
  font-weight: bold;
  color: ${priority === "P1"
    ? colors.priority1
    : priority === "P2"
      ? colors.priority2
      : colors.priority3};
`;

const contentCss = css`
  display: flex;
  flex-direction: column;
`;

const labelCss = css`
  font-size: 0.85rem;
  color: ${colors.gray05};
  font-weight: 600;
`;

const valueCss = css`
  font-size: 0.95rem;
  color: #0b1b2b;
`;

const dateContainerCss = css`
  display: flex;
  flex-direction: row;
`;

const btnContainerCss = css`
  display: flex;
  flex-direction: row;
`;

const lowerContainerCss = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

function formatDate(date: Date) {
  try {
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch {
    const parsed = new Date(date as unknown as string);
    return isNaN(parsed.getTime())
      ? "—"
      : parsed.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "2-digit",
        });
  }
}

function TaskHeader({
  title,
  priority,
}: {
  title: string;
  priority: Priority;
}) {
  return (
    <div css={taskHeaderCss}>
      <div css={leftSectionCss}>
        <img src={TaskIcon} alt="Task Icon" css={iconCss} />
        <Separator direction="vertical" />
        <H4>{title}</H4>
      </div>
      <Paragraph customCSS={priorityCss(priority)}>{priority}</Paragraph>
    </div>
  );
}

function TaskDisplay({ task }: { task?: Task | null }) {
  return !task ? (
    <div css={emptyStateCss}>
      <Paragraph>Select a Task to View Details</Paragraph>
    </div>
  ) : (
    <Card customCSS={cardCss}>
      <TaskHeader title={task.name} priority={task.priority} />
      <Separator />
      <div css={contentCss}>
        <div>
          <Paragraph>
            {task.description?.trim() || "No description provided."}
          </Paragraph>
        </div>
        <Separator />
        <div css={lowerContainerCss}>
          <div css={dateContainerCss}>
            <div>
              <Paragraph customCSS={labelCss}>Due Date</Paragraph>
              <Paragraph customCSS={valueCss}>
                {formatDate(task.dueDate)}
              </Paragraph>
            </div>
            <Separator direction="vertical" size="lg" />
            <div>
              <Paragraph customCSS={labelCss}>Assigned Date</Paragraph>
              <Paragraph customCSS={valueCss}>
                {formatDate(task.assignedDate)}
              </Paragraph>
            </div>
          </div>
          <div css={btnContainerCss}>
            <Btn color="blue">Edit</Btn>
            <Separator direction="vertical" size="sm" />
            <Btn color="blue">Delete</Btn>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default TaskDisplay;
