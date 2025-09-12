/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { colors } from "../colors";
import { useAuth } from "../state/AuthContext";

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

  @media (max-width: 600px) {
    display: block;
  }
`;

const linkContainerCss = css`
  display: flex;
  gap: 20px;
  align-items: center; /* ensures vertical centering */

  @media (max-width: 600px) {
    display: none;
  }

  a,
  button {
    color: ${colors.white};
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
    font: inherit;
    padding: 0;

    &:visited {
      color: ${colors.white};
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

  a,
  button {
    padding: 10px 20px;
    text-decoration: none;
    color: ${colors.white};
    background: none;
    border: none;
    cursor: pointer;
    font: inherit;
    text-align: left;

    &:visited {
      color: ${colors.white};
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

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
    setIsOpen(false);
  };

  // Only render navbar if authenticated
  if (!isAuthenticated) return null;

  return (
    <nav css={navCss}>
      <Link
        to="/"
        css={linkStyle}
        style={{ fontSize: "1.5em", fontWeight: "bold" }}
      >
        SK
      </Link>

      {/* Desktop Links */}
      <div css={linkContainerCss}>
        <Link to="/archived" css={linkStyle}>
          Archived
        </Link>
        <Link to="/create" css={linkStyle}>
          Create
        </Link>
        <button onClick={handleLogout} css={linkStyle}>
          Logout
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button css={menuButtonCss} onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {/* Mobile Menu */}
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
        <Link to="/archived" onClick={() => setIsOpen(false)}>
          Archived
        </Link>
        <Link to="/create" onClick={() => setIsOpen(false)}>
          Create
        </Link>
        <button onClick={handleLogout}>Logout</button>
      </motion.div>
    </nav>
  );
}

export default Navbar;
