import { NextResponse } from "next/server";
import { createLedger, getLedgerBooks } from "@/app/actions/ledger";

// Create a new ledger entry (POST request)
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const newLedger = await createLedger(body);
        return NextResponse.json(newLedger, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Error creating ledger" },
            { status: 500 }
        );
    }
}

// Fetch all ledger books (GET request)
export async function GET() {
    try {
        const ledgers = await getLedgerBooks();
        return NextResponse.json(ledgers, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Error fetching ledger books" },
            { status: 500 }
        );
    }
}
