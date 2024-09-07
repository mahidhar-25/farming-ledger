"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
interface DashboardCardProps {
    title: string;
    value: string;
    routePath?: string;
    textcolor: string;
}

export default function DashboardCard({
    title,
    value,
    textcolor,
    routePath = "/",
}: DashboardCardProps) {
    const router = useRouter();
    return (
        <Card
            className="mx-3 my-3"
            onClick={() => {
                router.push(routePath);
            }}
        >
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <span className={`font-semibold ${textcolor}`}>{value}</span>
            </CardContent>
        </Card>
    );
}
