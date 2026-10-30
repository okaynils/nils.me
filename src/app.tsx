import type { ReactNode } from "react";
import { TooltipProvider } from "@nils/ui";

export function App({ children }: { children: ReactNode }) {
  return <TooltipProvider>{children}</TooltipProvider>;
}
