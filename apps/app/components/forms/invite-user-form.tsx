"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { inviteUserAction } from "@/actions/organization/invite-user-action";
import {
  inviteUserSchema,
  type InviteUserSchema,
} from "@/actions/organization/schema";
import { useToast } from "@repo/ui/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { SubmitButton } from "../ui/submit-button";

interface InviteUserFormProps {
  organizationId: string;
}

export function InviteUserForm({ organizationId }: InviteUserFormProps) {
  const t = useTranslations();
  const { toast } = useToast();

  const form = useForm<InviteUserSchema>({
    resolver: zodResolver(inviteUserSchema),
    defaultValues: {
      email: "",
      organizationId,
    },
  });

  const { execute, isPending } = useAction(inviteUserAction, {
    onSuccess: () => {
      toast({
        title: t("organization.invite.success"),
        description: t("organization.invite.success_description"),
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: t("organization.invite.error"),
        description:
          error.error.serverError || t("organization.invite.error_description"),
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("organization.invite.email_label")}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("organization.invite.email_placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <SubmitButton
            isPending={isPending}
            loadingText={t("organization.invite.sending")}
            text={t("organization.invite.submit")}
            variant="outline"
          />
        </div>
      </form>
    </Form>
  );
}
