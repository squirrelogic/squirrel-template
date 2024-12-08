import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import { Button } from "@repo/ui/button";
import { Icons } from "@repo/ui/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/table";
import { Badge } from "@repo/ui/badge";
import { getTranslations } from "next-intl/server";

// Mock data for billing history
const billingHistory = [
  {
    id: "1",
    date: "2024-02-01",
    description: "Pro Plan - Monthly",
    amount: "$19.99",
    status: "paid",
  },
  {
    id: "2",
    date: "2024-01-01",
    description: "Pro Plan - Monthly",
    amount: "$19.99",
    status: "paid",
  },
  {
    id: "3",
    date: "2023-12-01",
    description: "Pro Plan - Monthly",
    amount: "$19.99",
    status: "paid",
  },
];

export default async function BillingPage() {
  const t = await getTranslations();

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle>{t("current_plan.title")}</CardTitle>
          <CardDescription>{t("current_plan.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Pro Plan</h3>
              <p className="text-sm text-muted-foreground">
                {t("current_plan.billing_period")}
              </p>
            </div>
            <Button variant="outline">{t("current_plan.change_plan")}</Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>{t("payment_method.title")}</CardTitle>
          <CardDescription>{t("payment_method.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Icons.CreditCard className="h-6 w-6" />
            <div>
              <p className="font-medium">•••• •••• •••• 4242</p>
              <p className="text-sm text-muted-foreground">
                {t("payment_method.expires")} 12/2024
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline">{t("payment_method.update")}</Button>
        </CardFooter>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>{t("history.title")}</CardTitle>
          <CardDescription>{t("history.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("history.table.date")}</TableHead>
                <TableHead>{t("history.table.description")}</TableHead>
                <TableHead>{t("history.table.amount")}</TableHead>
                <TableHead>{t("history.table.status")}</TableHead>
                <TableHead className="text-right">
                  {t("history.table.actions")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billingHistory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      {t("history.table.download")}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
