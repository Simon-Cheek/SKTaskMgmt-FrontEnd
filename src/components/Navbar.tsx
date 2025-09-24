/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
    setIsOpen(false); // close mobile menu first
    logout(); // clears user / token
    navigate({ to: "/login" });
  };

  return (
    <AnimatePresence>
      {isAuthenticated && (
        <motion.nav
          css={navCss}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
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
          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={menuRef}
                css={mobileMenuCss}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                exit={{ scaleY: 0, opacity: 0 }}
                style={{ overflow: "hidden" }}
                transition={{ duration: 0.25 }}
              >
                <Link to="/archived" onClick={() => setIsOpen(false)}>
                  Archived
                </Link>
                <Link to="/create" onClick={() => setIsOpen(false)}>
                  Create
                </Link>
                <button onClick={handleLogout}>Logout</button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

export default Navbar;
