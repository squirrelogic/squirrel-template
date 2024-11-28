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
import { registerSchema, type RegisterSchema } from "@/actions/auth/schema";
import { registerAction } from "@/actions/auth/register-action";
import { useAction } from "next-safe-action/hooks";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Alert, AlertDescription } from "@repo/ui/alert";
import { PasswordInput } from "../ui/password-input";

export const RegistrationForm = () => {
  const t = useTranslations();
  const [serverError, setServerError] = useState<string | null>(null);
  const { execute, isPending } = useAction(registerAction, {
    onError: (error) => {
      setServerError(error.error.serverError || null);
    },
  });

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
    try {
      await execute(data);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {serverError && (
          <Alert variant="destructive">
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("name.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("name.placeholder")} {...field} />
              </FormControl>
              <FormDescription>{t("name.description")}</FormDescription>
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
                <PasswordInput
                  placeholder={t("password.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormDescription>{t("password.description")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("confirm_password.label")}</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder={t("confirm_password.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {t("confirm_password.description")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? t("register.submitting") : t("register.button")}
        </Button>
      </form>
    </Form>
  );
};
