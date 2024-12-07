"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Switch } from "@repo/ui/switch";
import { Button } from "@repo/ui/button";
import { Icons } from "@repo/ui/icons";
import { useToast } from "@repo/ui/use-toast";
import { useAction } from "next-safe-action/hooks";
import {
  selectGdprSettingsAction,
  updateGdprSettingsAction,
} from "@/actions/gdpr/gdpr-settings-action";
import {
  gdprSettingsSchema,
  GdprSettingsSchema,
} from "@/actions/gdpr/gdpr-settings-schema";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/form";
import { Alert, AlertDescription } from "@repo/ui/components/ui/alert";
import { useUser } from "@/hooks/use-user";
import { SubmitButton } from "../ui/submit-button";

export default function GdprSettingsForm() {
  const { user } = useUser();
  const userId = user?.id;
  const t = useTranslations("account.gdpr");
  const { toast } = useToast();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<GdprSettingsSchema>({
    resolver: zodResolver(gdprSettingsSchema),
    defaultValues: {
      analytics_improvements: false,
      essential_data_collection: true,
    },
  });

  const { execute: fetchSettings } = useAction(selectGdprSettingsAction, {
    onSuccess: ({ data }) => {
      form.reset(data);
    },
    onError: (error) => {
      setServerError(error.error.serverError || null);
    },
  });

  const { execute: saveSettings, isPending } = useAction(
    updateGdprSettingsAction,
    {
      onSuccess: () => {
        toast({
          title: t("consent.saved"),
          description: new Date().toLocaleString(),
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to save preferences",
          variant: "destructive",
        });
      },
    },
  );

  useEffect(() => {
    if (userId) {
      fetchSettings({ user_id: userId });
    }
  }, [userId]);

  const onSubmit: SubmitHandler<GdprSettingsSchema> = async (data) => {
    try {
      await saveSettings(data);
    } catch (error) {
      console.error("Error saving GDPR settings:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {serverError && (
          <Alert variant="destructive">
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        )}

        {/* Essential Data Collection - Always enabled */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium">
              {t("data_collection.essential")}
            </h3>
            <p className="text-sm text-gray-500">
              {t("data_collection.essential_description")}
            </p>
          </div>
          {/* Essentials Toggle */}
          <FormField
            control={form.control}
            name="essential_data_collection"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Switch
                    checked={field.value}
                    disabled={true}
                    onCheckedChange={field.onChange}
                    className={`${
                      field.value ? "bg-blue-600" : "bg-gray-200"
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Analytics Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium">
              {t("data_collection.analytics")}
            </h3>
            <p className="text-sm text-gray-500">
              {t("data_collection.analytics_description")}
            </p>
          </div>
          <FormField
            control={form.control}
            name="analytics_improvements"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className={`${
                      field.value ? "bg-blue-600" : "bg-gray-200"
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span
                      className={`${
                        field.value ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Analytics Toggle */}

        <div className="flex justify-end">
          <SubmitButton
            isPending={isPending}
            loadingText={t("consent.saving")}
            text={t("consent.save")}
            variant="outline"
          />
        </div>
      </form>
    </Form>
  );
}
