/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import Card from "../components/Card";
import { useState } from "react";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import Separator from "../components/Separator";
import Select from "../components/Select";
import type { Task } from "../types";
import { useTasks } from "../hooks/useTasks";
import { validatePriority } from "../utils/taskUtils";
import { parseLocalDate, validateDueDate } from "../utils/dateFormat";

export const Route = createFileRoute("/create")({
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

const creationContainerCss = css`
  display: flex;
  justify-content: center;
  margin: 4em 0.75em;
`;

const creationCardCss = css`
  padding: 2em;
  width: 400px;
`;

const formCss = css`
  display: flex;
  flex-direction: column;
  gap: 1.9em;

  .form-field {
    display: flex;
    flex-direction: column;
  }

  label {
    font-weight: bold;
    margin-bottom: 0.4em;
  }

  input,
  select,
  textarea {
    padding: 0.5em;
    border: 1px solid #ddd;
    border-radius: 0.5em;
    font-size: 0.9em;
  }

  .priority-group {
    display: flex;
    gap: 1em;
    align-items: center;
  }

  button {
    margin-top: 1em;
    padding: 0.75em;
    border: none;
    border-radius: 0.5em;
    background: #007bff;
    color: white;
    font-size: 1em;
    cursor: pointer;
  }

  button:hover {
    background: #0056b3;
  }
`;

function RouteComponent() {
  const { addTask } = useTasks();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    taskName: "",
    taskDescription: "",
    assignee: "Simon",
    priority: "P1",
    dueDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePriority(formData.priority)) {
      alert("Priority is not valid!");
      return;
    }
    const due = parseLocalDate(formData.dueDate);
    const error = validateDueDate(due);
    if (error) {
      alert(error);
      return;
    }

    const newTask: Task = {
      id: formData.taskName + Date.now(),
      name: formData.taskName,
      description: formData.taskDescription,
      assignedTo: formData.assignee,
      priority: formData.priority as "P1" | "P2" | "P3",
      assignedDate: new Date(),
      dueDate: due,
      status: "Active",
    };

    addTask(newTask);
    navigate({ to: "/" });
  };

  return (
    <div css={creationContainerCss}>
      <Card customCSS={creationCardCss}>
        <h2>Create New Task</h2>
        <Separator size="lg" />
        <form css={formCss} onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="taskName">Task Name</label>
            <Input
              id="taskName"
              name="taskName"
              type="text"
              value={formData.taskName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="taskDescription">Task Description</label>
            <TextArea
              id="taskDescription"
              name="taskDescription"
              rows={3}
              value={formData.taskDescription}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="assignee">Assign To</label>
            <Select
              id="assignee"
              name="assignee"
              value={formData.assignee}
              onChange={handleChange}
            >
              <option value="Simon">Simon</option>
              <option value="Chaela">Chaela</option>
            </Select>
          </div>

          <div className="form-field">
            <label>Priority</label>
            <div className="priority-group">
              {["P1", "P2", "P3"].map((p) => (
                <label key={p}>
                  <input
                    type="radio"
                    name="priority"
                    value={p}
                    checked={formData.priority === p}
                    onChange={handleChange}
                  />
                  {p}
                </label>
              ))}
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="dueDate">Due Date</label>
            <Input
              id="dueDate"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Create Task</button>
        </form>
      </Card>
    </div>
  );
}
