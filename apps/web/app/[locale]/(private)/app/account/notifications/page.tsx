"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Icons } from "@repo/ui/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/tabs";
import { Switch } from "@repo/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/table";
import { Label } from "@repo/ui/label";

// Sample notification history data
const notificationHistory = [
  {
    type: "Security",
    message: "Password changed successfully",
    date: "2024-02-20T10:00:00",
    status: "Read",
  },
  {
    type: "Update",
    message: "New feature: Dark mode is now available",
    date: "2024-02-19T15:30:00",
    status: "Unread",
  },
  {
    type: "Marketing",
    message: "Special offer: Upgrade to Pro",
    date: "2024-02-18T09:15:00",
    status: "Read",
  },
];

export default function NotificationsPage() {
  const t = useTranslations();

  const NotificationToggle = ({
    title,
    description,
    checked = false,
  }: {
    title: string;
    description: string;
    checked?: boolean;
  }) => (
    <div className="flex items-center justify-between space-x-2">
      <div className="space-y-0.5">
        <Label>{title}</Label>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{t("notifications.title")}</h1>
      </div>

      <Tabs defaultValue="email" className="space-y-4">
        <TabsList>
          <TabsTrigger value="email">
            {t("notifications.preferences.email.title")}
          </TabsTrigger>
          <TabsTrigger value="push">
            {t("notifications.preferences.push.title")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icons.Mail className="size-5" />
                {t("notifications.preferences.email.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <NotificationToggle
                title={t("notifications.preferences.email.marketing")}
                description={t(
                  "notifications.preferences.email.marketing_description",
                )}
                checked={true}
              />
              <NotificationToggle
                title={t("notifications.preferences.email.security")}
                description={t(
                  "notifications.preferences.email.security_description",
                )}
                checked={true}
              />
              <NotificationToggle
                title={t("notifications.preferences.email.updates")}
                description={t(
                  "notifications.preferences.email.updates_description",
                )}
                checked={false}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="push" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icons.Bell className="size-5" />
                {t("notifications.preferences.push.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <NotificationToggle
                title={t("notifications.preferences.push.comments")}
                description={t(
                  "notifications.preferences.push.comments_description",
                )}
                checked={true}
              />
              <NotificationToggle
                title={t("notifications.preferences.push.activity")}
                description={t(
                  "notifications.preferences.push.activity_description",
                )}
                checked={true}
              />
              <NotificationToggle
                title={t("notifications.preferences.push.news")}
                description={t(
                  "notifications.preferences.push.news_description",
                )}
                checked={false}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.HistoryIcon className="size-5" />
            {t("notifications.history.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("notifications.history.table.type")}</TableHead>
                <TableHead className="max-w-[500px]">
                  {t("notifications.history.table.message")}
                </TableHead>
                <TableHead>{t("notifications.history.table.date")}</TableHead>
                <TableHead>{t("notifications.history.table.status")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notificationHistory.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground"
                  >
                    {t("notifications.history.empty")}
                  </TableCell>
                </TableRow>
              ) : (
                notificationHistory.map((notification, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {notification.type}
                    </TableCell>
                    <TableCell className="max-w-[500px]">
                      {notification.message}
                    </TableCell>
                    <TableCell>
                      {new Date(notification.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{notification.status}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
