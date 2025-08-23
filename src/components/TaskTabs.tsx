/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { H2 } from "./Text";
import Btn from "./Button";
import Separator from "./Separator";

function TaskTabs() {
  const containerCss = css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding: 12px 0px;
    margin: 0px 32px;
    border-bottom: 1px solid #ccd;
  `;

  const textCss = css`
    font-size: 1em;
  `;

  return (
    <div css={containerCss}>
      <H2 customCSS={textCss}>Sort By</H2>
      <Separator direction="vertical" />
      <Btn color="blue" shade="light">
        Priority
      </Btn>
      <Separator direction="vertical" />
      <Btn color="blue" shade="light">
        Due Date
      </Btn>
      <Separator direction="vertical" />
      <Btn color="blue">My Tasks</Btn>
    </div>
  );
}

export default TaskTabs;
