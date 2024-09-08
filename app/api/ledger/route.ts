import { NextResponse } from "next/server";
import client from "@/lib/db/index";

// POST: Create a new ledger entry
export async function POST(request: Request) {
    try {
        // Parse the request body to get ledger data
        const body = await request.json();

        let {
            ledgerBookId,
            farmerId,
            name,
            phoneNo,
            village,
            acres,
            amountPerAcre,
            totalAmount,
            notes,
            saleDate,
        } = body;

        if (farmerId === "") {
            const res = await client.farmer.create({
                data: { name, phoneNo, village },
            });
            farmerId = res.id;
        }

        // Create a new ledger entry using Prisma
        const newLedgerEntry = await client.ledger.create({
            data: {
                ledgerBookId,
                farmerId,
                notesSale: notes,
                saleDate: new Date(saleDate),
                acres: parseFloat(acres),
                amountPerAcre: parseFloat(amountPerAcre),
                saleamount: parseFloat(totalAmount),
                dueAmount: parseFloat(totalAmount),
                status: "pending",
            },
        });

        // Return the newly created ledger entry
        return NextResponse.json(newLedgerEntry, { status: 201 });
    } catch (error) {
        console.error("Error creating ledger entry:", error);
        return NextResponse.json(
            { error: "Error creating ledger entry" },
            { status: 500 }
        );
    }
}

// GET: Fetch all ledger entries
export async function GET() {
    try {
        // Fetch all ledger entries from the database
        const ledgerEntries = await client.ledgerBook.findMany();

        // Return the list of ledger entries
        return NextResponse.json(ledgerEntries, { status: 200 });
    } catch (error) {
        console.error("Error fetching ledger entries:", error);
        return NextResponse.json(
            { error: "Error fetching ledger entries" },
            { status: 500 }
        );
    }
}
