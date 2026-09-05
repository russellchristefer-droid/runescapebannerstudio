import { createFileRoute, redirect } from "@tanstack/react-router";
import { savedEdition } from "@/lib/eggs";

export const Route = createFileRoute("/lumb")({
  beforeLoad: () => {
    const edition = savedEdition();
    throw redirect({
      to: "/towns/$id",
      params: { id: edition === "RS3" ? "lumbridge" : "osrslumbridge" },
    });
  },
});
