"use client";
import AddFarmer from "./AddFramer";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
export default () => {
    const router = useRouter();
    return (
        <div>
            <div className="flex flex-row justify-center mx-5 my-2">
                <Button
                    className="w-1/2 mx-2 text-lg p-3 bg-green-500"
                    onClick={() => {
                        router.push("/saleform");
                    }}
                >
                    Sale
                </Button>
                <Button
                    className="w-1/2 mx-2 text-lg p-3 bg-red-500"
                    onClick={() => {
                        router.push("/receiveform");
                    }}
                >
                    Recive
                </Button>
            </div>
            <AddFarmer />
        </div>
    );
};
