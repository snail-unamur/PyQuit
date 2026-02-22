import React, { ReactNode } from "react";
import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export function AppLayout({
  header,
  children,
}: {
  header: ReactNode;
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar className="border-r-0!" />
      <SidebarInset className="flex flex-col min-h-screen w-full bg-sidebar border-l">
        {header}
        <main className="md:p-10 p-4">
          <TooltipProvider>{children}</TooltipProvider>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
