import { create } from "zustand";

// LedgerInfo interface
interface LedgerInfo {
    ledgerId: string;
    ledgerName: string;
    ledgerPerAcreAmount: number;
    ledgerDueAmount: number;
    ledgerSaleAmount: number;
    ledgerReceivedAmount: number;
    ledgerTotalAcres: number;
}

export const useLedgerStore = create<{
    ledgerId: string;
    ledgerName: string;
    ledgerPerAcreAmount: number;
    dashboardData: Omit<
        LedgerInfo,
        "ledgerId" | "ledgerName" | "ledgerPerAcreAmount"
    >;
    getLedgerId: () => string;
    setLedgerId: (id: string) => void;
    getLedgerInfo: () => Omit<
        LedgerInfo,
        | "ledgerDueAmount"
        | "ledgerSaleAmount"
        | "ledgerReceivedAmount"
        | "ledgerTotalAcres"
    >;
    setLedgerInfo: (
        data: Omit<
            LedgerInfo,
            | "ledgerDueAmount"
            | "ledgerSaleAmount"
            | "ledgerReceivedAmount"
            | "ledgerTotalAcres"
        >
    ) => void;
    getLedgerName: () => string;
    setLedgerName: (name: string) => void;
    getDashboardData: () => Omit<
        LedgerInfo,
        "ledgerId" | "ledgerName" | "ledgerPerAcreAmount"
    >;
    setDashboardData: (
        data: Omit<
            LedgerInfo,
            "ledgerId" | "ledgerName" | "ledgerPerAcreAmount"
        >
    ) => void;
}>((set, get) => ({
    // Initial state
    ledgerId: "",
    ledgerName: "Select Ledger",
    ledgerPerAcreAmount: 0,
    dashboardData: {
        ledgerDueAmount: 0,
        ledgerSaleAmount: 0,
        ledgerReceivedAmount: 0,
        ledgerTotalAcres: 0,
    },

    // Getter and setter for ledgerId
    getLedgerId: () => get().ledgerId,
    setLedgerId: (id: string) => set({ ledgerId: id }),

    // Getter and setter for ledgerName
    getLedgerName: () => get().ledgerName,
    setLedgerName: (name: string) => set({ ledgerName: name }),

    // Getter and setter for ledgerPerAcreAmount
    getLedgerPerAcreAmount: () => get().ledgerPerAcreAmount,
    setLedgerPerAcreAmount: (amount: number) =>
        set({ ledgerPerAcreAmount: amount }),

    // Getter and setter for dashboard data
    getDashboardData: () => get().dashboardData,
    setDashboardData: (data) => set({ dashboardData: data }),

    // Getter and setter for complete ledger info
    getLedgerInfo: () => ({
        ledgerId: get().ledgerId,
        ledgerName: get().ledgerName,
        ledgerPerAcreAmount: get().ledgerPerAcreAmount,
    }),
    setLedgerInfo: (data) =>
        set({
            ledgerId: data.ledgerId,
            ledgerName: data.ledgerName,
            ledgerPerAcreAmount: data.ledgerPerAcreAmount,
        }),
}));
