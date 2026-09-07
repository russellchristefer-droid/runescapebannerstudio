import type { ErrorComponentProps } from "@tanstack/react-router";

export function AppErrorComponent({ error }: ErrorComponentProps) {
  const message = error instanceof Error && error.message ? error.message : "This tile failed to load.";
  return (
    <main className="min-h-dvh bg-bg px-5 py-16 text-center text-fg">
      <h1 className="page-h1 site-title">This tile failed to load.</h1>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted">{message}</p>
      <p className="mt-6">
        <a href="/" className="text-parchment">
          Back to the desk
        </a>
      </p>
    </main>
  );
}
