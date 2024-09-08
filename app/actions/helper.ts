import { Farmer } from "@/lib/types";
import { createFramer } from "./farmer";

export async function createFarmerWrapper(farmerData: Farmer) {
    const farmer = await createFramer(farmerData);
    return farmer;
}
