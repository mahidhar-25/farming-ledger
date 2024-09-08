import { getLederBookData } from "@/app/actions/ledger";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { ledgerId: string } }
) {
    const { ledgerId } = params; // Extract ledgerId from the URL

    try {
        const data = await getLederBookData(ledgerId); // Pass the ledgerId to the function
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return NextResponse.json(
            { error: "Error fetching dashboard data" },
            { status: 500 }
        );
    }
}
