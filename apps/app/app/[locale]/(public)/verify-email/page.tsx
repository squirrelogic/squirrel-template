import { getTranslations } from "next-intl/server";
import { ResendVerificationButton } from "./resend-button";

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: t("verify_email.title"),
    description: t("verify_email.description"),
  };
}

export default async function VerifyEmailPage() {
  const t = await getTranslations();
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {t("verify_email.title")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("verify_email.check_email")}
          </p>
        </div>

        <div className="grid gap-6">
          <ResendVerificationButton />
        </div>
      </div>
    </div>
  );
}
