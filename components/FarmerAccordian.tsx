"use client";

import * as React from "react";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLedgerStore } from "@/store/ledger";
import { Ledger } from "@/lib/types";
import LedgerCard from "./LedgerCard";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

export default function FarmerAccordian({ farmerId }: { farmerId: string }) {
    const [farmerData, setFarmerData] = useState<Ledger[]>([]);
    const [totalDueAmount, setTotalDueAmount] = useState(0);
    const getFarmerTransactions = async (
        farmerId: string,
        ledgerId: string
    ) => {
        const response = await axios.get(`/api/farmer/${ledgerId}/${farmerId}`);
        const data = await response.data;
        setFarmerData(data);
        console.log(data);
    };

    useEffect(() => {
        const ledgerId = useLedgerStore.getState().getLedgerId();
        getFarmerTransactions(farmerId, ledgerId);
    }, []);

    useEffect(() => {
        const totalDueAmount = farmerData.reduce(
            (sum, item) => sum + (item.dueAmount || 0), // Handle cases where dueAmount might be undefined
            0 // Initial value for the sum is 0
        );
        setTotalDueAmount(totalDueAmount);
    }, [farmerData]);

    const [details, setDetails] = React.useState({
        dueAmount: 1000, // Example due amount
        additionalInfo: "Here are more details about the due amount.",
    });

    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger className="flex justify-between p-4 border-b">
                    <span className="text-md font-semibold no-underline">
                        Total Due Amount
                    </span>
                    <span className="text-md font-semibold text-red-500 no-underline">
                        {totalDueAmount.toLocaleString("en-US", {
                            style: "currency",
                            currency: "INR",
                        })}
                    </span>
                </AccordionTrigger>
                <AccordionContent className="p-4">
                    <Carousel>
                        <CarouselContent>
                            {farmerData.length > 0 &&
                                farmerData.map((farmer, index) => (
                                    <CarouselItem key={index}>
                                        <LedgerCard ledgerdata={farmer} />
                                    </CarouselItem>
                                ))}
                        </CarouselContent>
                    </Carousel>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
