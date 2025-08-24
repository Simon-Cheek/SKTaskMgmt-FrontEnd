/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { colors } from "../colors";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const navCss = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${colors.blue05};
    color: ${colors.white};
    padding: 16px 24px;
    position: relative;
  `;

  const menuButtonCss = css`
    background: none;
    border: none;
    color: ${colors.white};
    font-size: 24px;
    display: none;
    cursor: pointer;

    @media (max-width: 768px) {
      display: block;
    }
  `;

  const linkContainerCss = css`
    display: flex;
    gap: 20px;

    @media (max-width: 768px) {
      display: none;
    }

    a {
      color: ${colors.white};
      text-decoration: none;

      &:visited {
        color: ${colors.white}; /* prevents purple */
      }
      &:hover {
        color: ${colors.blue10};
      }
      &:active {
        color: ${colors.blue20};
      }
    }
  `;

  const mobileMenuCss = css`
    display: flex;
    flex-direction: column;
    background: ${colors.blue05};
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    transform-origin: top;

    a {
      padding: 10px 20px;
      text-decoration: none;
      color: ${colors.white};

      &:visited {
        color: ${colors.white}; /* prevents purple */
      }
      &:hover {
        color: ${colors.blue10};
      }
      &:active {
        color: ${colors.blue20};
      }
    }
  `;

  const linkStyle = css`
    text-decoration: none;
    color: ${colors.white};

    &:visited {
      color: ${colors.white};
    }
    &:hover {
      color: ${colors.blue10};
    }
    &:active {
      color: ${colors.blue20};
    }
  `;

  return (
    <nav css={navCss}>
      <Link
        to="/"
        css={linkStyle}
        style={{ fontSize: "1.5em", fontWeight: "bold" }}
      >
        SK
      </Link>

      <div css={linkContainerCss}>
        <Link to="/archived" css={linkStyle}>
          Archived
        </Link>
        <Link to="/create" css={linkStyle}>
          Create
        </Link>
        <Link to="/logout" css={linkStyle}>
          Logout
        </Link>
      </div>

      <button css={menuButtonCss} onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      <motion.div
        ref={menuRef}
        css={mobileMenuCss}
        style={{ overflow: "hidden" }}
        animate={{
          scaleY: isOpen ? 1 : 0,
          opacity: isOpen ? 1 : 0,
        }}
        initial={false}
        transition={{
          scaleY: { duration: 0.25, ease: "easeInOut" },
          opacity: { duration: 0.25, ease: "easeInOut" },
        }}
      >
        <Link to="/archived" onClick={() => setIsOpen(false)} css={linkStyle}>
          Archived
        </Link>
        <Link to="/create" onClick={() => setIsOpen(false)} css={linkStyle}>
          Create
        </Link>
        <Link to="/logout" onClick={() => setIsOpen(false)} css={linkStyle}>
          Logout
        </Link>
      </motion.div>
    </nav>
  );
}

export default Navbar;
