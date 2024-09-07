import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
interface DashboardCardProps {
    title: string;
    value: string;
}

export default function DashboardCard({ title, value }: DashboardCardProps) {
    return (
        <Card className="mx-3 my-3">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>{value}</CardContent>
        </Card>
    );
}
