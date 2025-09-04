/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import type { SerializedStyles } from "@emotion/react";
import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

const baseInputCss = css`
  padding: 0.7em 1em;
  border: 1px solid #ddd;
  border-radius: 1em;
  font-size: 0.95em;
  outline: none;
  background-color: #fafafa;
  transition:
    border-color 0.25s ease,
    background-color 0.25s ease;

  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.08),
    0 2px 6px rgba(0, 0, 0, 0.04);

  &:focus {
    border-color: #4cafef;
    background-color: #fff;
  }

  &::placeholder {
    color: #999;
    transition: color 0.25s ease;
  }

  &:focus::placeholder {
    color: #bbb;
  }
`;

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  customCSS?: SerializedStyles;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ customCSS, ...props }, ref) => {
    return <input ref={ref} css={[baseInputCss, customCSS]} {...props} />;
  }
);

Input.displayName = "Input";

export default Input;
