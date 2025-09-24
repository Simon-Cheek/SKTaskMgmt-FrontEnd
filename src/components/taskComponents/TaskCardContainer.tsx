/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TaskCard from "./TaskCard";
import TaskTabs from "./TaskTabs";
import Card from "../Card";
import Separator from "../Separator";
import { colors } from "../../colors";
import { useMemo } from "react";
import { useTaskDisplayContext } from "../../state/TaskDisplayContext";
import { useAuth } from "../../state/AuthContext";
import type { Task } from "../../types";

type TaskCardContainerProps = {
  tasks: Task[];
};

function TaskCardContainer({ tasks }: TaskCardContainerProps) {
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

  // const { tasks } = useTasks();
  const { sortBy } = useTaskDisplayContext();
  const { user } = useAuth();

  // derive sorted tasks without mutating the original
  const sortedTasks = useMemo(() => {
    if (!tasks) return [];

    if (sortBy === "priority") {
      const order = { P1: 1, P2: 2, P3: 3 };
      return [...tasks].sort((a, b) => order[a.priority] - order[b.priority]);
    }

    if (sortBy === "dueDate") {
      return [...tasks].sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
    }

    if (sortBy === "assignedUser") {
      if (user == null) {
        return tasks;
      }
      const mine = tasks.filter((t) => t.assignedTo === user.username);
      const others = tasks.filter((t) => t.assignedTo !== user.username);
      return [...mine, ...others];
    }

    return tasks;
  }, [tasks, sortBy, user?.username]);

  return (
    <Card>
      <TaskTabs />
      <div css={overflowCss}>
        {sortedTasks.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </div>
      <Separator customCSS={sepCss} />
    </Card>
  );
}

export default TaskCardContainer;
