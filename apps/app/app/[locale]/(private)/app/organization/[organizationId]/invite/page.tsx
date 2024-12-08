import { getTranslations } from "next-intl/server";
import { InviteUserForm } from "@/components/forms/invite-user-form";
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("organization.invite.title"),
    description: t("organization.invite.description"),
  };
}

export default async function InviteUserPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const organizationId = (await searchParams).organizationId as string;
  return (
    <div className="container max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Invite User</CardTitle>
        </CardHeader>
        <CardContent>
          <InviteUserForm organizationId={organizationId} />
        </CardContent>
      </Card>
    </div>
  );
}
