/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import type { SerializedStyles } from "@emotion/react";

type SeparatorSize = "xs" | "sm" | "md" | "lg" | "xl";
type SeparatorDirection = "horizontal" | "vertical";

interface SeparatorProps {
  size?: SeparatorSize;
  direction?: SeparatorDirection;
  customCSS?: SerializedStyles;
}

function Separator({
  size = "md",
  direction = "horizontal",
  customCSS,
}: SeparatorProps) {
  const orient = direction === "horizontal" ? "height" : "width";

  const span = (() => {
    switch (size) {
      case "xs":
        return 8;
      case "sm":
        return 12;
      case "lg":
        return 24;
      case "xl":
        return 36;
      default:
        return 16;
    }
  })();

  const sepStyle = css`
    min-${orient}: ${span}px;
  `;

  return <div css={[sepStyle, customCSS]} />;
}

export default Separator;
