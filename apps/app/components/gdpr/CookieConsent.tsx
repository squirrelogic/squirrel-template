"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export function CookieConsent() {
  const t = useTranslations("cookies");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({ analytics: true }));
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({ analytics: false }),
    );
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background shadow-lg p-4 border-t border-border z-[100]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">{t("message")}</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleReject}
              className="px-4 py-2 text-sm font-medium bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90"
            >
              {t("reject")}
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              {t("accept")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
