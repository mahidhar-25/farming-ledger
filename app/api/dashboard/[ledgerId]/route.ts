import { NextResponse } from "next/server";
import { getDashboardData } from "@/app/actions/ledger"; // Adjust path if necessary

// Update the getDashboardData to accept ledgerId parameter
export async function GET(
    request: Request,
    { params }: { params: { ledgerId: string } }
) {
    const { ledgerId } = params; // Extract ledgerId from the URL

    try {
        const dashboardData = await getDashboardData(ledgerId); // Pass the ledgerId to the function
        return NextResponse.json(dashboardData, { status: 200 });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return NextResponse.json(
            { error: "Error fetching dashboard data" },
            { status: 500 }
        );
    }
}
