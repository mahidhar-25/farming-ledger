export interface LedgerBook {
    name: string;
    perAcreAmount: number;
}

export interface Farmer {
    name: string;
    phoneNo: string;
    village: string;
}

export interface Ledger {
    id: String;
    farmerId: String;
    ledgerBookId: String;
    saleDate: Date;
    recieveDate: Date;
    acres: number;
    saleamount: number;
    dueAmount: number;
    reciveAmount: number;
    status: String;
    notesSale: String;
    notesRecieve: String;
    amountPerAcre: number;
}

export interface ReceiveData {
    name: string;
    totalAmount: number;
    notes: string;
    recieveDate: Date;
    status: string;
}

export interface FarmerDataFilter {
    farmerId: string; // or string, depending on your data type
    farmerVillage: string;
    farmerName: string;
    totalDueAmount: number;
    totalDueAmountPending: number;
    totalReceiveAmount: number;
    totalReceiveAmountPending: number;
    lastUpdatedDate: Date | string; // Depending on how you represent dates
    lastReceivedDate: Date | string;
    lastSaleDate: Date | string;
    totalSaleAmount: number;
    totalAcres: number;
}
