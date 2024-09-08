import { NextResponse } from "next/server";
import client from "@/lib/db/index";
// Update the getDashboardData to accept ledgerId parameter
export async function GET(
    request: Request,
    { params }: { params: { farmerId: string; ledgerId: string } }
) {
    const { farmerId, ledgerId } = params; // Extract ledgerId from the URL

    try {
        // Pass the ledgerId to the function

        const farmerData = await client.ledger.findMany({
            where: {
                farmerId,
                ledgerBookId: ledgerId,
            },
        });

        return NextResponse.json(farmerData, { status: 200 });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return NextResponse.json(
            { error: "Error fetching dashboard data" },
            { status: 500 }
        );
    }
}
