"use client";

import { useTranslations } from "next-intl";
import GDPRSettings from "@/components/gdpr/GDPRSettings";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

export default function PrivacyPage() {
  const t = useTranslations("account");

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t("gdpr.title")}</h3>
        <p className="text-sm text-muted-foreground">
          {t("gdpr.description")}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("gdpr.data_collection.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <GDPRSettings />
        </CardContent>
      </Card>
    </div>
  );
}
