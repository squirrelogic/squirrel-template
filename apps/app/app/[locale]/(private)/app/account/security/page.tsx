"use client";

import { useTranslations } from "next-intl";
import { useUser } from "@/hooks/use-user";
import { Icons } from "@repo/ui/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Skeleton } from "@repo/ui/skeleton";
import { Button } from "@repo/ui/button";
import { ChangePasswordForm } from "@/components/ui/change-password-form";

export default function SecurityPage() {
  const t = useTranslations();
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          {t("account.security.title")}
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.LockIcon className="size-5" />
            {t("account.security.change_password")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.Shield className="size-5" />
            {t("account.security.two_factor")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {t("account.security.two_factor_description")}
          </p>
          <Button variant="outline" className="mt-4" disabled>
            <Icons.LockIcon className="mr-2 size-4" />
            {t("account.security.enable_two_factor")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
