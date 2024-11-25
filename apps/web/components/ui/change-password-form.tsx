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
import { useFormWithAction } from "@/hooks/use-form-with-action";
import { changePasswordAction } from "@/actions/user/change-password-action";
import { changePasswordSchema } from "@/actions/user/schema";
import { PasswordInput } from "./ui/password-input";
import { useToast } from "@repo/ui/hooks/use-toast";
import { useState } from "react";

export function ChangePasswordForm() {
  const t = useTranslations();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const { form, onSubmit, serverError } = useFormWithAction(
    changePasswordSchema,
    changePasswordAction as any,
    {
      onSubmit: () => {
        setSubmitting(true);
      },
      onSuccess: () => {
        toast({
          title: t("account.security.success"),
        });
        setSubmitting(false);
      },
      defaultValues: {
        newPassword: "",
        confirmPassword: "",
      },
    },
  );

  const { formState } = form;
  const { errors } = formState;

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        {(errors.root?.serverError || serverError) && (
          <Alert variant="destructive">
            <AlertDescription>
              {errors.root?.serverError?.message || serverError}
            </AlertDescription>
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
          <Button type="submit" disabled={submitting}>
            {submitting && (
              <Icons.Loader2 className="mr-2 size-4 animate-spin" />
            )}
            {t("account.security.update_password")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
