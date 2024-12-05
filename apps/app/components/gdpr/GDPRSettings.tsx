import { useTranslations } from "next-intl";
import GdprSettingsForm from "./GdprSettingsForm";

export default function GDPRSettings() {
  const t = useTranslations("account.gdpr");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">{t("title")}</h2>
        <p className="mt-1 text-sm text-gray-500">{t("description")}</p>
      </div>

      <div className="space-y-4">
        <GdprSettingsForm />
      </div>
    </div>
  );
}
