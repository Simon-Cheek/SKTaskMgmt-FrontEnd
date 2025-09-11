/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import Btn from "../Button";
import Input from "../Input";
import Separator from "../Separator";
import { useGlobal } from "../../state/GlobalContext";

const formCss = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export function LoginForm() {
  const { login } = useGlobal();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(username, password);
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
      <Separator size="xl" />
      <Btn color="blue" type="submit">
        Submit
      </Btn>
    </form>
  );
}
