"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface User {
    name: string;
    phone: string;
    village: string;
}
interface SaleData {
    name: string;
    phone: string;
    village: string;
    acres: number;
    amountPerAcre: number;
    totalAmount: number;
    notes: string;
}

const users: User[] = [
    { name: "John Doe", phone: "1234567890", village: "Village 1" },
    { name: "Jane Smith", phone: "2345678901", village: "Village 2" },
    { name: "Emily Johnson", phone: "3456789012", village: "Village 3" },
    { name: "Michael Brown", phone: "4567890123", village: "Village 4" },
    { name: "Linda Davis", phone: "5678901234", village: "Village 5" },
    { name: "Robert Wilson", phone: "6789012345", village: "Village 1" },
    { name: "Patricia Moore", phone: "7890123456", village: "Village 2" },
    { name: "James Taylor", phone: "8901234567", village: "Village 3" },
    { name: "Barbara Anderson", phone: "9012345678", village: "Village 4" },
    { name: "William Thomas", phone: "0123456789", village: "Village 5" },
    { name: "Elizabeth Harris", phone: "1234567891", village: "Village 1" },
    { name: "David Clark", phone: "2345678902", village: "Village 2" },
    { name: "Jennifer Lewis", phone: "3456789013", village: "Village 3" },
    { name: "Charles Walker", phone: "4567890124", village: "Village 4" },
    { name: "Susan Hall", phone: "5678901235", village: "Village 5" },
    { name: "Joseph Allen", phone: "6789012346", village: "Village 1" },
    { name: "Sarah Young", phone: "7890123457", village: "Village 2" },
    { name: "Daniel King", phone: "8901234568", village: "Village 3" },
    { name: "Nancy Wright", phone: "9012345679", village: "Village 4" },
    { name: "Matthew Scott", phone: "0123456790", village: "Village 5" },
    { name: "Lisa Green", phone: "1234567901", village: "Village 1" },
    { name: "Mark Adams", phone: "2345678912", village: "Village 2" },
    { name: "Karen Baker", phone: "3456789023", village: "Village 3" },
    { name: "Steven Nelson", phone: "4567890134", village: "Village 4" },
    { name: "Betty Carter", phone: "5678901245", village: "Village 5" },
    { name: "Paul Mitchell", phone: "6789012356", village: "Village 1" },
    { name: "Dorothy Perez", phone: "7890123467", village: "Village 2" },
    { name: "George Roberts", phone: "8901234578", village: "Village 3" },
    { name: "Helen Campbell", phone: "9012345689", village: "Village 4" },
    { name: "Andrew Evans", phone: "0123456800", village: "Village 5" },
    { name: "Jessica Turner", phone: "1234567912", village: "Village 1" },
    { name: "Ryan Phillips", phone: "2345678923", village: "Village 2" },
    { name: "Sandra Martinez", phone: "3456789034", village: "Village 3" },
    { name: "Brian Collins", phone: "4567890145", village: "Village 4" },
    { name: "Megan Stewart", phone: "5678901356", village: "Village 5" },
    { name: "Kevin Morris", phone: "6789012467", village: "Village 1" },
    { name: "Amanda Rogers", phone: "7890123578", village: "Village 2" },
    { name: "Joshua Reed", phone: "8901234689", village: "Village 3" },
    { name: "Rachel Cook", phone: "9012345790", village: "Village 4" },
];

const villages = ["Village 1", "Village 2", "Village 3"];

export default function Form() {
    const defaultSaleDate: SaleData = {
        name: "",
        phone: "",
        village: "",
        acres: 0,
        amountPerAcre: 0,
        totalAmount: 0,
        notes: "",
    };
    const [formData, setFormData] = useState<SaleData>(defaultSaleDate);

    const [isExistingUser, setIsExistingUser] = useState(false);
    const [showCreateMessage, setShowCreateMessage] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [filteredVillages, setFilteredVillages] = useState<string[]>([]);

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
        setFilteredUsers(filtered);

        // Check if the user already exists
        const existingUser = users.find(
            (user) => user.name.toLowerCase() === value.toLowerCase()
        );

        if (existingUser) {
            setFormData({
                ...formData,
                name: existingUser.name,
                phone: existingUser.phone,
                village: existingUser.village,
            });
            setIsExistingUser(true);
            setShowCreateMessage(false);
        } else {
            setFormData({
                ...formData,
                name: value,
                phone: "",
                village: "",
            });
            setIsExistingUser(false);
            setShowCreateMessage(true);
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
        setFilteredVillages(filtered);
    };

    const handleSelectUser = (user: User) => {
        setFormData({
            ...formData,
            name: user.name,
            phone: user.phone,
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted", formData);
        setIsExistingUser(true);
        setShowCreateMessage(false);
        setFormData(defaultSaleDate);
    };

    return (
        <form onSubmit={handleSubmit} className="relative space-y-4">
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
                    value={formData.phone}
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
            <div>
                <label htmlFor="acres" className="block text-sm font-medium">
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
                    readOnly
                    className="w-full"
                />
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
