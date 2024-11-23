"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { useFormWithAction } from "../hooks/use-form-with-action";
import { registerSchema } from "@/actions/auth/schema";
import { registerAction } from "@/actions/auth/register-action";

import { Button } from "@repo/ui/button";
import { Form } from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { cn } from "@repo/ui/cn";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import Link from "next/link";
import { FormInputField } from "./ui/form-field";
import { PasswordInput } from "./ui/password-input";

export const RegistrationCard = ({
  className,
  content,
  footer,
}: {
  className?: string;
  content: ReactNode;
  footer: ReactNode;
}) => {
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
            Create an account
          </CardTitle>
        </CardHeader>
        <CardContent>{content}</CardContent>
        <CardFooter>{footer}</CardFooter>
      </Card>
    </div>
  );
};

const SignInLink = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex-1 border-t px-6 py-4 text-center text-sm text-muted-foreground",
        className,
      )}
    >
      Already have an account?{" "}
      <Link href="/login" className="font-medium">
        Sign in
      </Link>
    </div>
  );
};

export function Registration() {
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

  return (
    <RegistrationCard
      className="hidden sm:block"
      content={
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-8">
            <FormInputField
              control={form.control}
              name="name"
              label="Name"
              description="This is your public display name."
            >
              {(field) => <Input placeholder="John Doe" {...field} />}
            </FormInputField>

            <FormInputField
              control={form.control}
              name="email"
              label="Email"
              description="We'll never share your email with anyone else."
            >
              {(field) => (
                <Input type="email" placeholder="john@example.com" {...field} />
              )}
            </FormInputField>

            <FormInputField
              control={form.control}
              name="password"
              label="Password"
              description="Your password must be at least 12 characters long."
            >
              {(field) => <PasswordInput placeholder="••••••••" {...field} />}
            </FormInputField>

            <FormInputField
              control={form.control}
              name="confirm_password"
              label="Confirm Password"
              description="Please confirm your password."
            >
              {(field) => <PasswordInput placeholder="••••••••" {...field} />}
            </FormInputField>

            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </Form>
      }
      footer={<SignInLink />}
    />
  );
}
