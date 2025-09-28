/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { motion, AnimatePresence } from "framer-motion";
import { H4, Paragraph } from "../Text";
import type { Priority } from "../../types";
import Card from "../Card";
import { colors } from "../../colors";
import Separator from "../Separator";
import Btn from "../Button";
import { UserIcon } from "../UserIcon";
import { useTaskDisplayContext } from "../../state/TaskDisplayContext";
import { formatDate } from "../../utils/dateFormat";
import { useTasks } from "../../hooks/useTasks";

const cardCss = css`
  padding: 24px 32px;
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.5em 0;
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
  flex-wrap: wrap;
  gap: 1rem;
`;

const customDisplayButtonCss = css`
  padding: 10px 12px;
  font-size: 0.9em;
`;

function TaskHeader({
  title,
  priority,
  assignedUsername,
}: {
  title: string;
  priority: Priority;
  assignedUsername: string;
}) {
  return (
    <div css={taskHeaderCss}>
      <div css={leftSectionCss}>
        <img src={UserIcon(assignedUsername)} alt="Task Icon" css={iconCss} />
        <Separator direction="vertical" />
        <H4>{title}</H4>
      </div>
      <Paragraph customCSS={priorityCss(priority)}>{priority}</Paragraph>
    </div>
  );
}

import { useNavigate } from "@tanstack/react-router";

export default function TaskDisplay() {
  const { selectedTask: task, setSelectedTask } = useTaskDisplayContext();
  const { deleteTask, markAsComplete } = useTasks();
  const navigate = useNavigate();

  const handleComplete = () => {
    if (task) {
      setSelectedTask(null);
      markAsComplete(task.id!);
    }
  };

  const handleDelete = () => {
    if (task) {
      setSelectedTask(null);
      deleteTask(task.id!);
    }
  };

  const handleEdit = () => {
    if (task) {
      navigate({
        to: "/edit",
        search: { task: task.id }, // becomes ?task=<id>
      });
    }
  };

  return (
    <Card customCSS={cardCss}>
      <AnimatePresence mode="wait">
        {!task ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.09 }}
          >
            <Paragraph>Select a Task to View Details</Paragraph>
          </motion.div>
        ) : (
          <motion.div
            key={task.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.09 }}
            style={{ width: "100%" }}
          >
            <TaskHeader
              title={task.name}
              priority={task.priority}
              assignedUsername={task.assignedTo}
            />
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
                  {task.status !== "Complete" && (
                    <>
                      <Btn
                        color="green"
                        customCSS={customDisplayButtonCss}
                        onClick={handleComplete}
                      >
                        Complete
                      </Btn>
                      <Separator direction="vertical" size="sm" />
                      <Btn
                        color="blue"
                        customCSS={customDisplayButtonCss}
                        onClick={handleEdit}
                      >
                        Edit
                      </Btn>
                      <Separator direction="vertical" size="sm" />
                    </>
                  )}
                  <Btn
                    color="red"
                    customCSS={customDisplayButtonCss}
                    onClick={handleDelete}
                  >
                    Delete
                  </Btn>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
