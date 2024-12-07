import Link from "next/link";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <div className="flex items-center space-x-2">
              <div className="bg-black/50 rounded-lg p-2">
                <Image src="/logo.png" alt="logo" width={40} height={40} />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#33F9FA] via-[#8F6DFE] to-[#FE87FF] text-transparent bg-clip-text">
                Squirrel
              </h2>
            </div>
            <p className="text-secondary-foreground/60">
              A powerful monorepo template using Turborepo, Next.js, Supabase,
              and more.
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#portfolio"
                  className="text-secondary-foreground/60 hover:text-secondary-foreground"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-secondary-foreground/60 hover:text-secondary-foreground"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-secondary-foreground/60 hover:text-secondary-foreground"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-secondary-foreground/60 hover:text-secondary-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-secondary-foreground/60 hover:text-secondary-foreground"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-secondary-foreground/10 text-center">
          <p className="text-secondary-foreground/60">
            &copy; {new Date().getFullYear()} Squirrel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
