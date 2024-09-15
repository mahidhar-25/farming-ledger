import { getFarmersDetailsByLedgerId } from "@/app/actions/farmer";
import client from "@/lib/db/index";
import { NextResponse } from "next/server";
export async function GET(
    request: Request,
    { params }: { params: { ledgerId: string } }
) {
    const { ledgerId } = params; // Extract ledgerId from the URL

    try {
        // Pass the ledgerId to the function

        const farmerData = await getFarmersDetailsByLedgerId(ledgerId);
        console.log(farmerData);
        return NextResponse.json(farmerData, { status: 200 });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return NextResponse.json(
            { error: "Error fetching dashboard data" },
            { status: 500 }
        );
    }
}
