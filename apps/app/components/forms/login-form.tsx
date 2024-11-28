"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { loginSchema, type LoginSchema } from "@/actions/auth/schema";
import { loginAction } from "@/actions/auth/login-action";
import { useAction } from "next-safe-action/hooks";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Alert, AlertDescription } from "@repo/ui/alert";
import { resendConfirmationAction } from "@/actions/auth/resend-confirmation-action";

export const LoginForm = () => {
  const t = useTranslations();
  const [serverError, setServerError] = useState<string | null>(null);
  const { execute, isPending, status } = useAction(loginAction, {
    onError: (error) => {
      setServerError(error.error.serverError || null);
    },
  });

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    try {
      await execute(data);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const isEmailNotConfirmed = serverError?.includes("Email not confirmed");
  const email = form.getValues("email");

  const { execute: resendConfirmation, status: resendStatus } = useAction(
    resendConfirmationAction,
  );

  const handleResendConfirmation = async () => {
    if (email) {
      await resendConfirmation({ email });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {status === "hasErrored" && (
          <>
            <Alert variant="destructive">
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
            {isEmailNotConfirmed && (
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  {t("login.email_not_confirmed")}
                </p>
                <Button
                  variant="outline"
                  onClick={handleResendConfirmation}
                  disabled={resendStatus === "executing"}
                  type="button"
                >
                  {resendStatus === "executing"
                    ? t("login.resending_confirmation")
                    : t("login.resend_confirmation")}
                </Button>
              </div>
            )}
          </>
        )}
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
              <FormDescription>{t("email.description")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("password.label")}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t("password.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormDescription>{t("password.description")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? t("login.submitting") : t("login.title")}
        </Button>
      </form>
    </Form>
  );
};
