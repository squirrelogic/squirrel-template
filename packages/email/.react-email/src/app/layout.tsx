import '../styles/globals.css';
import classnames from 'classnames';
import { Inter } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps): React.ReactElement {
  return (
    <html lang="en">
      <body className="bg-black text-slate-12 font-sans">
        <div className={classnames(inter.variable, 'font-sans')}>
          {children}
        </div>
      </body>
    </html>
  );
}
