export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <header className="p-4 border-b">
          <nav className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="text-xl font-bold">Squirrel</div>
          </nav>
        </header>
        <main className="max-w-7xl mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
