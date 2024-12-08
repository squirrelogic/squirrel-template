"use client";

import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { resendVerificationEmailAction } from "@/actions/auth/resend-verification-email-action";
import { Button } from "@repo/ui/button";
import { useToast } from "@repo/ui/hooks/use-toast";

export function ResendVerificationButton() {
  const t = useTranslations();
  const { toast } = useToast();

  const { execute, isPending } = useAction(resendVerificationEmailAction, {
    onSuccess: () => {
      toast({
        title: t("verify_email.resend.success"),
        description: t("verify_email.resend.success_description"),
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: t("verify_email.resend.error"),
        description:
          error.error.serverError || t("verify_email.resend.error_description"),
      });
    },
  });

  return (
    <Button
      variant="outline"
      disabled={isPending}
      onClick={() => execute({ email: "" })}
    >
      {isPending
        ? t("verify_email.resend.sending")
        : t("verify_email.resend.button")}
    </Button>
  );
}
