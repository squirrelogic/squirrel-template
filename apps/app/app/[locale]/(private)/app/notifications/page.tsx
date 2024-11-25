"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/dropdown-menu";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Icons } from "@repo/ui/icons";
import { Badge } from "@repo/ui/badge";
import { formatDistanceToNow } from "date-fns";

type Notification = {
  id: string;
  type: "info" | "success" | "warning" | "error";
  message: string;
  date: Date;
  read: boolean;
};

// Mock notifications data - replace with real data fetching
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "info",
    message: "Your profile was updated successfully",
    date: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    read: false,
  },
  {
    id: "2",
    type: "success",
    message: "Project 'My Project' was created",
    date: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    read: true,
  },
  {
    id: "3",
    type: "warning",
    message: "Your storage is almost full",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
  },
  {
    id: "4",
    type: "error",
    message: "Failed to sync your files",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
  },
];

export default function NotificationsPage() {
  const t = useTranslations("account.notifications");
  const [notifications, setNotifications] = React.useState(mockNotifications);
  const [filter, setFilter] = React.useState("all");
  const [search, setSearch] = React.useState("");

  const filteredNotifications = React.useMemo(() => {
    return notifications
      .filter((notification) => {
        if (filter === "unread") return !notification.read;
        if (filter === "read") return notification.read;
        return true;
      })
      .filter((notification) =>
        notification.message.toLowerCase().includes(search.toLowerCase())
      );
  }, [notifications, filter, search]);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getTypeIcon = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return <Icons.Info className="h-4 w-4 text-blue-500" />;
      case "success":
        return <Icons.CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <Icons.AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <Icons.AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("history.title")}</CardTitle>
        <CardDescription>{t("history.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Input
              placeholder={t("history.search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[300px]"
            />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder={t("history.filter.placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("history.filter.all")}</SelectItem>
                <SelectItem value="unread">{t("history.filter.unread")}</SelectItem>
                <SelectItem value="read">{t("history.filter.read")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="outline"
            onClick={markAllAsRead}
            disabled={!notifications.some((n) => !n.read)}
          >
            {t("history.actions.mark_all_read")}
          </Button>
        </div>

        {filteredNotifications.length === 0 ? (
          <div className="flex h-[200px] items-center justify-center text-muted-foreground">
            {t("history.empty")}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("history.table.type")}</TableHead>
                <TableHead>{t("history.table.message")}</TableHead>
                <TableHead>{t("history.table.date")}</TableHead>
                <TableHead>{t("history.table.status")}</TableHead>
                <TableHead className="w-[100px]">{t("history.table.actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNotifications.map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell>{getTypeIcon(notification.type)}</TableCell>
                  <TableCell>{notification.message}</TableCell>
                  <TableCell>
                    {formatDistanceToNow(notification.date, { addSuffix: true })}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={notification.read ? "outline" : "default"}
                      className={notification.read ? "opacity-50" : ""}
                    >
                      {notification.read
                        ? t("history.status.read")
                        : t("history.status.unread")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Icons.MoreVertical className="h-4 w-4" />
                          <span className="sr-only">{t("history.table.actions")}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {!notification.read && (
                          <DropdownMenuItem
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Icons.Check className="mr-2 h-4 w-4" />
                            {t("history.actions.mark_read")}
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <Icons.Trash className="mr-2 h-4 w-4" />
                          {t("history.actions.delete")}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
