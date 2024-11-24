"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Icons } from "@repo/ui/icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/form";
import { useToast } from "@repo/ui/use-toast";
import { createClient } from "@repo/supabase/client";

const passwordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

interface ChangePasswordFormProps {
  userEmail: string;
}

export function ChangePasswordForm({ userEmail }: ChangePasswordFormProps) {
  const t = useTranslations();
  const { toast } = useToast();

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { formState } = form;
  const { isSubmitting } = formState;

  const onSubmit = async (data: PasswordFormValues) => {
    try {
      const supabase = createClient();

      // Update the password
      const { error: updateError } = await supabase.auth.updateUser({
        password: data.newPassword,
      });

      if (updateError) throw updateError;

      toast({
        title: t("account.security.success"),
        description: t("account.security.password_updated"),
      });

      form.reset();
    } catch (error) {
      console.error("Error updating password:", error);
      toast({
        variant: "destructive",
        title: t("account.security.error"),
        description: t("account.security.update_failed"),
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("account.security.new_password")}</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
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
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Icons.Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <Icons.Save className="mr-2 size-4" />
          )}
          {isSubmitting
            ? t("account.security.updating")
            : t("account.security.update_password")}
        </Button>
      </form>
    </Form>
  );
}
