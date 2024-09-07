"use client";
import FilterPopover from "@/components/FilterPopover";
import { Input } from "@/components/ui/input";
import UserInfoCard from "@/components/UserdueCard";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
interface UserInfo {
    name: string;
    amount: number;
    village: string;
    lastUpdated: string; // ISO 8601 date string
    status: string;
}
const userInfoData: UserInfo[] = [
    {
        name: "Alice Johnson",
        amount: 3500,
        village: "Greenwood",
        lastUpdated: "2024-09-05T08:30:00Z",
        status: "completed",
    },
    {
        name: "Bob Smith",
        amount: -1200,
        village: "Oakville",
        lastUpdated: "2024-09-06T14:45:00Z",
        status: "pending",
    },
    {
        name: "Charlie Brown",
        amount: 0,
        village: "Maplewood",
        lastUpdated: "2024-09-07T10:00:00Z",
        status: "completed",
    },
    {
        name: "Diana Green",
        amount: 4900,
        village: "Riverside",
        lastUpdated: "2024-09-08T16:20:00Z",
        status: "completed",
    },
    {
        name: "Edward Black",
        amount: -950,
        village: "Sunnydale",
        lastUpdated: "2024-09-09T09:15:00Z",
        status: "pending",
    },
    {
        name: "Fiona White",
        amount: 2200,
        village: "Lakeside",
        lastUpdated: "2024-09-10T12:05:00Z",
        status: "completed",
    },
    {
        name: "George Blue",
        amount: -1800,
        village: "Hillcrest",
        lastUpdated: "2024-09-11T11:30:00Z",
        status: "pending",
    },
    {
        name: "Hannah Gray",
        amount: 4200,
        village: "Riverbend",
        lastUpdated: "2024-09-12T15:45:00Z",
        status: "completed",
    },
    {
        name: "Isaac Black",
        amount: -650,
        village: "Springfield",
        lastUpdated: "2024-09-13T13:20:00Z",
        status: "pending",
    },
    {
        name: "Jasmine Lee",
        amount: 3300,
        village: "Birchwood",
        lastUpdated: "2024-09-14T17:55:00Z",
        status: "completed",
    },
    {
        name: "Kevin Knight",
        amount: -2000,
        village: "Pineview",
        lastUpdated: "2024-09-15T09:10:00Z",
        status: "pending",
    },
    {
        name: "Lily Adams",
        amount: 5600,
        village: "Cedar Grove",
        lastUpdated: "2024-09-16T10:25:00Z",
        status: "completed",
    },
    {
        name: "Mason Hall",
        amount: -3200,
        village: "Windsor",
        lastUpdated: "2024-09-17T12:40:00Z",
        status: "pending",
    },
    {
        name: "Nora Evans",
        amount: 4500,
        village: "Cypress",
        lastUpdated: "2024-09-18T14:55:00Z",
        status: "completed",
    },
    {
        name: "Oliver Lewis",
        amount: -2700,
        village: "Hollybrook",
        lastUpdated: "2024-09-19T16:10:00Z",
        status: "pending",
    },
    {
        name: "Peyton Harris",
        amount: 3800,
        village: "Sunset",
        lastUpdated: "2024-09-20T11:25:00Z",
        status: "completed",
    },
    {
        name: "Quincy Young",
        amount: -1500,
        village: "Eagle Rock",
        lastUpdated: "2024-09-21T13:40:00Z",
        status: "pending",
    },
    {
        name: "Rachel Scott",
        amount: 2900,
        village: "Violet Hill",
        lastUpdated: "2024-09-22T15:55:00Z",
        status: "completed",
    },
    {
        name: "Samuel Turner",
        amount: -1800,
        village: "Golden Valley",
        lastUpdated: "2024-09-23T09:10:00Z",
        status: "pending",
    },
    {
        name: "Tiffany Miller",
        amount: 4200,
        village: "Westfield",
        lastUpdated: "2024-09-24T10:25:00Z",
        status: "completed",
    },
    {
        name: "Ulysses Reed",
        amount: -2100,
        village: "Northgate",
        lastUpdated: "2024-09-25T12:40:00Z",
        status: "pending",
    },
    {
        name: "Victoria Green",
        amount: 5400,
        village: "Eastwood",
        lastUpdated: "2024-09-26T14:55:00Z",
        status: "completed",
    },
    {
        name: "William Gray",
        amount: -950,
        village: "Southside",
        lastUpdated: "2024-09-27T16:10:00Z",
        status: "pending",
    },
    {
        name: "Xander Brooks",
        amount: 3500,
        village: "Pinecrest",
        lastUpdated: "2024-09-28T11:25:00Z",
        status: "completed",
    },
    {
        name: "Yara Martin",
        amount: -2700,
        village: "Brookside",
        lastUpdated: "2024-09-29T13:40:00Z",
        status: "pending",
    },
    {
        name: "Zachary Morris",
        amount: 4100,
        village: "Lakeshore",
        lastUpdated: "2024-09-30T15:55:00Z",
        status: "completed",
    },
];

