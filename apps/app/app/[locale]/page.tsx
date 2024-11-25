import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { Button } from "@repo/ui/button";

type Messages = {
  greeting: string;
  welcome: string;
  login: {
    button: string;
  };
  register: {
    button: string;
  };
};

interface HomeLayoutProps {
  params: Promise<{
    locale: (typeof routing.locales)[number];
  }>;
}

export default async function Home({
  params: paramsPromise,
}: HomeLayoutProps): Promise<React.ReactElement> {
  const params = await paramsPromise;
  const { locale } = params;

  // Fetch translations server-side
  const messages = await getMessages({ locale }) as Messages;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      <h1 className="text-4xl font-bold mb-8">Welcome to Squirrel</h1>
      <div className="space-y-4">
        <h1>{messages.greeting}</h1>
        <h2>{messages.welcome}</h2>

        <Link href="/login">
          <Button className="block w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            {messages.login.button}
          </Button>
        </Link>
        <Link href="/register">
          <Button className="block w-full px-4 py-2 text-blue-500 border border-blue-500 rounded hover:bg-blue-50">
            {messages.register.button}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
