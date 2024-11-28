"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { cn } from "@repo/ui/cn";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import { RegistrationForm } from "./forms/registration-form";

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
  return (
    <RegistrationCard
      className="hidden sm:block"
      content={<RegistrationForm />}
      footer={<SignInLink />}
    />
  );
}
