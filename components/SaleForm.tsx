"use client";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useLedgerStore } from "@/store/ledger";
import DatePicker from "./DatePicker";

interface User {
    id: string;
    name: string;
    phoneNo: string;
    village: string;
}
interface SaleData {
    farmerId: string;
    name: string;
    phoneNo: string;
    village: string;
    acres: number;
    amountPerAcre: number;
    totalAmount: number;
    notes: string;
    saleDate: Date;
}

export default function Form() {
    const router = useRouter();
    const defaultSaleDate: SaleData = {
        farmerId: "",
        name: "",
        phoneNo: "",
        village: "",
        acres: 0,
        amountPerAcre: useLedgerStore.getState().ledgerPerAcreAmount,
        totalAmount: 0,
        notes: "",
        saleDate: new Date(),
    };
    const [formData, setFormData] = useState<SaleData>(defaultSaleDate);
    const [users, setUsers] = useState<User[]>([]);
    const [villages, setVillages] = useState<string[]>([]);
    const [isExistingUser, setIsExistingUser] = useState(false);
    const [showCreateMessage, setShowCreateMessage] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [filteredVillages, setFilteredVillages] = useState<string[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await axios.get("/api/farmer");
            console.log(users);
            setUsers(users.data);
            setVillages(users.data.map((farmer: any) => farmer.village));
        };

        const AmountPerAcre = useLedgerStore.getState().ledgerPerAcreAmount;
        setFormData({ ...formData, amountPerAcre: AmountPerAcre });
        fetchUsers();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            name: value,
        }));

        // Filter users based on input
        const filtered: User[] = users.filter((user) =>
            user.name.toLowerCase().includes(value.toLowerCase())
        );
        if (value !== "") setFilteredUsers(filtered);
        else setFilteredUsers([]);

        // Check if the user already exists
        const existingUser = users.find(
            (user) => user.name.toLowerCase() === value.toLowerCase()
        );

        if (existingUser) {
            setFormData({
                ...formData,
                farmerId: existingUser.id,
                name: existingUser.name,
                phoneNo: existingUser.phoneNo,
                village: existingUser.village,
            });
            setIsExistingUser(true);
            setShowCreateMessage(false);
        } else {
            setFormData({
                ...formData,
                farmerId: "",
                name: value,
                phoneNo: "",
                village: "",
            });
            if (value !== "") {
                setIsExistingUser(false);
                setShowCreateMessage(true);
            }
        }
    };

    const handleVillageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            village: value,
        }));

        // Filter village suggestions based on input
        const filtered = villages.filter((village) =>
            village.toLowerCase().includes(value.toLowerCase())
        );
        if (value !== "") setFilteredVillages(filtered);
        else setFilteredVillages([]);
    };

    const handleSelectUser = (user: User) => {
        setFormData({
            ...formData,
            farmerId: user.id,
            name: user.name,
            phoneNo: user.phoneNo,
            village: user.village,
        });
        setIsExistingUser(true);
        setFilteredUsers([]);
        setShowCreateMessage(false);
    };

    const handleSelectVillage = (village: string) => {
        setFormData({ ...formData, village });
        setFilteredVillages([]);
    };

    const calculateTotalAmount = () => {
        setFormData({
            ...formData,
            totalAmount:
                Number(formData.acres) * Number(formData.amountPerAcre),
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted", formData);
        try {
            const res = await axios.post("/api/ledger", {
                ...formData,
                ledgerBookId: useLedgerStore.getState().getLedgerId(),
            });
            console.log(res);
        } catch (err) {
            console.log(err);
        }

        setIsExistingUser(true);
        setShowCreateMessage(false);
        setFormData(defaultSaleDate);
        router.back();
    };

    const handleDateChange = (newDate: Date) => {
        setFormData({ ...formData, saleDate: newDate });
        console.log("Selected Date:", newDate);
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
                {showCreateMessage && formData.name.length > 0 && (
                    <p className="text-sm text-red-500 mt-2">
                        New user detected, please enter phone number and village
                        details.
                    </p>
                )}
            </div>

            {/* Phone number input */}
            <div>
                <label htmlFor="phone" className="block text-sm font-medium">
                    Phone Number
                </label>
                <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phoneNo}
                    onChange={handleChange}
                    disabled={isExistingUser}
                    required
                    className="w-full"
                />
            </div>

            {/* Village input */}
            <div className="relative">
                <label htmlFor="village" className="block text-sm font-medium">
                    Village
                </label>
                <Input
                    type="text"
                    id="village"
                    name="village"
                    value={formData.village}
                    onChange={handleVillageChange}
                    required
                    disabled={isExistingUser} // Disable if the user is selected
                    className="w-full"
                />
                {filteredVillages.length > 0 && !isExistingUser && (
                    <ul className="absolute left-0 mt-1 border border-gray-300 rounded bg-white w-full max-h-60 overflow-auto z-10">
                        {filteredVillages.map((village, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                onClick={() => handleSelectVillage(village)}
                            >
                                {village}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Acres input */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label
                        htmlFor="acres"
                        className="block text-sm font-medium"
                    >
                        Number of Acres
                    </label>
                    <Input
                        type="number"
                        id="acres"
                        name="acres"
                        value={formData.acres}
                        onChange={handleChange}
                        onBlur={calculateTotalAmount}
                        required
                        className="w-full"
                    />
                </div>

                {/* Amount per acre input */}
                <div>
                    <label
                        htmlFor="amountPerAcre"
                        className="block text-sm font-medium"
                    >
                        Amount per Acre
                    </label>
                    <Input
                        type="number"
                        id="amountPerAcre"
                        name="amountPerAcre"
                        value={formData.amountPerAcre}
                        onChange={handleChange}
                        onBlur={calculateTotalAmount}
                        required
                        className="w-full"
                    />
                </div>

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
                        onChange={handleChange}
                        className="w-full"
                    />
                </div>
                <div className="">
                    <label
                        htmlFor="saleDate"
                        className="block text-sm font-medium"
                    >
                        Sale Date
                    </label>
                    <DatePicker
                        value={formData.saleDate}
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
