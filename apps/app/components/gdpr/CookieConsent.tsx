"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export function CookieConsent() {
  const t = useTranslations("cookies");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({ analytics: true }));
    setIsVisible(false);
    // TODO: Enable analytics tracking
  };

  const handleReject = () => {
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({ analytics: false }),
    );
    setIsVisible(false);
    // TODO: Disable analytics tracking
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 border-t z-[100]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-gray-700">{t("message")}</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleReject}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              {t("reject")}
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {t("accept")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
