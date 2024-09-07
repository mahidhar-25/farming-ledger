import React, { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Checkbox } from "./ui/checkbox";

interface FilterPopoverProps {
    selectedFilters: string[];
    onFilterChange: (filters: string[]) => void;
}

const FilterPopover: React.FC<FilterPopoverProps> = ({
    selectedFilters,
    onFilterChange,
}) => {
    const [localFilters, setLocalFilters] = useState<string[]>(selectedFilters);
    const [isOpen, setIsOpen] = useState(false);

    const handleFilterChange = (filter: string) => {
        setLocalFilters((prevFilters) =>
            prevFilters.includes(filter)
                ? prevFilters.filter((f) => f !== filter)
                : [...prevFilters, filter]
        );
    };

    useEffect(() => {
        setLocalFilters(selectedFilters);
    }, [selectedFilters]);

    useEffect(() => {
        if (!isOpen) {
            // Handle filter change when popover closes
            onFilterChange(localFilters);
        }
    }, [isOpen, localFilters, onFilterChange]);

    const options = ["Name", "Village", "Completed", "Pending"];

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger>
                <img
                    src="/icons/filter.svg"
                    height={25}
                    width={25}
                    alt="Filter icon"
                    className="cursor-pointer"
                />
            </PopoverTrigger>
            <PopoverContent className="p-4 bg-white border border-gray-300 rounded-lg shadow-md w-64">
                <div className="space-y-2">
                    {options.map((option) => (
                        <label key={option} className="flex items-center">
                            <Checkbox
                                checked={localFilters.includes(option)}
                                onClick={() => handleFilterChange(option)}
                                className="mr-2"
                            />
                            {option}
                        </label>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default FilterPopover;
