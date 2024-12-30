import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { notFound } from "next/navigation";
import { UpdateOrganizationForm } from "@/components/forms/update-organization-form";
import { getOrganizationAction } from "@/actions/organization/get-organization-action";
import { GetOrganizationSchema } from "@/actions/organization/schema";
interface OrganizationPageProps {
  params: {
    organizationId: string;
  };
}

export async function generateMetadata({
  params,
}: OrganizationPageProps): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("organization.edit.title"),
    description: t("organization.edit.description"),
  };
}

export default async function OrganizationPage({
  params: { organizationId },
}: OrganizationPageProps) {
  const {
    data: { organization },
  } = await getOrganizationAction({
    organizationId,
  });

  if (!organization) {
    notFound();
  }

  return (
    <div className="container max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Organization</CardTitle>
        </CardHeader>
        <CardContent>
          <UpdateOrganizationForm organization={organization} />
        </CardContent>
      </Card>
    </div>
  );
}
