import { Ledger } from "@/lib/types";
import { format, parseISO } from "date-fns";

export default function LedgerCard({ ledgerdata }: { ledgerdata: Ledger }) {
    return (
        <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
                <div className="grid grid-cols-2 gap-x-4 mb-4">
                    <div className="font-medium">No of Acres:</div>
                    <div className="text-right text-yellow-500 font-bold">
                        {ledgerdata.acres}
                    </div>
                    <div className="font-medium">Amount Per Acre:</div>
                    <div className="text-right text-blue-400 font-bold">
                        {ledgerdata.amountPerAcre.toLocaleString()}
                    </div>
                    <div className="font-medium">Sale Amount:</div>
                    <div className="text-right text-blue-500 font-bold">
                        {ledgerdata.saleamount.toLocaleString()}
                    </div>

                    <div className="font-medium">Receive Amount:</div>
                    <div className="text-right text-green-500 font-bold">
                        {ledgerdata.reciveAmount.toLocaleString()}
                    </div>
                    <div className="font-medium">Due Amount:</div>
                    <div className="text-right text-red-500 font-bold">
                        {ledgerdata.dueAmount.toLocaleString()}
                    </div>
                    <div className="font-medium">Sale Date:</div>
                    <div className="text-right font-bold">
                        {format(ledgerdata.saleDate, "MM/dd/yyyy")}
                    </div>
                </div>
                <div>
                    <div className="font-medium mb-1">Sale notes:</div>
                    <textarea
                        readOnly
                        className="w-full h-24 p-2 border border-gray-300 rounded"
                        value={ledgerdata.notesSale.toString()}
                    />
                </div>
            </div>
        </div>
    );
}
