"use client";

import { useEffect, useState } from "react";
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerTitle,
    DrawerDescription,
    DrawerClose,
} from "@/components/ui/drawer"; // Assuming you've added the drawer component from ShadCN
import { Button } from "@/components/ui/button"; // Button from ShadCN
import { Input } from "@/components/ui/input"; // Input from ShadCN
import axios from "axios";

export default function AddFarmer() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [village, setVillage] = useState(""); // Single input for village
    const [villages, setVillages] = useState<string[]>([]);
    const [filteredVillages, setFilteredVillages] = useState<string[]>([]);

    useEffect(() => {
        const fetchFarmers = async () => {
            try {
                const response = await axios.get("/api/farmer");
                const data = await response.data;
                if (data) {
                    setVillages(data.map((farmer: any) => farmer.village));
                }
            } catch (error) {
                console.error("Error fetching farmers:", error);
            }
        };
        fetchFarmers();
    }, []);

    const handleSubmit = async () => {
        const farmerData = { name, phoneNo, village };

        try {
            const response = await axios.post("/api/farmer", farmerData);
            if (response.status === 201) {
                const data = response.data;
                console.log("Farmer created:", data);
                if (!villages.includes(village)) {
                    setVillages([...villages, village]);
                }
            } else {
                console.error("Failed to create farmer");
            }
        } catch (error) {
            console.error("Error creating farmer:", error);
        }

        setName("");
        setPhoneNo("");
        setVillage("");
        setOpen(false);
    };

    const handleVillageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        console.log(villages);
        const updatedVillages = villages.filter((village) => {
            return village.toLowerCase().includes(inputValue.toLowerCase());
        });
        console.log(updatedVillages);
        // Set the village input as the value typed by the user
        setVillage(inputValue);
        if (inputValue !== "") setFilteredVillages(updatedVillages);
        else setFilteredVillages([]);
    };

    function handleSelectVillage(village: string): void {
        setVillage(village);
        setFilteredVillages([]);
    }

    return (
        <div>
            {/* Drawer Component */}
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Button className="w-full mt-3 bg-blue-500">
                        Add Farmer
                    </Button>
                </DrawerTrigger>
                <DrawerContent style={{ width: "100vw" }}>
                    <DrawerHeader>
                        <DrawerTitle>Add Farmer</DrawerTitle>
                        <DrawerDescription>
                            Fill in the farmer details below
                        </DrawerDescription>
                    </DrawerHeader>

                    {/* Input Fields */}
                    <div className="space-y-4 mx-2">
                        {/* Farmer Name Input */}
                        <Input
                            placeholder="Farmer Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        {/* Farmer Phone Number Input */}
                        <Input
                            placeholder="Phone Number"
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                        />

                        {/* Village Input (with existing village detection) */}
                        <div className="relative">
                            <Input
                                type="text"
                                id="village"
                                name="village"
                                value={village}
                                onChange={handleVillageChange}
                                required // Disable if the user is selected
                                className="w-full"
                                placeholder="Village"
                            />
                            {filteredVillages.length > 0 && (
                                <ul className="absolute left-0 mt-1 border border-gray-300 rounded bg-white w-full max-h-60 overflow-auto z-10">
                                    {filteredVillages.map((village, index) => (
                                        <li
                                            key={index}
                                            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                            onClick={() =>
                                                handleSelectVillage(village)
                                            }
                                        >
                                            {village}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Footer with Submit Button */}
                    <DrawerFooter>
                        <Button onClick={handleSubmit}>Add Farmer</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
}
