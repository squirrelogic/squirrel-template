"use client";

import { Button, ButtonProps } from "@repo/ui/button";
import { Icons } from "@repo/ui/icons";
import { useTranslations } from "next-intl";

interface SubmitButtonProps {
  isPending: boolean;
  loadingText?: string;
  text?: string;
  variant?: ButtonProps["variant"];
}

export const SubmitButton = ({
  isPending,
  loadingText,
  text,
  variant,
}: SubmitButtonProps) => {
  const t = useTranslations();

  return (
    <Button type="submit" disabled={isPending} variant={variant}>
      {isPending ? (
        <Icons.Loader2 className="mr-2 size-4 animate-spin" />
      ) : (
        <Icons.BadgeCheck className="mr-2 size-4" />
      )}
      {isPending
        ? (loadingText ?? t("common.saving"))
        : (text ?? t("common.save"))}
    </Button>
  );
};
