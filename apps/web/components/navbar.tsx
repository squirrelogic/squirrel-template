"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { createClient } from "@repo/supabase/client";
import { Button } from "@repo/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/dropdown-menu";
import { Icons } from "@repo/ui/icons";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import cn from "classnames";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [user, setUser] = React.useState<any>(null);
  const { setTheme } = useTheme();
  const router = useRouter();
  const t = useTranslations();
  const supabase = React.useMemo(() => createClient(), []);

  React.useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <nav className={cn(
      "w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      !user && "sticky top-0 z-50"
    )}>
      <div className="container flex h-16 items-center">
        <div className="flex items-center space-x-4">
          <div className="bg-black/50 rounded-full p-2">
            <Image src="/logo.png" alt="logo" width={40} height={40} />
          </div>
          <Link href="/" className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-[#33F9FA] via-[#8F6DFE] to-[#FE87FF] text-transparent bg-clip-text">
              Squirrel
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Button key={item.title} variant="ghost" asChild>
                <Link href={item.href}>{item.title}</Link>
              </Button>
            ))}
            {!user ? (
              <>
                <Button variant="outline" asChild>
                  <Link href="/login">{t("navbar.login")}</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">{t("navbar.sign_up")}</Link>
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={handleSignOut}>
                {t("navbar.sign_out")}
              </Button>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Icons.Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Icons.Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">{t("navbar.toggle_theme")}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden" size="icon">
                <Icons.Menu className="h-5 w-5" />
                <span className="sr-only">{t("navbar.toggle_menu")}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="sr-only">{t("navbar.navigation_menu")}</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Button
                    key={item.title}
                    variant="ghost"
                    asChild
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href={item.href}>{item.title}</Link>
                  </Button>
                ))}
                {!user ? (
                  <>
                    <Button
                      variant="outline"
                      asChild
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href="/login">{t("navbar.login")}</Link>
                    </Button>
                    <Button asChild onClick={() => setIsOpen(false)}>
                      <Link href="/register">{t("navbar.sign_up")}</Link>
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                  >
                    {t("navbar.sign_out")}
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
