import { useTranslations } from "next-intl";

export default async function Home(): Promise<React.ReactElement> {
  const t = useTranslations();
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      <h1 className="text-4xl font-bold mb-8">Welcome to Squirrel</h1>
      <div className="space-y-4">
        <h1>{t("greeting")}</h1>
        <h2>{t("welcome")}</h2>
        <button className="block w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          {t("login")}
        </button>
        <button className="block w-full px-4 py-2 text-blue-500 border border-blue-500 rounded hover:bg-blue-50">
          {t("register")}
        </button>
      </div>
    </div>
  );
}
