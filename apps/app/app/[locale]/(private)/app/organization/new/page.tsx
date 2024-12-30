import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { CreateOrganizationForm } from "@/components/forms/create-organization-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("organization.create.title"),
    description: t("organization.create.description"),
  };
}

export default function CreateOrganizationPage() {
  return (
    <div className="container max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create Organization</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateOrganizationForm />
        </CardContent>
      </Card>
    </div>
  );
}
