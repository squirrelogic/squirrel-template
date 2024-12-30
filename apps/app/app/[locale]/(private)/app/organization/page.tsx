import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Button } from "@repo/ui/button";
import { Icons } from "@repo/ui/icons";
import { createClient } from "@repo/supabase/server";
import Link from "next/link";
import { getUserOrganizationsAction } from "@/actions/organization/get-user-organizations-action";

// export async function generateMetadata(): Promise<Metadata> {
//   const t = await getTranslations();
//   return {
//     title: t("organization.list.title"),
//     description: t("organization.list.description"),
//   };
// }

type Organization = {
  id: string;
  name: string;
};

export default async function OrganizationsPage() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  let organizations: Organization[] = [];
  if (user.user?.id) {
    console.log("user.user?.id", user.user?.id);
    const { data: response } = await getUserOrganizationsAction({
      userId: user.user?.id,
    });
    organizations = response?.organizations || [];
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Organizations</h1>
        <Button asChild>
          <Link href="/app/organization/new">
            <Icons.Plus className="w-4 h-4 mr-2" />
            New Organization
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {organizations.map(({ role, organization: org }) => (
          <Card key={org.id}>
            <CardHeader>
              <CardTitle>{org.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">{role}</p>
                <Button variant="secondary" asChild>
                  <Link href={`/app/organization/${org.id}`}>View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {organizations.length === 0 && (
          <Card>
            <CardContent className="py-8">
              <p className="text-center text-muted-foreground">
                You don't have any organizations yet. Create one to get started.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
