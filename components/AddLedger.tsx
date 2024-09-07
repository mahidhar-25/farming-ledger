"use client";
import { useState } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { createLedger } from "@/app/actions/ledger";
import { PlusCircle } from "lucide-react";

export default function AddLedger() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [amountPerAcre, setAmountPerAcre] = useState("");

    const handleSubmit = async () => {
        const res = await createLedger({
            name,
            perAcreAmount: parseFloat(amountPerAcre),
        });
        if (res.id) {
            setName("");
            setAmountPerAcre("");
            setOpen(false);
        }
        console.log(res);
    };

    return (
        <div>
            {/* Dialog Component */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <PlusCircle />
                </DialogTrigger>
                <DialogContent className="w-[80vw]  justify-center">
                    <DialogHeader>
                        <DialogTitle>Enter Details</DialogTitle>
                        <DialogDescription>
                            Provide the required information below
                        </DialogDescription>
                    </DialogHeader>

                    {/* Input Fields */}
                    <div className="space-y-4">
                        <Input
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            placeholder="Enter amount per acre"
                            type="number"
                            value={amountPerAcre}
                            onChange={(e) => setAmountPerAcre(e.target.value)}
                        />
                    </div>

                    {/* Footer with Submit Button */}
                    <DialogFooter>
                        <Button onClick={handleSubmit}>Add</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
