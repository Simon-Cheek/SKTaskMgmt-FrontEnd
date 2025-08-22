import { createFileRoute } from "@tanstack/react-router";
import { Paragraph } from "../components/Text";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Paragraph>Main stuff</Paragraph>;
}
