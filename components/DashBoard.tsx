import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardCard from "./DashboardCard";

export default function DashBoard() {
    const data = {
        due_amount: 10000,
        recieved_amount: 12000,
        sale_amount: 20000,
        acres_count: 5.6,
    };
    return (
        <div>
            <DashboardCard
                title="Total amount due"
                value={data.due_amount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "INR",
                })}
                routePath="/duedata"
                textcolor="text-red-500"
            />
            <DashboardCard
                title="Total amount recived"
                value={data.recieved_amount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "INR",
                })}
                routePath="/duedata"
                textcolor="text-green-500"
            />
            <DashboardCard
                title="Total amount sale"
                value={data.sale_amount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "INR",
                })}
                routePath="/duedata"
                textcolor="text-blue-500"
            />
            <DashboardCard
                title="Total acres "
                value={data.acres_count.toLocaleString("en-US")}
                routePath="/duedata"
                textcolor="text-yellow-500"
            />
        </div>
    );
}
