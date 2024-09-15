import React from "react";

interface UserInfoCardProps {
    name: string;
    amount: number;
    village: string;
    lastUpdated: string; // Date as a string
    amountColor: string;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({
    name,
    amount = 0,
    village,
    lastUpdated,
    amountColor,
}) => {
    return (
        <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4 w-full">
            <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg">{name}</span>
                <span className={`font-semibold ${amountColor}`}>
                    {amount.toLocaleString("en-US", {
                        style: "currency",
                        currency: "INR",
                    })}
                </span>
            </div>
            <div className="flex justify-between items-center">
                <div className="text-cyan-500 mb-2">
                    <span>{village}</span>
                </div>
                <div className="text-gray-400 text-sm font-bold">
                    {lastUpdated}
                </div>
            </div>
        </div>
    );
};

export default UserInfoCard;
