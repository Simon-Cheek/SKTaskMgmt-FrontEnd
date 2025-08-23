/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import type { ReactNode } from "react";

interface CardProps {
  children?: ReactNode;
}

function Card({ children }: CardProps) {
  const cardCss = css`
    border-radius: 20px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  `;

  return <div css={cardCss}>{children}</div>;
}

export default Card;
