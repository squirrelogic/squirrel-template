"use client";

import { Icons } from "@repo/ui/icons";
import { createClient } from "@repo/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@repo/ui/sidebar";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import { Skeleton } from "@repo/ui/skeleton";

export function NavUser() {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const { user, loading } = useUser();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const navigate = (path: string) => {
    const locale = pathname.split("/")[1];
    router.push(`/${locale}/app${path}`);
  };

  if (loading) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex items-center gap-2 px-2 py-1.5">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="flex-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="mt-1 h-3 w-32" />
            </div>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  if (!user) {
    return null;
  }

  const userInitials = user.email
    ?.split("@")[0]
    .split(".")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={user.user_metadata?.avatar_url}
                  alt={user.email ?? ""}
                />
                <AvatarFallback className="rounded-lg">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {user.user_metadata?.full_name ?? user.email?.split("@")[0]}
                </span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <Icons.ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user.user_metadata?.avatar_url}
                    alt={user.email ?? ""}
                  />
                  <AvatarFallback className="rounded-lg">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user.user_metadata?.full_name ?? user.email?.split("@")[0]}
                  </span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Icons.Sparkles className="mr-2 size-4" />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate("/account")}>
                <Icons.BadgeCheck className="mr-2 size-4" />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/account/billing")}>
                <Icons.CreditCard className="mr-2 size-4" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/notifications")}>
                <Icons.Bell className="mr-2 size-4" />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <Icons.LogOut className="mr-2 size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
