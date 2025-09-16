
import { useGetDashboardStatsQuery } from "@/redux/feature/dashboard/dashboardApi";
import { CircleDollarSign, HandHeart, UserX, Users } from "lucide-react";

const StatCard = ({ icon, title, value, containerClassName }) => (
    <div className={`p-6 rounded-lg shadow-lg ${containerClassName}`}>
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-muted-foreground">{title}</p>
                <p className="text-3xl font-bold">{value}</p>
            </div>
            <div className="bg-background p-4 rounded-full">
                {icon}
            </div>
        </div>
    </div>
);

const DashboardStats = () => {
    const { data } = useGetDashboardStatsQuery();
    const stats = data?.data;

    const statsData = [
        {
            icon: <CircleDollarSign className="h-6 w-6 " />,
            title: "Total Donation",
            value: stats?.totalDonationAmount || 0,
            containerClassName: "bg-card"
        },
        {
            icon: <Users className="h-6 w-6 " />,
            title: "Total User",
            value: stats?.totalUser || 0,
            containerClassName: "bg-card"
        },
        {
            icon: <HandHeart className="h-6 w-6 " />,
            title: "Total Donor",
            value: stats?.totalDonors || 0,
            containerClassName: "bg-card"
        },
        {
            icon: <UserX className="h-6 w-6 text-destructive" />,
            title: "Blocked account",
            value: stats?.totalBlockAccount || 0,
            containerClassName: "bg-card"
        }
    ];

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {statsData.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    );
};

export default DashboardStats;
