import client from "@/lib/db/index";
import { Farmer } from "@/lib/types/index";
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
