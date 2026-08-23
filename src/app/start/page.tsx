import type { Metadata } from "next";
import StartFlow from "./StartFlow";

export const metadata: Metadata = {
  title: "Start",
  description: "Begin Precision Weight + Wellness.",
};

export default function StartPage() {
  return <StartFlow />;
}
