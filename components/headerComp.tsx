"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLedgerStore } from "@/store/ledger";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // Assuming ShadCN dropdown components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AddLedger from "./AddLedger";
import { getLedgerBooks } from "@/app/actions/ledger";
import axios from "axios";

// Mock data for ledger books (replace with actual data or fetch from an API)
const ledgerBooks = [
    { id: "ledger1", name: "Ledger Book 1" },
    { id: "ledger2", name: "sgvf Book 2" },
    { id: "ledger3", name: "ssr Book 3" },
];

interface ledgerBookQuery {
    name: string;
    perAcreAmount: number;
    id: string;
}

export default function LedgerBookDropdown() {
    const ledgerName = useLedgerStore((state) => state.getLedgerName());
    const router = useRouter();
    const [selectedLedger, setSelectedLedger] = useState(ledgerName); // Default label for dropdown
    const [searchQuery, setSearchQuery] = useState("");
    const [ledgerBooks, setLedgerBooks] = useState<ledgerBookQuery[]>([]);
    const [filteredLedgers, setFilteredLedgers] = useState<ledgerBookQuery[]>(
        []
    );

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const filtered = ledgerBooks.filter((ledger) =>
            ledger.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredLedgers(filtered);
    };

    useEffect(() => {
        const getLedgers = async () => {
            const books: ledgerBookQuery[] = await getLedgerBooks();
            console.log(books);
            if (books.length > 0) {
                setLedgerBooks(books);
                setFilteredLedgers(books);
            }
        };

        getLedgers();
    }, []);
    const handleLedgerSelect = async (ledgerName: string, ledgerId: string) => {
        setSelectedLedger(ledgerName);

        try {
            const res = await axios.get(`/api/ledger/${ledgerId}`);
            const data = await res.data;

            useLedgerStore.getState().setLedgerInfo({
                ledgerId: data.ledgerId,
                ledgerName: data.name,
                ledgerPerAcreAmount: data.perAcreAmount,
            });
        } catch (err) {
            console.log(err);
        }
        router.push(`/ledger/${ledgerId}`);
    };

    return (
        <div className="bg-white shadow-lg  w-full">
            <div className="bg-green-800 text-white text-lg font-bold py-4 cursor-pointer flex flex-col px-2">
                <div onClick={() => router.push("/")}>
                    <h2 className="text-yellow-300">My APP</h2>
                </div>

                <div className="flex justify-between items-center mt-2 mb-1">
                    {/* Dropdown for Ledger Book Selection */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="p-0 font-normal h-auto text-white border-none hover:bg-transparent hover:text-yellow-150 focus:ring-0"
                            >
                                {selectedLedger}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-64 bg-white">
                            {/* Search Input */}
                            <div className="p-2">
                                <Input
                                    placeholder="Search Ledger"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        handleSearch(e.target.value)
                                    }
                                />
                            </div>
                            {/* Dropdown Items */}
                            {filteredLedgers.length > 0 ? (
                                filteredLedgers.map((ledger) => (
                                    <DropdownMenuItem
                                        key={ledger.id}
                                        onSelect={() =>
                                            handleLedgerSelect(
                                                ledger.name,
                                                ledger.id
                                            )
                                        }
                                    >
                                        {ledger.name}
                                    </DropdownMenuItem>
                                ))
                            ) : (
                                <DropdownMenuItem disabled>
                                    No ledgers found
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Add Ledger Button */}
                    <div>
                        <AddLedger />
                    </div>
                </div>
            </div>
        </div>
    );
}
