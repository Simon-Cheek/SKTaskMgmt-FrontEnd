/** @jsxImportSource @emotion/react */
import { css, type SerializedStyles } from "@emotion/react";
import { colors } from "../colors";
import React from "react";

type Shade = "light" | "normal" | "dark";

interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: keyof typeof colors;
  shade?: Shade;
  gradient?: boolean;
  customCSS?: SerializedStyles;
  customTextCSS?: SerializedStyles;
  bold?: boolean;
  long?: boolean;
}

const Btn: React.FC<BtnProps> = ({
  color,
  shade = "normal",
  gradient = false,
  customCSS,
  customTextCSS,
  bold = false,
  long = false,
  children,
  ...rest
}) => {
  // Determine shade suffix
  const baseShade = shade === "light" ? "01" : shade === "dark" ? "06" : "04";
  const baseColor = colors[`${color}${baseShade}`] ?? colors[color];

  // Compute lighter/darker variants
  const lightButtonTextColor =
    colors[`${color}0${parseInt(baseShade) + 3}`] ?? baseColor;
  const darkerColor =
    colors[`${color}0${parseInt(baseShade) + 1}`] ?? baseColor;
  const lighterColor =
    colors[`${color}0${Math.max(parseInt(baseShade) - 1, 0)}`] ?? baseColor;

  // For light variant → transparent background & colored border
  const backgroundStyle =
    shade === "light"
      ? css`
          background: transparent;
          border: 2px solid ${darkerColor};
          color: ${lightButtonTextColor};
          &:hover {
            background: ${baseColor}1A;
          }
        `
      : css`
          background: ${gradient
            ? `linear-gradient(to right, ${darkerColor}, ${baseColor})`
            : baseColor};
          color: #fff;
          border: none;
          &:hover {
            background: ${gradient
              ? `linear-gradient(to right, ${darkerColor}, ${lighterColor})`
              : lighterColor};
          }
        `;

  const baseStyle = css`
    display: inline-flex;
    font-family: "Montserrat", sans-serif;
    align-items: center;
    justify-content: center;
    font-size: 0.95rem;
    font-weight: ${bold ? 600 : 500};
    padding: ${long ? "0.6em 1.5em" : "0.6em 1.2em"};
    border-radius: 16px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition:
      background-color 0.2s ease,
      transform 0.1s ease,
      box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
  `;

  return (
    <button {...rest} css={[baseStyle, backgroundStyle, customCSS]}>
      <span css={customTextCSS}>{children}</span>
    </button>
  );
};

export default Btn;
