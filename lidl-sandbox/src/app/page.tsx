"use client";

import dynamic from "next/dynamic";

const Sandbox = dynamic(() => import("@/components/sandbox"), { ssr: false });

export default function Home() {
  return <Sandbox />;
}
