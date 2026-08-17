import { createFileRoute } from "@tanstack/react-router";
import { ProfileCard } from "@/components/ProfileCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Resilient Profile Card & Settings Component" },
      {
        name: "description",
        content:
          "A production-ready React profile card with loading, empty, error and long-string stress states.",
      },
      { property: "og:title", content: "Resilient Profile Card & Settings Component" },
      {
        property: "og:description",
        content:
          "Switch between normal, skeleton, empty, error and stress-test states in real time.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-dvh bg-background">
      <ProfileCard />
    </main>
  );
}
