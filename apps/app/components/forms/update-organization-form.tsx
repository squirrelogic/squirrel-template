"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useToast } from "@repo/ui/hooks/use-toast";
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
import { updateOrganizationAction } from "@/actions/organization/update-organization-action";
import { updateOrganizationSchema } from "@/actions/organization/schema";
interface UpdateOrganizationFormProps {
  organization: {
    id: string;
    name: string;
  };
}

export const UpdateOrganizationForm = ({
  organization,
}: UpdateOrganizationFormProps) => {
  const t = useTranslations();
  const router = useRouter();
  const { toast } = useToast();
  console.log("update-organization", organization);
  const form = useForm({
    resolver: zodResolver(updateOrganizationSchema),
    defaultValues: {
      organizationId: organization.id,
      name: organization.name,
    },
  });

  const { execute, isPending, status } = useAction(updateOrganizationAction, {
    onSuccess: () => {
      toast({
        title: t("organization.form.success"),
        description: t("organization.form.success_description"),
      });
      router.refresh();
    },
    onError: ({ error }) => {
      toast({
        title: t("organization.form.error"),
        description:
          error.serverError || t("organization.form.error_description"),
      });
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
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
          loadingText={t("organization.form.updating")}
          text={t("organization.form.update")}
        />
      </form>
    </Form>
  );
};
