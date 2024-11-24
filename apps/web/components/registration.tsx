"use client";

import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { registerAction } from "@/actions/auth/register-action";
import { useFormWithAction } from "@/hooks/use-form-with-action";
import { Button } from "@repo/ui/button";
import { Form } from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { PasswordInput } from "./ui/password-input";
import { registerSchema } from "@/actions/auth/schema";
import { cn } from "@repo/ui/cn";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import { Alert, AlertDescription } from "@repo/ui/alert";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/form";

export const RegistrationCard = ({
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
              <div className="bg-black/50 rounded-full p-2">
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={100}
                  height={100}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <h1 className="text-2xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-r from-[#33F9FA] via-[#8F6DFE] to-[#FE87FF] text-transparent bg-clip-text">
                Squirrel
              </h1>
            </div>
          </div>
          <CardTitle className="text-center text-2xl py-4 my-4">
            {t("register.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>{content}</CardContent>
        <CardFooter>{footer}</CardFooter>
      </Card>
    </div>
  );
};

const SignInLink = ({ className }: { className?: string }) => {
  const t = useTranslations();
  return (
    <div
      className={cn(
        "flex-1 border-t px-6 py-4 text-center text-sm text-muted-foreground",
        className,
      )}
    >
      {t("register.signin.text")}{" "}
      <Link href="/login" className="font-medium">
        {t("register.signin.link")}
      </Link>
    </div>
  );
};

export function Registration() {
  const t = useTranslations();
  const { form, onSubmit } = useFormWithAction(
    registerSchema,
    registerAction as any,
    {
      defaultValues: {
        name: "",
        email: "",
        password: "",
        confirm_password: "",
      },
    },
  );

  const { formState, register } = form;
  const { isSubmitting, errors } = formState;

  return (
    <RegistrationCard
      className="hidden sm:block"
      content={
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-8">
            {errors.root?.serverError && (
              <Alert variant="destructive">
                <AlertDescription>
                  {errors.root.serverError.message}
                </AlertDescription>
              </Alert>
            )}

            <FormField
              control={form.control}
              name="name"
              render={() => (
                <FormItem>
                  <FormLabel>{t("name.label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("name.placeholder")}
                      {...register("name")}
                    />
                  </FormControl>
                  <FormDescription>{t("name.description")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={() => (
                <FormItem>
                  <FormLabel>{t("email.label")}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={t("email.placeholder")}
                      {...register("email")}
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
              render={() => (
                <FormItem>
                  <FormLabel>{t("password.label")}</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder={t("password.placeholder")}
                      {...register("password")}
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
              render={() => (
                <FormItem>
                  <FormLabel>{t("confirm_password.label")}</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder={t("confirm_password.placeholder")}
                      {...register("confirm_password")}
                    />
                  </FormControl>
                  <FormDescription>
                    {t("confirm_password.description")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? t("register.submitting") : t("register.button")}
            </Button>
          </form>
        </Form>
      }
      footer={<SignInLink />}
    />
  );
}
