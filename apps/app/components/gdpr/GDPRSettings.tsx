import { useState } from "react";
import { useTranslations } from "next-intl";
import { Switch } from "@repo/ui/switch";
import { Button } from "@repo/ui/button";
import { Icons } from "@repo/ui/icons";
import { useToast } from "@repo/ui/use-toast";

export default function GDPRSettings() {
  const t = useTranslations("account.gdpr");
  const { toast } = useToast();
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleAnalyticsChange = (enabled: boolean) => {
    setAnalyticsEnabled(enabled);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Implement API call to save preferences
      // await updateGDPRPreferences({ analytics: analyticsEnabled });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: t("consent.saved"),
        description: new Date().toLocaleString(),
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save preferences",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">{t("title")}</h2>
        <p className="mt-1 text-sm text-gray-500">{t("description")}</p>
      </div>

      <div className="space-y-4">
        {/* Essential Data Collection - Always enabled */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium">
              {t("data_collection.essential")}
            </h3>
            <p className="text-sm text-gray-500">
              {t("data_collection.essential_description")}
            </p>
          </div>
          <Switch
            checked={true}
            disabled={true}
            className={`bg-blue-600 relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="translate-x-6 inline-block h-4 w-4 rounded-full bg-white" />
          </Switch>
        </div>

        {/* Analytics Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium">
              {t("data_collection.analytics")}
            </h3>
            <p className="text-sm text-gray-500">
              {t("data_collection.analytics_description")}
            </p>
          </div>
          <Switch
            checked={analyticsEnabled}
            onChange={handleAnalyticsChange}
            className={`${
              analyticsEnabled ? "bg-blue-600" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span
              className={`${
                analyticsEnabled ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving && <Icons.Spinner className="mr-2 size-4 animate-spin" />}
          {t("consent.save")}
        </Button>
      </div>
    </div>
  );
}
