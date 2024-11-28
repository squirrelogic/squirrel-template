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
import { changePasswordAction } from "@/actions/user/change-password-action";
import {
  changePasswordSchema,
  type ChangePasswordSchema,
} from "@/actions/user/schema";
import { PasswordInput } from "../ui/password-input";
import { useToast } from "@repo/ui/hooks/use-toast";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";

export function ChangePasswordForm() {
  const t = useTranslations();
  const { toast } = useToast();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { execute, isPending } = useAction(changePasswordAction, {
    onError: (error) => {
      setServerError(error.error.serverError || null);
    },
    onSuccess: () => {
      toast({
        title: t("account.security.success"),
      });
      form.reset();
    },
  });

  const onSubmit: SubmitHandler<ChangePasswordSchema> = async (data) => {
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
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("account.security.new_password")}</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder={t("account.security.new_password_placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("account.security.confirm_password")}</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder={t(
                    "account.security.confirm_password_placeholder",
                  )}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending && (
              <Icons.Loader2 className="mr-2 size-4 animate-spin" />
            )}
            {t("account.security.update_password")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
