import { useParams } from "react-router-dom";
import { useGetCompanyDetailsQuery, useGetCompanyOrderQuery } from "@/redux/feature/company-payment/companyPaymentApi";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarIcon, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatDate, getInitials } from "@/lib/utils";
import usePaginatedSearchQuery from "@/hooks/usePaginatedSearchQuery";
import PageLayout from "@/components/main-layout/PageLayout";
import CustomPagination from "@/components/common/CustomPagination";
import EmployeOrderTable from "@/components/company-payment/table/EmployeOrderTable";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import Error from "@/components/common/Error";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

const CompanyPaymentDetails = () => {
    const { t } = useTranslation('company_payment');
    const { id } = useParams();
    const navigate = useNavigate();

    const [filters, setFilters] = useState({});
    // Handle Date Select
    const handleDateSelect = (date) => {
        if (!date) {
            setFilters(prev => ({
                ...Object.fromEntries(
                    Object.entries(prev).filter(([key]) => !['month', 'year', 'selectedDay'].includes(key))
                )
            }));
            return;
        }
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const selectedDay = date.getDate();
        setFilters(prev => ({
            ...prev,
            month,
            year,
            selectedDay
        }));
    };

    const { data, isLoading: companyDetailsLoading, isError: companyDetailsError } = useGetCompanyDetailsQuery(id);

    const { month, year } = filters;
    const {
        searchTerm,
        setSearchTerm,
        currentPage,
        setCurrentPage,
        items: orders,
        totalPages,
        page,
        isLoading: orderLoading,
        isError: orderError,
    } = usePaginatedSearchQuery(useGetCompanyOrderQuery, { limit: 6, resultsKey: "orders" }, { id, month, year });

    const company = data?.data?.company;
    const totalOrder = data?.data?.totalOrder || 0;
    const totalEmployers = data?.data?.totalEmployers || 0;

    if (companyDetailsLoading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-10 w-48" />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-32" />
                    ))}
                </div>
                <Skeleton className="h-64" />
            </div>
        );
    }

    if (companyDetailsError || !company) {
        return (
            <div className="text-center py-10">
                <h2 className="text-xl font-semibold mb-2">{t('details.error_loading')}</h2>
                <p className="text-muted-foreground mb-4">
                    {companyDetailsError ? t('details.failed_to_load') : t('details.not_found')}
                </p>
                <Button onClick={() => navigate(-1)} variant="outline">
                    {t('details.go_back')}
                </Button>
            </div>
        );
    }

    return (
        <PageLayout
            pagination={
                totalPages > 1 && (
                    <div className="mt-4">
                        <CustomPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                )
            }
        >
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">{t('details.back')}</span>
                    </Button>
                    <h1 className="text-xl md:text-2xl font-bold">{t('details.company_details')}</h1>
                </div>
                {/* Top Section - Cards and Company Info Side By Side */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Side - Company Information */}
                    <div className="lg:col-span-1">
                        <Card className="h-full bg-accent">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>{t('details.company_information')}</CardTitle>
                                <Badge variant={company.status === 'active' ? 'default' : 'destructive'}>
                                    {company.status}
                                </Badge>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div className="flex items-center space-x-4">
                                        <Avatar className="h-16 w-16">
                                            <AvatarImage src={company.profile_image} alt={company.name} />
                                            <AvatarFallback>{getInitials(company.name || '')}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="text-lg font-medium">{company.name}</h3>
                                            <p className="text-sm text-muted-foreground">{company.email}</p>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <h4 className="text-sm font-medium text-muted-foreground">{t('details.contact_information')}</h4>
                                            <div className="space-y-1">
                                                <p className="text-sm">{company.phone_number || 'N/A'}</p>
                                                <p className="text-sm">{company.address || 'N/A'}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="text-sm font-medium text-muted-foreground">{t('details.additional_information')}</h4>
                                            <div className="space-y-1">
                                                <p className="text-sm">
                                                    <span className="text-muted-foreground">{t('details.member_since')}</span>{' '}
                                                    {new Date(company.createdAt).toLocaleDateString()}
                                                </p>
                                                <p className="text-sm">
                                                    <span className="text-muted-foreground">{t('details.last_updated')}</span>{' '}
                                                    {new Date(company.updatedAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    {/* Right Side - Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:col-span-2">
                        <div>
                            <Card className="bg-accent">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-2xl font-bold">{t('details.total_orders')}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{totalOrder}</div>
                                    <p className="text-xs text-muted-foreground">{t('details.all_time_orders')}</p>
                                </CardContent>
                            </Card>
                        </div>
                        <div>
                            <Card className="bg-accent">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-2xl font-bold">{t('details.total_employers')}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{totalEmployers}</div>
                                    <p className="text-xs text-muted-foreground">{t('details.active_employers')}</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-start justify-end mb-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-3 w-full md:w-auto">
                        {/* Date Filter */}
                        <div className="flex items-center gap-2 relative w-full sm:w-fit">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full sm:w-[200px] justify-start text-left font-normal",
                                            !(filters.month && filters.year) && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {filters.month && filters.year
                                            ? formatDate(`${filters.year}-${filters.month}-${filters.selectedDay}`)
                                            : <span>{t('pick_date')}</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={filters.month && filters.year
                                            ? new Date(filters.year, filters.month - 1, filters.selectedDay || new Date().getDate())
                                            : null
                                        }
                                        onSelect={handleDateSelect}
                                        initialFocus
                                        defaultMonth={filters.month && filters.year
                                            ? new Date(filters.year, filters.month - 1, 1)
                                            : new Date()
                                        }
                                    />
                                </PopoverContent>
                            </Popover>
                            {filters.month && filters.year && (
                                <div
                                    className="absolute right-1 top-1/2 -translate-y-1/2 p-2 cursor-pointer"
                                    onClick={() => handleDateSelect(null)}
                                >
                                    <X size={14} />
                                </div>
                            )}
                        </div>
                        {/* Search Input */}
                        <div className="relative w-full sm:fit">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder={t('search_placeholder')}
                                className="pl-9"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                {/* Full Width Table at Bottom */}
                {
                    orderLoading ? (
                        <TableSkeleton columns={6} rows={6} />
                    ) : orderError ? (
                        <Error msg={t('details.error_load_orders')} />
                    ) : orders?.length > 0 ? (
                        <EmployeOrderTable
                            data={orders}
                            page={page}
                            limit={6}
                        />
                    ) : (
                        <p className="text-center text-muted-foreground sm:mt-[20vh]">{t('details.no_orders_found')}</p>
                    )
                }
            </div>
        </PageLayout>
    );
};

export default CompanyPaymentDetails;