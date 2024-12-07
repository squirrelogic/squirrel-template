"use client";

import Link from "next/link";
import { Button } from "@repo/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { useEffect } from "react";

export default function PrivacyPolicy() {
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
                Privacy Policy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-muted-foreground">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
                <p>
                  SquirrelSoft ("we", "our", or "us") is committed to protecting
                  your privacy. This Privacy Policy explains how your personal
                  information is collected, used, and disclosed by SquirrelSoft.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4 text-primary">
                  Information We Collect
                </h2>
                <p>
                  We collect information you provide directly to us, such as
                  when you create an account, fill out a form, send us an email,
                  or use our services. This information may include your name,
                  email address, phone number, company name, and any other
                  information you choose to provide.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4 text-primary">
                  How We Use Your Information
                </h2>
                <p>
                  We use the information we collect to provide, maintain, and
                  improve our services, to communicate with you, and to comply
                  with legal obligations. We may also use your information to
                  send you updates about our services, promotional
                  communications, or other information that may be of interest
                  to you.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4 text-primary">
                  Information Sharing and Disclosure
                </h2>
                <p>
                  We do not sell your personal information to third parties. We
                  may share your information with service providers who perform
                  services on our behalf, or when required by law.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4 text-primary">
                  Data Security
                </h2>
                <p>
                  We implement appropriate technical and organizational measures
                  to protect the security of your personal information. However,
                  please note that no method of transmission over the Internet
                  or method of electronic storage is 100% secure.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4 text-primary">
                  Your Rights
                </h2>
                <p>
                  You have the right to access, correct, or delete your personal
                  information. You may also have the right to restrict or object
                  to certain processing of your information. To exercise these
                  rights, please contact us using the information provided
                  below.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4 text-primary">
                  Changes to This Privacy Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the "Last updated" date at the top of
                  this policy.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4 text-primary">
                  Contact Us
                </h2>
                <p>
                  If you have any questions about this Privacy Policy, please
                  contact us at:
                </p>
                <p>
                  SquirrelSoft
                  <br />
                  Email: privacy@squirrelsoft.com
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
