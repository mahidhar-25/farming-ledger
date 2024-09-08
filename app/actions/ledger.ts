"use server";

import client from "@/lib/db/index";
import { revalidatePath } from "next/cache"; // Optional if you want to revalidate pages
import { LedgerBook } from "@/lib/types/index";
import { useLedgerStore } from "@/store/ledger";

export async function createLedger(ledgerbook: LedgerBook) {
    try {
        const newLedger = await client.ledgerBook.create({
            data: ledgerbook,
        });

        // Optionally revalidate the path (if necessary)
        revalidatePath("/"); // Revalidate the homepage or another relevant page

        return newLedger;
    } catch (error) {
        console.error("Error creating ledger:", error);
        throw new Error("Error creating ledger");
    }
}

export async function getLedgerBooks() {
    try {
        const ledgers = await client.ledgerBook.findMany({
            select: {
                id: true, // Include the fields you want
                name: true,
                perAcreAmount: true,
            },
        });
        return ledgers;
    } catch (error) {
        console.error("Error creating ledger:", error);
        return [];
    }
}

export async function getDashboardData(ledgerId: string) {
    try {
        const dashboardData = await client.ledger.aggregate({
            where: {
                ledgerBookId: ledgerId,
            },
            _sum: {
                dueAmount: true,
                acres: true,
                reciveAmount: true,
                saleamount: true,
            },
        });
        console.log("Dashboard data:", dashboardData);
        return dashboardData;
    } catch (error) {
        console.error("Error creating ledger:", error);
        return [];
    }
}

export async function getLederBookData(ledgerId: string) {
    try {
        const ledgerInfo = await client.ledgerBook.findUnique({
            where: {
                id: ledgerId,
            },
        });
        console.log("Dashboard data:", ledgerInfo);
        return ledgerInfo;
    } catch (error) {
        console.error("Error creating ledger:", error);
        return null;
    }
}
