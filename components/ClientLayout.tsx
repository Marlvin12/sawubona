"use client";

import { ApplicationProvider } from "./ApplicationProvider";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return <ApplicationProvider>{children}</ApplicationProvider>;
}
