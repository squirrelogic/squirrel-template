"use client";

import { useTranslations } from "next-intl";
import { Button } from "@repo/ui/button";
import { Icons } from "@repo/ui/icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/form";
import { Alert, AlertDescription } from "@repo/ui/alert";
import { updateUserAction } from "@/actions/user/update-user-action";
import { updateUserSchema, type UpdateUserSchema } from "@/actions/user/schema";
import { useToast } from "@repo/ui/hooks/use-toast";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { Input } from "@repo/ui/components/ui/input";
import { useUser } from "@/hooks/use-user";

export function UpdateUserForm() {
  const t = useTranslations();
  const { user, refresh } = useUser();
  const { toast } = useToast();
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      form.reset({
        full_name: user?.full_name || user.user_metadata?.full_name || "",
        email: user.email || "",
        avatar_url: user?.avatar_url || "",
      });
    }
  }, [user]);

  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      full_name: user?.full_name || user?.user_metadata?.full_name || "",
      email: user?.email || "",
      avatar_url: user?.avatar_url || "",
    },
  });

  const { execute, isPending } = useAction(updateUserAction, {
    onError: (error) => {
      setServerError(error.error.serverError || null);
    },
    onSuccess: () => {
      toast({
        title: t("account.security.success"),
      });
      form.reset();
      refresh();
    },
  });

  const onSubmit: SubmitHandler<UpdateUserSchema> = async (data) => {
    await execute(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {status === "hasErrored" && (
          <Alert variant="destructive">
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("name.label")}</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder={t("name.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("email.label")}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("email.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <Icons.Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Icons.BadgeCheck className="mr-2 size-4" />
            )}
            {isPending
              ? t("account.profile.saving")
              : t("account.profile.save")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
