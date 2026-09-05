import { createFileRoute, redirect } from "@tanstack/react-router";
import { savedEdition } from "@/lib/eggs";

export const Route = createFileRoute("/varrock")({
  beforeLoad: () => {
    const edition = savedEdition();
    throw redirect({
      to: "/towns/$id",
      params: { id: edition === "RS3" ? "varrock" : "osrsvarrock" },
    });
  },
});
