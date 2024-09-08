"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils"; // Import utility functions (optional)
import { Button } from "@/components/ui/button"; // Your button component
import { Calendar } from "@/components/ui/calendar"; // Your calendar component
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"; // Popover components

interface DatePickerProps {
    value?: Date; // Optional prop to set the initial date
    onChange?: (date: Date) => void; // Function to return the selected date
    classProps?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
        value
    );

    // Handle date selection and propagate the value via onChange prop
    const handleSelect = (date: Date | undefined) => {
        setSelectedDate(date);
        if (date && onChange) {
            onChange(date); // Call onChange prop if provided
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                        format(selectedDate, "PPP")
                    ) : (
                        <span>Pick a date</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleSelect}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
};

export default DatePicker;
