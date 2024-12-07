import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-8 px-4 md:px-6 lg:px-8 bg-gray-100/30">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} SquirrelSoft, LLC. All rights reserved.</p>
        </div>
        <nav className="flex space-x-4">
          <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
          <Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link>
        </nav>
      </div>
    </footer>
  )
}

