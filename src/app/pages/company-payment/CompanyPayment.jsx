import { Suspense, useState } from "react";
import Title from "@/components/ui/Title";
import PageLayout from "@/components/main-layout/PageLayout";
import CustomPagination from "@/components/common/CustomPagination";
import { CalendarIcon, ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useGetAllCompanyPaymentQuery, useUpdateCompanyPaymentMutation } from "@/redux/feature/company-payment/companyPaymentApi";
import CompanyPaymentTable from "@/components/company-payment/table/CompanyPaymentTable";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import usePaginatedSearchQuery from "@/hooks/usePaginatedSearchQuery";
import Error from "@/components/common/Error";
import NoData from "@/components/common/NoData";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import { toast } from "sonner";
import { getMonthNumber } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const CompanyPayment = () => {
  const { t } = useTranslation('company_payment');
  const navigate = useNavigate();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [filters, setFilters] = useState({});

  // Handle Date Select
  const handleDateSelect = (date) => {
    if (!date) {
      setFilters(prev => ({
        ...Object.fromEntries(
          Object.entries(prev).filter(([key]) => !['month', 'year'].includes(key))
        )
      }));
      return;
    }
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    setFilters(prev => ({
      ...prev,
      month,
      year
    }));
  };

  const { month, year } = filters;
  const {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    items: payments,
    totalPages,
    page,
    isLoading,
    isError,
  } = usePaginatedSearchQuery(useGetAllCompanyPaymentQuery, { resultsKey: "company" }, { month, year });

  const [updateCompanyPayment, { isLoading: isUpdating }] = useUpdateCompanyPaymentMutation();

  // Handle Confirm Update Payment Status
  const handleConfirmUpdatePaymentStatus = async () => {
    if (!selectedPayment?._id || !selectedPayment?.month || !selectedPayment?.year) {
      toast.error(t('toast.missing_info'));
      return;
    }

    const payload = {
      company_id: selectedPayment._id,
      status: "Paid",
      month: getMonthNumber(selectedPayment.month),
      year: selectedPayment.year,
    }
    // console.log(payload);

    try {
      const result = await updateCompanyPayment(payload).unwrap();

      if (result?.success) {
        toast.success(t('toast.update_success'));
      } else {
        throw new Error(result?.message || t('toast.update_failed'));
      }
    } catch (error) {
      console.error("Update payment error:", error);
      toast.error(error?.data?.message || t('toast.update_failed_retry'));
    } finally {
      setConfirmModalOpen(false);
    }
  }

  return (
    <Suspense fallback={<TableSkeleton columns={6} rows={10} />}>
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
        {/* Header: Title and Action Button */}
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
          <Title title={t('title')} />
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
                      ? new Date(filters.year, filters.month - 1, 1).toLocaleString('default', { month: 'long', year: 'numeric' })
                      : <span>{t('pick_date')}</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="flex items-center justify-between p-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const prevMonth = new Date(filters.year || new Date().getFullYear(), (filters.month || new Date().getMonth() + 1) - 2, 1);
                        handleDateSelect(prevMonth);
                      }}
                      className="p-2 rounded-full hover:bg-accent"
                    >
                      <ChevronLeft />
                    </Button>

                    <div className="text-sm font-medium px-4">
                      {new Date(filters.year || new Date().getFullYear(), (filters.month || new Date().getMonth() + 1) - 1, 1).toLocaleString('default', {
                        month: 'long',
                        year: 'numeric'
                      })}
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const nextMonth = new Date(filters.year || new Date().getFullYear(), (filters.month || new Date().getMonth() + 1), 1);
                        handleDateSelect(nextMonth);
                      }}
                      className="p-2 rounded-full hover:bg-accent"
                    >
                      <ChevronRight />
                    </Button>
                  </div>
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

        {/* Table */}
        {
          isLoading ? (
            <TableSkeleton />
          ) : isError ? (
            <Error msg={t('error_load_payments')} />
          ) : payments?.length > 0 ? (
            <CompanyPaymentTable
              data={payments}
              page={page}
              limit={10}
              onCheck={(payment) => {
                setSelectedPayment(payment);
                setConfirmModalOpen(true);
              }}
              onView={(payment) => {
                navigate(`/company-payment/${payment._id}`);
              }}
            />
          ) : (
            <NoData msg={t('no_payments_found')} />
          )
        }
      </PageLayout>

      <ConfirmationModal
        isOpen={confirmModalOpen}
        onConfirm={handleConfirmUpdatePaymentStatus}
        onOpenChange={setConfirmModalOpen}
        title={t('confirm_update_title')}
        description={t('confirm_update_desc', { name: selectedPayment?.name, month: selectedPayment?.month })}
        loading={isUpdating}
        confirmText={t('mark_as_paid')}
      />

    </Suspense>
  );
};

export default CompanyPayment;