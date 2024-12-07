"use client";

import Link from "next/link";
import { Button } from "@repo/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { useEffect } from "react";

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <div className="container mx-auto px-4 py-8">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                Terms of Service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-muted-foreground">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
                <p>
                  Please read these Terms of Service ("Terms", "Terms of
                  Service") carefully before using the SquirrelSoft website or
                  any services provided by SquirrelSoft ("we", "us", or "our").
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4 text-primary">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing or using our services, you agree to be bound by
                  these Terms. If you disagree with any part of the terms, then
                  you may not access our services.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4 text-primary">
                  2. Description of Services
                </h2>
                <p>
                  SquirrelSoft provides software development services, including
                  but not limited to SaaS applications, website development, CRM
                  solutions, mobile applications, and game development.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4 text-primary">
                  3. User Responsibilities
                </h2>
                <p>
                  You are responsible for maintaining the confidentiality of
                  your account and password. You agree to accept responsibility
                  for all activities that occur under your account or password.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4 text-primary">
                  4. Intellectual Property
                </h2>
                <p>
                  The content, features, and functionality of our services are
                  owned by SquirrelSoft and are protected by international
                  copyright, trademark, patent, trade secret, and other
                  intellectual property laws.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4 text-primary">
                  5. Limitation of Liability
                </h2>
                <p>
                  In no event shall SquirrelSoft, nor its directors, employees,
                  partners, agents, suppliers, or affiliates, be liable for any
                  indirect, incidental, special, consequential or punitive
                  damages, including without limitation, loss of profits, data,
                  use, goodwill, or other intangible losses, resulting from your
                  access to or use of or inability to access or use the
                  services.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4 text-primary">
                  6. Governing Law
                </h2>
                <p>
                  These Terms shall be governed and construed in accordance with
                  the laws of California, United States, without regard to its
                  conflict of law provisions.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4 text-primary">
                  7. Changes to Terms
                </h2>
                <p>
                  We reserve the right, at our sole discretion, to modify or
                  replace these Terms at any time. We will provide notice of any
                  significant changes by posting the new Terms on this page.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4 text-primary">
                  8. Contact Us
                </h2>
                <p>
                  If you have any questions about these Terms, please contact us
                  at:
                </p>
                <p>
                  SquirrelSoft
                  <br />
                  Email: legal@squirrelsoft.com
                  <br />
                  Address: 123 Tech Lane, Silicon Valley, CA 94000
                </p>
              </div>
              <div className="mt-8">
                <Button asChild>
                  <Link href="/">Return to Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
