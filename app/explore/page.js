import { Suspense } from "react";
import ExploreClient from "./ExploreClient";

export const metadata = {
  title: "Explore services",
  description: "Filter Airbnb Services from the 29 Oct 2026 snapshot by type of service and destination.",
};

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="container section" style={{ minHeight: "60svh" }} />}>
      <ExploreClient />
    </Suspense>
  );
}
