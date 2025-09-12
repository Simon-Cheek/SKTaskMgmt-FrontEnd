/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { H2 } from "../Text";
import Btn from "../Button";
import Separator from "../Separator";
import { colors } from "../../colors";
import { useTaskDisplayContext } from "../../state/TaskDisplayContext";

const containerCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 12px 24px;
  border-bottom: 1px solid ${colors.gray03};

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;

    & > h2 {
      margin-bottom: 8px; /* Add spacing between text and buttons */
    }
  }
`;

const buttonRowCss = css`
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    justify-content: center;
  }
`;

const textCss = css`
  font-size: 1em;
`;

const btnCss = css`
  padding: 0.7em 0.8em;
  font-size: 0.8em;
`;

function TaskTabs() {
  const { sortBy, setSortBy } = useTaskDisplayContext();

  const options = [
    { label: "Priority", value: "priority" },
    { label: "Due Date", value: "dueDate" },
    { label: "My Tasks", value: "assignedUser" },
  ] as const;

  return (
    <div css={containerCss}>
      <H2 customCSS={textCss}>Sort By</H2>
      <Separator direction="vertical" />
      <div css={buttonRowCss}>
        {options.map((opt, idx) => (
          <div
            key={opt.value}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Btn
              color="blue"
              shade={sortBy === opt.value ? undefined : "light"}
              customCSS={btnCss}
              onClick={() => setSortBy(opt.value)}
            >
              {opt.label}
            </Btn>
            {idx < options.length - 1 && <Separator direction="vertical" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskTabs;
