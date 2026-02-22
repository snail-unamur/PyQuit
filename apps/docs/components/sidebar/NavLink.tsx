import { LayoutDashboard } from "lucide-react";
import Link from "next/link";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function NavLink() {
  const links = {
    home: { path: "", label: "Dasboard", icon: LayoutDashboard },
  };

  return (
    <SidebarMenu>
      {Object.entries(links).map(([key, link]) => (
        <SidebarMenuItem key={key} className="my-1">
          <SidebarMenuButton asChild>
            <Link href={link.path} className=" text-foreground!">
              <link.icon size={24} className="me-2" />
              <span>{link.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
