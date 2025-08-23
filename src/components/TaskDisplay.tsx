/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { H4, Paragraph } from "./Text";
import type { Task } from "../types";
import TaskIcon from "../assets/kIcon.svg";
import Separator from "./Separator";
import { formatDate } from "../utils/dateFormat";
import Card from "./Card";
import { colors } from "../colors";

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
  flex: 0 0 40px;
  border-radius: 20px;
  box-shadow: 0 1px 4px rgba(10, 20, 80, 0.08);
`;

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
  color: #666;
  margin-top: 2px;
`;

function TaskDisplay({ task }: { task?: Task | null }) {
  return !task ? (
    <div css={emptyStateCss}>
      <Paragraph>Select a Task to View Details</Paragraph>
    </div>
  ) : (
    <Card>
      <div css={cardCss}>
        <img src={TaskIcon} alt="Assigned Icon" css={iconCss} />
        <Separator direction="vertical" />
        <div css={contentCss}>
          <div css={textBlockCss}>
            <H4 customCSS={nameCss}>{task.name}</H4>
            <Paragraph customCSS={dateCss}>
              {formatDate(task.dueDate)}
            </Paragraph>
          </div>
          <Paragraph weight="bold" customCSS={priorityCss(task.priority)}>
            {task.priority}
          </Paragraph>
        </div>
      </div>
    </Card>
  );
}

export default TaskDisplay;
