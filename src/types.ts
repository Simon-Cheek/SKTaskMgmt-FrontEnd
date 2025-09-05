/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { createFileRoute } from "@tanstack/react-router";
import Card from "../components/Card";
import { useState } from "react";

export const Route = createFileRoute("/create")({
  component: RouteComponent,
});

const creationContainerCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 800px;
`;

const creationCardCss = css`
  padding: 2em;
  width: 400px;
`;

const formCss = css`
  display: flex;
  flex-direction: column;
  gap: 1em;

  label {
    font-weight: bold;
    margin-bottom: 0.25em;
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
  const [formData, setFormData] = useState({
    taskName: "",
    taskDescription: "",
    assignee: "person1",
    priority: "P1",
    dueDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Task Created:", formData);
    // TODO: Hook into backend / state management
  };

  return (
    <div css={creationContainerCss}>
      <Card customCSS={creationCardCss}>
        <h2>Create New Task</h2>
        <form css={formCss} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="taskName">Task Name</label>
            <input
              id="taskName"
              name="taskName"
              type="text"
              value={formData.taskName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="taskDescription">Task Description</label>
            <textarea
              id="taskDescription"
              name="taskDescription"
              rows={3}
              value={formData.taskDescription}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="assignee">Assign To</label>
            <select
              id="assignee"
              name="assignee"
              value={formData.assignee}
              onChange={handleChange}
            >
              <option value="person1">Person 1</option>
              <option value="person2">Person 2</option>
            </select>
          </div>

          <div>
            <label>Priority</label>
            <div className="priority-group">
              <label>
                <input
                  type="radio"
                  name="priority"
                  value="P1"
                  checked={formData.priority === "P1"}
                  onChange={handleChange}
                />
                P1
              </label>
              <label>
                <input
                  type="radio"
                  name="priority"
                  value="P2"
                  checked={formData.priority === "P2"}
                  onChange={handleChange}
                />
                P2
              </label>
              <label>
                <input
                  type="radio"
                  name="priority"
                  value="P3"
                  checked={formData.priority === "P3"}
                  onChange={handleChange}
                />
                P3
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="dueDate">Due Date</label>
            <input
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
