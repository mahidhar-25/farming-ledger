import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardCard from "./DashboardCard";

export default function DashBoard() {
    return (
        <div>
            <DashboardCard title="Total amount due" value="$10000" />
            <DashboardCard title="Total amount recived" value="$12000" />
            <DashboardCard title="Total amount sale" value="$20000" />
            <DashboardCard title="Total acres " value="4.5" />
        </div>
    );
}
