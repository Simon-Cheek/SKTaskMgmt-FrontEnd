/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { createFileRoute } from "@tanstack/react-router";
import Card from "../components/Card";
import { H1 } from "../components/Text";
import { LoginForm } from "../components/login/LoginForm";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

const loginContainerCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
`;

const loginCardCss = css`
  margin: 0.5em 2em;
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 400px;
  width: 100%;
`;

const headerCss = css`
  font-size: 1.6em;
`;

function RouteComponent() {
  return (
    <div css={loginContainerCss}>
      <Card customCSS={loginCardCss}>
        <H1 customCSS={headerCss}>Login</H1>
        <LoginForm />
      </Card>
    </div>
  );
}
