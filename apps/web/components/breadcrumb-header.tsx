"use client";

import * as React from "react";
import { useParams, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/breadcrumb";
import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@repo/ui/separator";
import { SidebarTrigger } from "@repo/ui/sidebar";

export function BreadcrumbHeader() {
  const params = useParams();
  const locale = params.locale as string;
  const pathname = usePathname();
  const t = useTranslations("breadcrumbs");

  const pathSegments = pathname
    .split("/")
    .filter(Boolean)
    .slice(2) // Remove locale and app segments
    .map((segment) => ({
      name: t(segment),
      path: segment,
    }));

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mx-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${locale}/app`}>{t("app")}</BreadcrumbLink>
              </BreadcrumbItem>
              {pathSegments.length > 0 && <BreadcrumbSeparator />}
              {pathSegments.map((segment, index) => (
                <React.Fragment key={segment.path}>
                  <BreadcrumbItem>
                    {index === pathSegments.length - 1 ? (
                      <BreadcrumbPage>{segment.name}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        href={`/${locale}/app/${pathSegments
                          .slice(0, index + 1)
                          .map((s) => s.path)
                          .join("/")}`}
                      >
                        {segment.name}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {index < pathSegments.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
