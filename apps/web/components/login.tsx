"use client";

import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { loginAction } from "@/actions/auth/login-action";
import { resendConfirmationAction } from "@/actions/auth/resend-confirmation-action";
import { useFormWithAction } from "@/hooks/use-form-with-action";
import { useAction } from "next-safe-action/hooks";
import { FormInputField } from "@/components/ui/form-field";
import { Button } from "@repo/ui/button";
import { Form } from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { PasswordInput } from "./ui/password-input";
import { loginSchema } from "@/actions/auth/schema";
import { cn } from "@repo/ui/cn";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import { Alert, AlertDescription } from "@repo/ui/alert";

export const LoginCard = ({
  className,
  content,
  footer,
}: {
  className?: string;
  content: ReactNode;
  footer: ReactNode;
}) => {
  const t = useTranslations();
  return (
    <div
      className={cn(
        "sm:mx-auto w-full sm:max-w-md lg:max-w-md md:max-w-md",
        className,
      )}
    >
      <Card>
        <CardHeader>
          <div className="flex-1 flex-col justify-center lg:hidden border-b">
            <div className="justify-items-center">
              <Image
                src="/logo.svg"
                alt="logo"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "15vh", height: "auto" }}
              />
              <h1 className="text-2xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-r from-[#33F9FA] via-[#8F6DFE] to-[#FE87FF] text-transparent bg-clip-text">
                SquirreLogic
              </h1>
            </div>
          </div>
          <CardTitle className="text-center text-2xl py-4 my-4">
            {t("login.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>{content}</CardContent>
        <CardFooter>{footer}</CardFooter>
      </Card>
    </div>
  );
};

const SignUpLink = ({ className }: { className?: string }) => {
  const t = useTranslations();
  return (
    <div
      className={cn(
        "flex-1 border-t px-6 py-4 text-center text-sm text-muted-foreground",
        className,
      )}
    >
      {t("login.signup.text")}{" "}
      <Link href="/register" className="font-medium">
        {t("login.signup.link")}
      </Link>
    </div>
  );
};

export function Login() {
  const t = useTranslations();
  const { form, onSubmit, status, serverError } = useFormWithAction(
    loginSchema,
    loginAction as any,
  );

  const { formState } = form;
  const { isSubmitting } = formState;
  const isEmailNotConfirmed = serverError?.includes("Email not confirmed");
  const email = form.getValues("email");

  const { execute: resendConfirmation, status: resendStatus } = useAction(resendConfirmationAction, {
    onSuccess: () => {
      // Show success message
    },
  });

  const handleResendConfirmation = async () => {
    if (email) {
      const formData = new FormData();
      formData.append('email', email);
      await resendConfirmation(formData);
    }
  };

  return (
    <LoginCard
      className="hidden sm:block"
      content={
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-8">
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

            <FormInputField
              control={form.control}
              name="email"
              label={t("email.label")}
              description={t("email.description")}
            >
              {(field) => (
                <Input
                  type="email"
                  placeholder={t("email.placeholder")}
                  {...field}
                />
              )}
            </FormInputField>

            <FormInputField
              control={form.control}
              name="password"
              label={t("password.label")}
              description={t("password.description")}
            >
              {(field) => (
                <PasswordInput
                  placeholder={t("password.placeholder")}
                  {...field}
                />
              )}
            </FormInputField>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? t("login.submitting") : t("login.title")}
            </Button>
          </form>
        </Form>
      }
      footer={<SignUpLink />}
    />
  );
}
