
import CompanyManagementTable from "@/components/company-management/table/CompanyManagementTable";
import DashboardStats from "@/components/dashboard/DashboardStats";
import EarningGrowthChart from "@/components/dashboard/EarningGrowthChart";
import UserGrowthChart from "@/components/dashboard/UserGrowthChart";
import ChartSkeleton from "@/components/dashboard/skeleton/ChartSkeleton";
import DashboardStatsSkeleton from "@/components/dashboard/skeleton/DashboardStatsSkeleton";
import PageLayout from "@/components/main-layout/PageLayout";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { Button } from "@/components/ui/button";
import usePaginatedSearchQuery from "@/hooks/usePaginatedSearchQuery";
import { useGetAllCompanyQuery } from "@/redux/feature/company/company";
import {
    useGetDashboardEarningChartQuery,
    useGetDashboardStatsQuery,
    useGetDashboardUserChartQuery
} from "@/redux/feature/dashboard/dashboardApi";
import { MoveRight } from "lucide-react";
import { Suspense, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    // Year State
    const [userYear, setUserYear] = useState(new Date().getFullYear());
    const [earningYear, setEarningYear] = useState(new Date().getFullYear());

    // API Queries
    const { data: dashboardStatsData, isLoading: isStatsLoading } = useGetDashboardStatsQuery();
    const { data: userGrowthData, isLoading: isUserGrowthLoading } = useGetDashboardUserChartQuery({ year: userYear });
    const { data: earningData, isLoading: isEarningLoading } = useGetDashboardEarningChartQuery({ year: earningYear });

    const {
        items: companies,
        page,
        isLoading,
        isError,
    } = usePaginatedSearchQuery(useGetAllCompanyQuery, { limit: 4, resultsKey: "company" });

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
                <div className="mt-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Recent Companies</h3>
                        <Link 
                            to="/company-management" 
                            className="text-primary hover:underline text-sm font-medium"
                        >
                            <Button variant="ghost">View All <MoveRight /></Button>
                        </Link>
                    </div>
                    {
                        isLoading ?
                            <TableSkeleton columns={3} rows={4} />
                            : isError ?
                                <p className="text-center text-red-500">Failed to load companies</p>
                                : companies?.length > 0 ? (
                                    <CompanyManagementTable
                                        data={companies}
                                        onEdit={() => { }}
                                        onDelete={() => { }}
                                        updateLoading={false}
                                        deleteLoading={false}
                                        page={page}
                                        limit={4}
                                        isActionButton={false}
                                    />
                                ) : (
                                    <p className="text-center text-muted-foreground">No companies found</p>
                                )
                    }
                </div>
            </PageLayout>
        </Suspense>
    );
};

export default Dashboard;
