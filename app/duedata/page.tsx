"use client";
import DashboardCard from "@/components/DashboardCard";
import FilterPopover from "@/components/FilterPopover";
import { Input } from "@/components/ui/input";
import UserInfoCard from "@/components/UserdueCard";
import { FarmerDataFilter } from "@/lib/types";
import { useLedgerStore } from "@/store/ledger";
import axios from "axios";
import React, { useState, useEffect, useRef, useCallback } from "react";

const InfiniteScroll = () => {
    const [originalData, setOriginalData] = useState<FarmerDataFilter[]>([]);
    const [data, setData] = useState<FarmerDataFilter[]>([]);
    const [loading, setLoading] = useState(false);
    const loader = useRef<HTMLDivElement | null>(null);
    const [searchInput, setSearchInput] = useState<string>("");
    const [selectedFilters, setSelectedFilters] = useState<string[]>(["Name"]);
    const [filters, setFilters] = useState({
        status: "",
    });

    const [originalDueAmount, setOriginalDueAmount] = useState(0);
    const [dynamicDueAmount, setDynamicDueAmount] = useState(0);

    const handleSearch = (value: string) => {
        setSearchInput(value);
        if (value === "") {
            updateDynamicDueAmount(originalData, selectedFilters);
            setData(originalData);
        }

        if (value !== "") {
            let dataUpdated = [];
            console.log(selectedFilters);
            if (
                selectedFilters.includes("Name") &&
                selectedFilters.includes("Village")
            ) {
                dataUpdated = originalData.filter(
                    (item) =>
                        item.farmerName
                            .toLowerCase()
                            .includes(value.toLowerCase()) ||
                        item.farmerVillage
                            .toLowerCase()
                            .includes(value.toLowerCase())
                );
            } else if (
                selectedFilters.includes("Name") &&
                !selectedFilters.includes("Village")
            ) {
                dataUpdated = originalData.filter((item) =>
                    item.farmerName.toLowerCase().includes(value.toLowerCase())
                );
            } else if (
                !selectedFilters.includes("Name") &&
                selectedFilters.includes("Village")
            ) {
                dataUpdated = originalData.filter((item) =>
                    item.farmerVillage
                        .toLowerCase()
                        .includes(value.toLowerCase())
                );
            } else {
                dataUpdated = originalData;
            }
            updateDynamicDueAmount(dataUpdated, selectedFilters);
            setData(dataUpdated);
        }
    };

    function updateDynamicDueAmount(
        data: FarmerDataFilter[],
        filter: string[] = [""]
    ) {
        let totalDueAmount = 0;
        console.log("update dynamic due amount", selectedFilters);
        data.forEach((user: FarmerDataFilter) => {
            if (filter.includes("Completed")) {
                totalDueAmount +=
                    user.totalDueAmount - user.totalDueAmountPending;
            } else if (filter.includes("Pending")) {
                totalDueAmount += user.totalDueAmountPending;
            } else {
                totalDueAmount += user.totalDueAmount;
            }
        });
        setDynamicDueAmount(totalDueAmount);
    }

    const handleFilterChange = (filter: string[]) => {
        console.log(filter);
        setSelectedFilters(filter);
        const updatedFilters = {
            status: filter.includes("Pending")
                ? "pending"
                : filter.includes("Completed")
                ? "completed"
                : "",
        };
        setFilters(updatedFilters);
        updateDynamicDueAmount(data, filter);
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true); // Set loading once before the fetch
            const ledgerId = useLedgerStore.getState().getLedgerId(); // Corrected the string to function call
            try {
                const response = await axios.get(`/api/farmer/${ledgerId}`);
                console.log(response.data); // Set the fetched data
                let dueAmountOriginal = 0;
                response.data.forEach((user: FarmerDataFilter) => {
                    dueAmountOriginal += user.totalDueAmount;
                });
                setOriginalDueAmount(dueAmountOriginal);
                setDynamicDueAmount(dueAmountOriginal);
                setOriginalData(response.data);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching initial data:", error);
            } finally {
                setLoading(false); // Ensure loading is set to false after fetch
            }
        };

        fetchInitialData();
    }, []); // Empty dependency array ensures it runs only once after initial render

    return (
        <div className="mb-3">
            <div className="flex">
                <DashboardCard
                    title="Original Due Amount"
                    value={originalDueAmount || "0"}
                    textcolor="text-blue-500"
                />
                <DashboardCard
                    title="Dynamic Due Amount"
                    value={dynamicDueAmount || "0"}
                    textcolor="text-red-500"
                />
            </div>
            <div className="flex justify-between mx-4">
                <Input
                    type="text"
                    id="name"
                    name="search"
                    value={searchInput}
                    onChange={(e) => handleSearch(e.target.value)}
                    required
                    placeholder="Search by name"
                    className="w-70 my-2 "
                />
                <FilterPopover
                    filters={["Name", "Village", "Completed", "Pending"]}
                    selectedFilters={selectedFilters}
                    onFilterChange={handleFilterChange}
                />
            </div>
            <div className="relative h-[500px] overflow-auto p-4 scrollbar-hide">
                <div className="space-y-4">
                    {data.length > 0 ? (
                        data.map((user, index) => (
                            <UserInfoCard
                                key={index}
                                name={user.farmerName}
                                amount={
                                    filters.status === ""
                                        ? user.totalDueAmount
                                        : filters.status === "pending"
                                        ? user.totalDueAmountPending
                                        : user.totalDueAmount -
                                          user.totalDueAmountPending
                                }
                                village={user.farmerVillage}
                                lastUpdated={new Date(
                                    user.lastUpdatedDate
                                ).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}
                                amountColor={
                                    filters.status === "pending"
                                        ? "text-red-500"
                                        : "text-green-500"
                                }
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-500">
                            No data available
                        </p>
                    )}
                    {loading && (
                        <p className="text-center text-gray-500">Loading...</p>
                    )}
                    <div ref={loader} className="h-10 w-full"></div>
                    {/* Empty div to act as the loader trigger */}
                </div>
            </div>
        </div>
    );
};

export default InfiniteScroll;
