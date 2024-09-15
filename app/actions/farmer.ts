import client from "@/lib/db/index";
import { Farmer, FarmerDataFilter } from "@/lib/types/index";
export async function createFramer(farmerData: Farmer) {
    try {
        console.log(farmerData);
        const farmer = await client.farmer.create({ data: farmerData });
        return farmer;
    } catch (error) {
        console.error("Error creating farmer:", error);
    }
}

export async function getFarmers() {
    try {
        const farmers = await client.farmer.findMany();
        return farmers;
    } catch (error) {
        console.error("Error getting farmers:", error);
    }
}

export async function getFarmersDetailsByLedgerId(ledgerId: string) {
    const ledgers = await client.ledger.findMany({
        where: { ledgerBookId: ledgerId },
        include: {
            farmer: {
                include: {
                    ledgers: {
                        select: {
                            saleDate: true,
                            recieveDate: true,
                            acres: true,
                            saleamount: true,
                            dueAmount: true,
                            reciveAmount: true,
                            status: true,
                            updatedAt: true,
                        },
                    },
                },
            },
        },
    });

    if (!ledgers) {
        throw new Error("Ledger not found");
    }

    // Use an object to store farmers by their ID to avoid duplicates
    const farmersMap: { [key: string]: FarmerDataFilter } = {};

    for (const ledger of ledgers) {
        const { farmer } = ledger;

        console.log("farmer id : ", ledger.farmerId);
        if (!farmersMap[ledger.farmerId]) {
            console.log("first timer");
            // First time this farmer is encountered, aggregate their data
            const totalDueAmount = farmer.ledgers.reduce(
                (sum, l) => sum + l.dueAmount,
                0
            );
            const totalDueAmountPending = farmer.ledgers
                .filter((l) => l.status === "pending")
                .reduce((sum, l) => sum + l.dueAmount, 0);
            const totalReceiveAmount = farmer.ledgers.reduce(
                (sum, l) => sum + l.reciveAmount,
                0
            );
            const totalReceiveAmountPending = farmer.ledgers
                .filter((l) => l.status === "pending")
                .reduce((sum, l) => sum + l.reciveAmount, 0);
            const totalAcres = farmer.ledgers.reduce(
                (sum, l) => sum + l.acres,
                0
            );
            const lastUpdatedDate = farmer.ledgers.reduce(
                (latest, l) => (l.updatedAt > latest ? l.updatedAt : latest),
                farmer.ledgers[0]?.updatedAt
            );
            const lastReceivedDate = farmer.ledgers.reduce(
                (latest, l) =>
                    l.recieveDate && l.recieveDate > latest
                        ? l.recieveDate
                        : latest,
                farmer.ledgers[0]?.recieveDate ?? lastUpdatedDate
            );
            const lastSaleDate = farmer.ledgers.reduce(
                (latest, l) => (l.saleDate > latest ? l.saleDate : latest),
                farmer.ledgers[0]?.saleDate
            );
            const totalSaleAmount = farmer.ledgers.reduce(
                (sum, l) => sum + l.saleamount,
                0
            );

            // Store the aggregated data in the farmersMap object
            farmersMap[farmer.id] = {
                farmerId: farmer.id,
                farmerVillage: farmer.village,
                farmerName: farmer.name,
                totalDueAmount,
                totalDueAmountPending,
                totalReceiveAmount,
                totalReceiveAmountPending,
                lastUpdatedDate,
                lastReceivedDate,
                lastSaleDate,
                totalSaleAmount,
                totalAcres,
            };
        }
    }

    // Convert the farmersMap object to an array
    const res = Object.values(farmersMap);

    console.log(res);
    return res;
}
