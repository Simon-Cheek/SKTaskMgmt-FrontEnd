/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function Separator({ size = "md", direction = "horizontal" }) {
  let orient = direction === "horizontal" ? "height" : "width";
  let span;
  switch (size) {
    case "xs":
      span = "8";
      break;
    case "sm":
      span = "24";
      break;
    case "lg":
      span = "36";
      break;
    case "xl":
      span = "48";
      break;
    default:
      span = "16";
  }

  const sepStyle = css`
    min-${orient}: ${span}px;
  `;

  return <div css={sepStyle}></div>;
}

export default Separator;
