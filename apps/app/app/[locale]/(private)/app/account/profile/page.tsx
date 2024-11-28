"use client";

import { useTranslations } from "next-intl";
import { useUser } from "@/hooks/use-user";
import { Button } from "@repo/ui/button";
import { Icons } from "@repo/ui/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Skeleton } from "@repo/ui/skeleton";
import { uploadAvatar } from "@/lib/upload-avatar";
import { useRef, useState, useEffect } from "react";
import { useToast } from "@repo/ui/use-toast";
import { updateUserAction } from "@/actions/user/update-user-action";
import { updateUserSchema } from "@/actions/user/schema";
import { useFormWithAction } from "@/hooks/use-form-with-action";
import { UpdateUserForm } from "@/components/forms/update-user-form";

export default function ProfilePage() {
  const t = useTranslations();
  const { user, loading } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      await uploadAvatar(file);
      toast({
        title: t("account.profile.success"),
        description: t("account.profile.success_upload"),
      });
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast({
        title: t("account.profile.error"),
        description: t("account.profile.error_upload"),
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-24 w-24 rounded-lg" />
          <div className="flex-1">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="mt-2 h-4 w-32" />
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
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
        <h1 className="text-2xl font-semibold">{t("account.profile.title")}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.User className="size-5" />
            {t("account.profile.personal_info")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24 rounded-lg">
              <AvatarImage
                src={
                  user?.profile?.avatar_url || user?.user_metadata?.avatar_url
                }
                alt={user.email ?? ""}
              />
              <AvatarFallback className="rounded-lg text-2xl">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? (
                  <Icons.Loader2 className="mr-2 size-4 animate-spin" />
                ) : (
                  <Icons.Upload className="mr-2 size-4" />
                )}
                {uploading
                  ? t("account.profile.uploading")
                  : t("account.profile.upload_avatar")}
              </Button>
            </div>
          </div>
          <UpdateUserForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.Settings2 className="size-5" />
            {t("account.profile.preferences")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {t("account.profile.preferences_description")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
