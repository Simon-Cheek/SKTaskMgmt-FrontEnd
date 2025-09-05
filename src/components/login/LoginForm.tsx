/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import Btn from "../Button";
import Input from "../Input";
import Separator from "../Separator";

const formCss = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form css={formCss} onSubmit={(e) => e.preventDefault()}>
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
      <Separator size="xl" />
      <Btn color="blue" type="submit">
        Submit
      </Btn>
    </form>
  );
}
