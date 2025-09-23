
import { DollarSign, ListOrdered, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

const StatCard = ({ icon, title, value, containerClassName }) => (
    <div className={`p-6 rounded-lg bg-sidebar ${containerClassName}`}>
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-muted-foreground">{title}</p>
                <p className="text-3xl font-bold">{value}</p>
            </div>
            <div className="bg-green-500 dark:bg-green-800 p-4 rounded-full">
                {icon}
            </div>
        </div>
    </div>
);

const DashboardStats = ({ data: stats }) => {
    const { t } = useTranslation('dashboard');

    const statsData = [
        {
            icon: <Users className="h-6 w-6 " />,
            title: t('total_company'),
            value: stats?.totalCompanies || 0,
            containerClassName: "bg-card"
        },
        {
            icon: <Users className="h-6 w-6 " />,
            title: t('total_employer'),
            value: stats?.totalEmployers || 0,
            containerClassName: "bg-card"
        },
        {
            icon: <DollarSign className="h-6 w-6 " />,
            title: t('total_income'),
            value: stats?.totalIncome || 0,
            containerClassName: "bg-card"
        },
        {
            icon: <ListOrdered className="h-6 w-6" />,
            title: t('total_order'),
            value: stats?.totalOrders || 0,
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
