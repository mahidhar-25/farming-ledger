import { NextResponse } from "next/server";
import client from "@/lib/db/index";
import { ReceiveData } from "@/lib/types";
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

export async function POST(
    req: Request,
    { params }: { params: { farmerId: string; ledgerId: string } }
) {
    const { farmerId, ledgerId } = params;

    try {
        const requestData = await req.json(); // Get the full JSON object
        const farmerData: ReceiveData = requestData.formData; // Access the formData property
        console.log(farmerData);
        const farmerDetails = await client.ledger.findMany({
            where: {
                farmerId,
                ledgerBookId: ledgerId,
            },
            orderBy: {
                dueAmount: "asc", // Sort by dueAmount in ascending order
            },
            select: {
                id: true,
                dueAmount: true,
                reciveAmount: true,
            },
        });

        console.log("Farmer details:", farmerDetails);

        let remainingAmount = farmerData.totalAmount;
        console.log(remainingAmount);

        // Iterate over all farmer accounts and update due amounts and ledger details
        for (let i = 0; i < farmerDetails.length && remainingAmount > 0; i++) {
            const ledger = farmerDetails[i];
            console.log("ledger : ", ledger);
            if (ledger.dueAmount === 0) continue;

            if (ledger.dueAmount > remainingAmount) {
                // If the payment is less than the due amount, subtract the remaining payment
                const res = await client.ledger.update({
                    where: { id: ledger.id },
                    data: {
                        dueAmount: ledger.dueAmount - remainingAmount,
                        reciveAmount: remainingAmount + ledger.reciveAmount,
                        recieveDate: farmerData.recieveDate,
                        notesRecieve: farmerData.notes,
                        status: farmerData.status,
                    },
                });
                console.log(res);
                remainingAmount = 0; // All money is used up
            } else {
                // If the payment exceeds or equals the due amount, clear the due and subtract it from the payment
                remainingAmount -= ledger.dueAmount;

                const res = await client.ledger.update({
                    where: { id: ledger.id },
                    data: {
                        dueAmount: 0, // Due amount is fully paid off
                        reciveAmount: ledger.dueAmount + ledger.reciveAmount,
                        recieveDate: farmerData.recieveDate,
                        notesRecieve: farmerData.notes,
                        status: farmerData.status,
                    },
                });

                console.log(res);
            }
        }

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error("Error updating ledger for farmer:", error);
        return NextResponse.json(
            { error: "Failed to update ledger for farmer" },
            { status: 500 }
        );
    }
}
