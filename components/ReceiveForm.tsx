"use client";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import DatePicker from "./DatePicker";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import axios from "axios";
import { useLedgerStore } from "@/store/ledger";
import FarmerAccordian from "./FarmerAccordian";
import { useRouter } from "next/navigation";

interface User {
    id: string;
    name: string;
    phone: string;
    village: string;
}
interface ReceiveData {
    name: string;
    totalAmount: number;
    notes: string;
    recieveDate: Date;
    status: string;
}

export default function Form() {
    const router = useRouter();
    const defaultReceiveDate: ReceiveData = {
        name: "",
        totalAmount: 0,
        notes: "",
        recieveDate: new Date(),
        status: "pending",
    };
    const [formData, setFormData] = useState<ReceiveData>(defaultReceiveDate);
    const [isExistingUser, setIsExistingUser] = useState(false);
    const [showCreateMessage, setShowCreateMessage] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [existingUserId, setExistingUserId] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await axios.get("/api/farmer");
            console.log(users);
            setUsers(users.data);
        };
        fetchUsers();
    }, []);
    const handleAmountChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const amount = e.target.value;
        setFormData({
            ...formData,
            totalAmount: Number(amount),
        });
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const notes = e.target.value;
        setFormData({
            ...formData,
            notes: notes,
        });
    };
    const handleNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            name: value,
        }));

        // Filter users based on input
        const filtered: User[] = users.filter((user) =>
            user.name.toLowerCase().includes(value.toLowerCase())
        );

        if (value !== "") {
            setFilteredUsers(filtered);
        }

        // Check if the user already exists
        const existingUser = users.find(
            (user) => user.name.toLowerCase() === value.toLowerCase()
        );

        if (existingUser) {
            setFormData({
                ...formData,
                name: existingUser.name,
            });
            setIsExistingUser(true);
            setShowCreateMessage(false);
            setExistingUserId(existingUser.id);
        } else {
            setFormData({
                ...formData,
                name: value,
            });
            setIsExistingUser(false);
            setShowCreateMessage(true);
        }
    };

    const handleSelectUser = async (user: User) => {
        setFormData({
            ...formData,
            name: user.name,
        });
        setExistingUserId(user.id);
        setIsExistingUser(true);
        setFilteredUsers([]);
        setShowCreateMessage(false);
    };

    const handleDateChange = (newDate: Date) => {
        setFormData({ ...formData, recieveDate: newDate });
        console.log("Selected Date:", newDate);
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const ledgerd = useLedgerStore.getState().getLedgerId();
        const res = await axios.post(
            `/api/farmer/${ledgerd}/${existingUserId}`,
            {
                formData,
            }
        );
        if (res.status === 201) {
            setIsExistingUser(true);
            setShowCreateMessage(false);
            setFormData(defaultReceiveDate);
            router.back();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative space-y-4 m-3">
            {/* Name input */}
            <div className="relative">
                <label htmlFor="name" className="block text-sm font-medium">
                    Name
                </label>
                <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleNameChange}
                    required
                    className="w-full"
                />
                {filteredUsers.length > 0 && (
                    <ul className="absolute left-0 mt-1 border border-gray-300 rounded bg-white w-full max-h-60 overflow-auto z-10">
                        {filteredUsers.map((user, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                onClick={() => handleSelectUser(user)}
                            >
                                {user.name} - {user.village}
                            </li>
                        ))}
                    </ul>
                )}
                {showCreateMessage && (
                    <p className="text-sm text-red-500 mt-2">
                        User is not detected in our database
                    </p>
                )}
            </div>

            {isExistingUser && <FarmerAccordian farmerId={existingUserId} />}

            {/* Total amount (calculated) */}
            <div>
                <label
                    htmlFor="totalAmount"
                    className="block text-sm font-medium"
                >
                    Total Amount
                </label>
                <Input
                    type="number"
                    id="totalAmount"
                    name="totalAmount"
                    value={formData.totalAmount}
                    onChange={handleAmountChange}
                    required
                    className="w-full"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label
                        htmlFor="status"
                        className="block text-sm font-medium"
                    >
                        Status
                    </label>
                    <Select
                        value={formData.status}
                        onValueChange={(value: string) => {
                            setFormData((prevData) => ({
                                ...prevData, // Copy the previous form data
                                status: value, // Update the status field
                            }));
                        }}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {/* Date input */}
                <div className="">
                    <label
                        htmlFor="saleDate"
                        className="block text-sm font-medium"
                    >
                        Sale Date
                    </label>
                    <DatePicker
                        value={formData.recieveDate}
                        onChange={handleDateChange}
                    />
                </div>
            </div>

            {/* Notes section */}
            <div>
                <label htmlFor="notes" className="block text-sm font-medium">
                    Notes
                </label>
                <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full"
                />
            </div>

            {/* Submit button */}
            <Button type="submit" className="w-full">
                Submit
            </Button>
        </form>
    );
}
