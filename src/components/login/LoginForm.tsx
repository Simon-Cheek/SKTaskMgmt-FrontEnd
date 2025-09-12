/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Btn from "../Button";
import Input from "../Input";
import Separator from "../Separator";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../state/AuthContext";

const formCss = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const errorCss = css`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 12px;
  text-align: center;
`;

export function LoginForm() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(username, password);
      console.log("Finished login");
      navigate({ to: "/" });
      console.log("Should have navigated by now");
    } catch (err) {
      setError("Invalid username or password.");
      // Clear after 3 seconds
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <form css={formCss} onSubmit={formSubmit}>
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Separator size="md" />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Separator size="md" />

      {/* Animated error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            css={errorCss}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <Separator size="md" />
      <Btn color="blue" type="submit">
        Submit
      </Btn>
    </form>
  );
}
