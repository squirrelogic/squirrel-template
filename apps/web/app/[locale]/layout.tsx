import "@/globals.css";
import { Inter } from "next/font/google";
import { metadata } from "@/app/metadata";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              function getInitialTheme() {
                const savedTheme = localStorage.getItem('theme')
                if (savedTheme === 'light' || savedTheme === 'dark') {
                  return savedTheme
                }
                return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
              }
              document.documentElement.classList.add(getInitialTheme())
            })()
          `,
          }}
        />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
