import type { Metadata } from "next";
import { Suspense } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@repo/ui/sidebar";
import { fontSans } from "@/lib/fonts";
import { cn } from "@repo/ui/lib/utils";
import { BreadcrumbHeader } from "@/components/breadcrumb-header";
import { Loading } from "@/components/loading";

export const metadata: Metadata = {
  title: "Your App Name",
  description: "App description",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable,
      )}
    >
      <div className="flex min-h-screen">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="flex-1">
            <BreadcrumbHeader />
            <div className="flex flex-1 flex-col gap-4 p-4">
              <div className="flex flex-1 rounded-xl bg-muted/50 p-4 flex-col">
                <Suspense fallback={<Loading />}>
                  {children}
                </Suspense>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
}
