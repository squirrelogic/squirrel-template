"use client";

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/avatar";
import { Button } from "@repo/ui/button";
import { Skeleton } from "@repo/ui/skeleton";
import { Icons } from "@repo/ui/icons";

export default function AccountPage() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useUser();

  // Extract locale from pathname (e.g., /en/app/account -> en)
  const locale = pathname.split("/")[1];

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-24 w-24 rounded-lg" />
          <div className="flex-1">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="mt-2 h-4 w-32" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (!user) return null;

  const userInitials = user.email
    ?.split("@")[0]
    .split(".")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{t("account.title")}</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.User className="size-5" />
              {t("account.profile.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex h-[120px] flex-col justify-between">
            <p className="text-sm text-muted-foreground">
              {t("account.profile.description")}
            </p>
            <Button
              variant="outline"
              onClick={() => router.push(`/${locale}/app/account/profile`)}
            >
              <Icons.User className="mr-2 size-4" />
              {t("account.profile.edit")}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.LockIcon className="size-5" />
              {t("account.security.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex h-[120px] flex-col justify-between">
            <p className="text-sm text-muted-foreground">
              {t("account.security.description")}
            </p>
            <Button
              variant="outline"
              onClick={() => router.push(`/${locale}/app/account/security`)}
            >
              <Icons.LockIcon className="mr-2 size-4" />
              {t("account.security.manage")}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.Bell className="size-5" />
              {t("account.notifications.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex h-[120px] flex-col justify-between">
            <p className="text-sm text-muted-foreground">
              {t("account.notifications.description")}
            </p>
            <Button
              variant="outline"
              onClick={() =>
                router.push(`/${locale}/app/account/notifications`)
              }
            >
              <Icons.Bell className="mr-2 size-4" />
              {t("account.notifications.manage")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
