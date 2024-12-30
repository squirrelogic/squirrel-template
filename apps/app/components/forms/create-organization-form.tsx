"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useToast } from "@repo/ui/use-toast";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";
import { createOrganizationAction } from "@/actions/organization/create-organization-action";
import { createOrganizationSchema } from "@/actions/organization/schema";
import { useUser } from "@/hooks/use-user";
import { useEffect } from "react";

export const CreateOrganizationForm = () => {
  const { user } = useUser();
  const t = useTranslations();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      userId: user?.id || "",
      name: "",
    },
  });

  const { execute, isPending, status } = useAction(createOrganizationAction, {
    onSuccess: ({ data: organization }) => {
      toast({
        title: t("organization.form.success"),
        description: t("organization.form.success_description"),
      });
      router.push(`/app/organization/${organization?.organization?.id}`);
    },
    onError: ({ error }) => {
      console.log("error", error);
      toast({
        title: t("organization.form.error"),
        description:
          error.serverError || t("organization.form.error_description"),
      });
    },
  });

  useEffect(() => {
    console.log("user", user);
    form.setValue("userId", user?.id || "");
  }, [user]);

  const onSubmit = form.handleSubmit(async (data) => {
    console.log("submitting", data);
    await execute(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("organization.form.name")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("organization.form.name_placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton
          isPending={isPending}
          loadingText={t("organization.form.creating")}
          text={t("organization.form.create")}
        />
      </form>
    </Form>
  );
};
