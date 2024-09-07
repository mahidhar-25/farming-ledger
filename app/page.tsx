import DashBoard from "@/components/DashBoard";
import SaleForm from "@/components/SaleForm";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div>
            {/* <DashBoard />

            <div className="flex flex-row justify-center mx-5 mt-2">
                <Button className="w-1/2 mx-2 text-lg p-3">Recive</Button>
                <Button className="w-1/2 mx-2 text-lg p-3">Sale</Button>
            </div> */}
            <SaleForm />
        </div>
    );
}
