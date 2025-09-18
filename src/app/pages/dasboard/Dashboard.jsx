
import DashboardStats from "@/components/dashboard/DashboardStats";
import EarningGrowthChart from "@/components/dashboard/EarningGrowthChart";
import UserGrowthChart from "@/components/dashboard/UserGrowthChart";
import ChartSkeleton from "@/components/dashboard/skeleton/ChartSkeleton";
import DashboardStatsSkeleton from "@/components/dashboard/skeleton/DashboardStatsSkeleton";
import PageLayout from "@/components/main-layout/PageLayout";
import {
    useGetDashboardEarningChartQuery,
    useGetDashboardStatsQuery,
    useGetDashboardUserChartQuery
} from "@/redux/feature/dashboard/dashboardApi";
import { Suspense, useState } from "react";

const Dashboard = () => {
    // Year State
    const [userYear, setUserYear] = useState(new Date().getFullYear());
    const [earningYear, setEarningYear] = useState(new Date().getFullYear());

    // API Queries
    const { data: dashboardStatsData, isLoading: isStatsLoading } = useGetDashboardStatsQuery();
    const { data: userGrowthData, isLoading: isUserGrowthLoading } = useGetDashboardUserChartQuery({ year: userYear });
    const { data: earningData, isLoading: isEarningLoading } = useGetDashboardEarningChartQuery({ year: earningYear });

    // Year Change Handlers
    const handleUserYearChange = (year) => setUserYear(parseInt(year));
    const handleEarningYearChange = (year) => setEarningYear(parseInt(year));

    return (
        <Suspense fallback={
            <>
                <DashboardStatsSkeleton />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                    <ChartSkeleton />
                    <ChartSkeleton />
                </div>
            </>
        }>
            <PageLayout>
                {/* Stats */}
                {isStatsLoading ? <DashboardStatsSkeleton /> : <DashboardStats data={dashboardStatsData?.data} />}

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                    {isUserGrowthLoading ?
                        <ChartSkeleton /> :
                        <UserGrowthChart
                            userGrowthChartData={userGrowthData?.data}
                            onYearChange={handleUserYearChange}
                            selectedYear={userYear}
                        />}
                    {isEarningLoading ?
                        <ChartSkeleton /> :
                        <EarningGrowthChart
                            earningGrowthChartData={earningData?.data}
                            onYearChange={handleEarningYearChange}
                            selectedYear={earningYear}
                        />}
                </div>

                {/* Table */}
                
            </PageLayout>
        </Suspense>
    );
};

export default Dashboard;
