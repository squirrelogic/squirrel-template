import { Navbar } from "@/components/navbar";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <Navbar />
      <div className="flex-1 flex">{children}</div>
    </>
  );
}
