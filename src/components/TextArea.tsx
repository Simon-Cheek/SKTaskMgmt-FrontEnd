/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import type { SerializedStyles } from "@emotion/react";
import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";
import { colors } from "../colors";

const baseTextAreaCss = css`
  padding: 0.7em 1em;
  border: 1px solid ${colors.gray02};
  border-radius: 1em;
  font-size: 0.95em;
  font-family: "Montserrat", sans-serif;
  outline: none;
  background-color: ${colors.gray00};
  transition:
    border-color 0.3s ease,
    background-color 0.3s ease;

  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.08),
    0 2px 6px rgba(0, 0, 0, 0.04);

  resize: vertical; /* allow vertical resizing only */

  &:focus {
    border-color: ${colors.blue03};
    background-color: ${colors.white};
  }

  &::placeholder {
    color: ${colors.gray04};
    transition: color 0.25s ease;
  }

  &:focus::placeholder {
    color: ${colors.gray03};
  }
`;

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  customCSS?: SerializedStyles;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ customCSS, ...props }, ref) => {
    return <textarea ref={ref} css={[baseTextAreaCss, customCSS]} {...props} />;
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
