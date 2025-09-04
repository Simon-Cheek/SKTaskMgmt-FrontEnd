/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import Btn from "../Button";
import { colors } from "../../colors";

const formCss = css`
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 100%;
`;

const inputCss = css`
  padding: 0.75em 1em;
  border: 1px solid #ccc;
  border-radius: 0.5em;
  font-size: 1em;
  outline: none;
  transition: border 0.2s ease;

  &:focus {
    border-color: #4cafef;
    box-shadow: 0 0 0 3px rgba(76, 175, 239, 0.3);
  }
`;

const buttonCss = css`
  padding: 0.75em;
  border: none;
  border-radius: 0.5em;
  background: linear-gradient(135deg, #4cafef, #007bff);
  color: white;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  transition:
    background 0.3s ease,
    transform 0.1s ease;

  &:hover {
    background: linear-gradient(135deg, #3a9bdc, #006be0);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form css={formCss} onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Username"
        css={inputCss}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        css={inputCss}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Btn color="blue" type="submit">
        Login
      </Btn>
    </form>
  );
}
