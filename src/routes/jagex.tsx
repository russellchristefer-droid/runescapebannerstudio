import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/jagex")({
  beforeLoad: () => {
    throw redirect({ to: "/jmods" });
  },
});
