/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { createFileRoute } from "@tanstack/react-router";
import Card from "../components/Card";
import { H1 } from "../components/Text";
import { LoginForm } from "../components/login/LoginForm";
import Separator from "../components/Separator";
import { colors } from "../colors";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

const loginContainerCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 450px;
  max-height: 100%;
`;

const loginCardCss = css`
  margin: 0.5em 2em;
  padding: 1.5em 2em;
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

const headerContainerCss = css`
  border-bottom: ${colors.gray03} 1px solid;
  width: 75%;
  display: flex;
  justify-content: center;
`;

function RouteComponent() {
  return (
    <div css={loginContainerCss}>
      <Card customCSS={loginCardCss}>
        <div css={headerContainerCss}>
          <H1 customCSS={headerCss}>Login</H1>
        </div>
        <Separator size="xl" />
        <LoginForm />
      </Card>
    </div>
  );
}
