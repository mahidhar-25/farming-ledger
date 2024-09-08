import { NextResponse } from "next/server";
import { Farmer } from "@/lib/types";
import { createFramer, getFarmers } from "@/app/actions/farmer";

export async function POST(req: Request) {
    try {
        const farmerData: Farmer = await req.json();
        const farmer = await createFramer(farmerData);
        return NextResponse.json(farmer, { status: 201 });
    } catch (error) {
        console.error("Error creating farmer:", error);
        return NextResponse.json(
            { error: "Failed to create farmer" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const farmers = await getFarmers();
        return NextResponse.json(farmers, { status: 200 });
    } catch (error) {
        console.error("Error getting farmers:", error);
        return NextResponse.json(
            { error: "Failed to get farmers" },
            { status: 500 }
        );
    }
}
