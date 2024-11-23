"use client";

import { ReactNode, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Icons } from "@repo/ui/icons";

import { Button } from "@repo/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/form";
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

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

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
          <CardTitle className=" text-center text-2xl py-4 my-4">
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
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Here you would typically send the form data to your backend
    console.log(values);
  }

  return (
    <RegistrationCard
      className="hidden sm:block"
      content={
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    We'll never share your email with anyone else.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <Icons.EyeOff className="h-4 w-4" />
                        ) : (
                          <Icons.Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Your password must be at least 8 characters long.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
