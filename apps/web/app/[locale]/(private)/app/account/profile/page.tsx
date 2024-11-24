"use client";

import { useTranslations } from "next-intl";
import { useUser } from "@/hooks/use-user";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import { Icons } from "@repo/ui/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Skeleton } from "@repo/ui/skeleton";
import { uploadAvatar } from "@/lib/upload-avatar";
import { useRef, useState, useEffect } from "react";
import { createClient } from "@repo/supabase/client";
import { useToast } from "@repo/ui/use-toast";

export default function ProfilePage() {
  const t = useTranslations();
  const { user, loading } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
  });
  const { toast } = useToast();

  // Initialize form data when user data is loaded
  useEffect(() => {
    if (user?.user_metadata?.full_name) {
      setFormData({
        full_name: user.user_metadata.full_name,
      });
    }
  }, [user]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const avatarUrl = await uploadAvatar(file);
      // Force a reload to show the new avatar
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

  const handleSave = async () => {
    try {
      setSaving(true);
      const supabase = createClient();

      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: formData.full_name,
        },
      });

      if (error) throw error;

      toast({
        title: t("account.profile.success"),
        description: t("account.profile.success_save"),
      });
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: t("account.profile.error"),
        description: t("account.profile.error_save"),
        variant: "destructive",
      });
    } finally {
      setSaving(false);
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
        <Button variant="outline" onClick={handleSave} disabled={saving}>
          {saving ? (
            <Icons.Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <Icons.BadgeCheck className="mr-2 size-4" />
          )}
          {saving ? t("account.profile.saving") : t("account.profile.save")}
        </Button>
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
                src={user.user_metadata?.avatar_url}
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

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">{t("name.label")}</Label>
              <Input
                id="name"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
                placeholder={t("name.placeholder")}
              />
              <p className="text-sm text-muted-foreground">
                {t("name.description")}
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">{t("email.label")}</Label>
              <Input
                id="email"
                type="email"
                defaultValue={user.email}
                disabled
              />
              <p className="text-sm text-muted-foreground">
                {t("email.description")}
              </p>
            </div>
          </div>
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
