import dynamic from "next/dynamic";

// Code-split heavy client components into separate chunks
const ScrollytellingContainer = dynamic(
  () => import("@/components/scrollytelling/ScrollytellingContainer")
);

const PostScrollSections = dynamic(
  () => import("@/components/sections/PostScrollSections")
);

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <ScrollytellingContainer />
      <PostScrollSections />
    </main>
  );
}
