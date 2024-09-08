"use client";
import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardCard from "./DashboardCard";
import { getDashboardData } from "@/app/actions/ledger";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLedgerStore } from "@/store/ledger";

interface DashBoardInfo {
    dueAmount: number;
    recievedAmount: number;
    saleAmount: number;
    acres: number;
}
export default function DashBoard() {
    const router = useRouter();
    const pathname = usePathname();
    const [ledgerId, setLedgerId] = useState<string | null>(null);
    const [dashboardData, setDashboardData] = useState<DashBoardInfo>({
        dueAmount: 0,
        recievedAmount: 0,
        saleAmount: 0,
        acres: 0,
    });

    // Extract ledgerId from the URL
    const updateLedgerId = () => {
        const path = window.location.pathname; // Get the current path

        const segments = path.split("/"); // Split the path into segments
        const id = segments[segments.length - 1]; // Assuming the last segment is ledgerId
        setLedgerId(id); // Set ledgerId state
        useLedgerStore.getState().setLedgerId(id);
    };

    useEffect(() => {
        const getDashboardData = async () => {
            await updateLedgerId();

            if (ledgerId) {
                try {
                    const response = await axios.get(
                        `/api/dashboard/${ledgerId}`
                    );
                    const data = await response.data._sum;
                    console.log(data);
                    if (
                        data.dueAmount !== null &&
                        data.recievedAmount !== null &&
                        data.saleAmount !== null &&
                        data.acres !== null
                    ) {
                        setDashboardData({
                            dueAmount: data.dueAmount || 0,
                            recievedAmount: data.recievedAmount || 0,
                            saleAmount: data.saleamount || 0,
                            acres: data.acres || 0,
                        });
                    }
                } catch (error) {
                    console.error("Error fetching dashboard data:", error);
                }
            }
        };
        getDashboardData();
    }, [ledgerId, pathname]);

    return (
        <div>
            <DashboardCard
                title="Total amount due"
                value={dashboardData.dueAmount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "INR",
                })}
                routePath="/duedata"
                textcolor="text-red-500"
            />
            <DashboardCard
                title="Total amount recived"
                value={dashboardData.recievedAmount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "INR",
                })}
                routePath="/duedata"
                textcolor="text-green-500"
            />
            <DashboardCard
                title="Total amount sale"
                value={dashboardData.saleAmount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "INR",
                })}
                routePath="/duedata"
                textcolor="text-blue-500"
            />
            <DashboardCard
                title="Total acres "
                value={dashboardData.acres.toLocaleString("en-US")}
                routePath="/duedata"
                textcolor="text-yellow-500"
            />
        </div>
    );
}