// Sample data function
const fetchUserData = () => {
    // Replace this with your data fetching logic or API call
    // Here we are just returning a slice of sample data for demonstration
    const allData = userInfoData;

    return allData;
};

const InfiniteScroll = () => {
    const [data, setData] = useState<UserInfo[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const loader = useRef<HTMLDivElement | null>(null);
    const [searchInput, setSearchInput] = useState<string>("");

    const [selectedFilters, setSelectedFilters] = useState<string[]>(["Name"]);

    const handleFilterChange = (filter: string[]) => {
        setSelectedFilters(filter);
        console.log(filter);
    };

    useEffect(() => {
        // This effect will run whenever selectedFilters changes
        handleDueData(searchInput); // Pass any necessary arguments if needed
    }, [selectedFilters, searchInput]);

    useEffect(() => {
        // Fetch initial data
        const fetchInitialData = async () => {
            setLoading(true);
            const initialData: UserInfo[] = fetchUserData();
            setData(initialData);
            setLoading(false);
        };

        fetchInitialData();
    }, []);

    function handleDueData(value: string): void {
        const filteredData = userInfoData.filter((user) => {
            let check = false;
            console.log(user);

            const filteredData = userInfoData.filter((user) => {
                console.log(user);

                // Handle status filters
                const statusFilters = selectedFilters.filter((filter) =>
                    ["Completed", "Pending"].includes(filter)
                );
                if (statusFilters.length > 0) {
                    // Check if the user's status matches any of the selected status filters
                    const statusMatch = statusFilters.includes(
                        user.status.charAt(0).toUpperCase() +
                            user.status.slice(1).toLowerCase()
                    );
                    if (!statusMatch) {
                        return false; // If status filter is set but does not match, exclude this user
                    }
                }

                // Handle name and village filters with OR condition
                const nameFilter = selectedFilters.includes("Name");
                const villageFilter = selectedFilters.includes("Village");

                // Check if either name or village filter matches
                const nameOrVillageMatch =
                    (nameFilter &&
                        user.name
                            .toLowerCase()
                            .includes(value.toLowerCase())) ||
                    (villageFilter &&
                        user.village
                            .toLowerCase()
                            .includes(value.toLowerCase()));

                if (!nameOrVillageMatch) {
                    return false; // If neither name nor village matches and filters are set, exclude this user
                }

                return true; // User matches all conditions
            });
            console.log(filteredData);
            return filteredData;
        });
        console.log(filteredData);
        setHasMore(false); // Disable infinite scroll during search
        setData(filteredData); // Replace data with filtered results
    }

    return (
        <div className="mb-3">
            <div className="flex justify-between mx-4">
                <Input
                    type="text"
                    id="name"
                    name="search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    required
                    placeholder="Search by name"
                    className="w-70 my-2 "
                />
                <FilterPopover
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
                                name={user.name}
                                amount={user.amount}
                                village={user.village}
                                lastUpdated={user.lastUpdated}
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
