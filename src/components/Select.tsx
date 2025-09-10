/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";
import { colors } from "../colors";

import ArrowIconUrl from "../assets/dropdown-arrow.svg?url";

const wrapper = css`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const selectStyle = css`
  width: 100%;
  padding: 0.7em 0.75em !important;
  border: 1px solid ${colors.gray02};
  border-radius: 1em;
  font-family: "Montserrat", sans-serif;
  font-size: 0.95em;
  background-color: ${colors.gray00};
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
`;

const iconStyle = css`
  position: absolute;
  right: 0.75em;
  top: 50%;
  transform: translateY(-50%);
  width: 1em;
  height: 1em;
  pointer-events: none; /* so clicks go to the select */
`;

const SelectOverlay = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement>
>(({ children, ...props }, ref) => (
  <div css={wrapper}>
    <select ref={ref} css={selectStyle} {...props}>
      {children}
    </select>
    <img css={iconStyle} src={ArrowIconUrl} alt="" aria-hidden />
  </div>
));

SelectOverlay.displayName = "SelectOverlay";
export default SelectOverlay;
