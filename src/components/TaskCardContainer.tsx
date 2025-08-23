import TaskCard from "./TaskCard";
import TaskTabs from "./TaskTabs";
import Card from "./Card";

function TaskCardContainer() {
  return (
    <Card>
      <TaskTabs />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
    </Card>
  );
}

export default TaskCardContainer;
