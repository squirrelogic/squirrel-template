"use client";

import * as React from "react";
import { Icons, type Icon } from "@repo/ui/icons";
import Image from "next/image";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@repo/ui/sidebar";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { getUserOrganizationsAction } from "@/actions/organization/get-user-organizations-action";

// This is sample data for nav items
const data = {
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: Icons.SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Prompts",
          url: "#",
          icon: Icons.Sparkles,
          isActive: true,
        },
        {
          title: "Playground",
          url: "#",
          icon: Icons.Bot,
        },
      ],
    },
    {
      title: "Dashboards",
      url: "#",
      icon: Icons.PieChart,
      items: [
        {
          title: "Analytics",
          url: "#",
          icon: Icons.Frame,
        },
        {
          title: "Reports",
          url: "#",
          icon: Icons.BookOpen,
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Icons.Settings2,
      items: [
        {
          title: "Account",
          url: "#",
          icon: Icons.User,
        },
        {
          title: "Billing",
          url: "#",
          icon: Icons.CreditCard,
        },
      ],
    },
  ],
  projects: [
    {
      name: "Project A",
      url: "#",
      icon: Icons.Command,
    },
    {
      name: "Project B",
      url: "#",
      icon: Icons.Frame,
    },
    {
      name: "Travel",
      url: "#",
      icon: Icons.MapIcon,
    },
  ],
};

export function AppSidebar({
  userId,
  ...props
}: React.ComponentProps<typeof Sidebar> & { userId: string }) {
  const [organizations, setOrganizations] = React.useState<
    Array<{
      name: string;
      logo: Icon;
      plan: string;
    }>
  >([]);

  const { execute } = useAction(getUserOrganizationsAction, {
    onSuccess: ({ data }) => {
      setOrganizations(
        data?.organizations?.map((org) => ({
          id: org.organization.id,
          name: org.organization.name,
          logo: Icons.Building,
          plan: org.role || "member",
        })) || [],
      );
    },
  });

  React.useEffect(() => {
    if (userId) {
      execute({ userId });
    }
  }, [userId, execute]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="list-none py-4 bg-[hsl(240_5.9%_10%)] rounded-md pl-4 group-data-[collapsible=icon]:py-0 group-data-[collapsible=icon]:pl-1 transition">
            <Link href="/en" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="logo"
                width={32}
                height={32}
                className="group-data-[collapsible=icon]:max-w-6 group-data-[collapsible=icon]:w-6 transition max-w-14 w-14"
              />
              <span className="text-3xl font-bold bg-gradient-to-r from-[#33F9FA] via-[#8F6DFE] to-[#FE87FF] text-transparent bg-clip-text transition group-data-[collapsible=icon]:display-none">
                Squirrel
              </span>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
        <TeamSwitcher teams={organizations} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
