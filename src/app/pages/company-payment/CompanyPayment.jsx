import { Suspense } from "react";
import Title from "@/components/ui/Title";
import PageLayout from "@/components/main-layout/PageLayout";
import CustomPagination from "@/components/common/CustomPagination";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useGetAllCompanyPaymentQuery } from "@/redux/feature/company-payment/companyPaymentApi";
import CompanyPaymentTable from "@/components/company-payment/table/CompanyPaymentTable";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import usePaginatedSearchQuery from "@/hooks/usePaginatedSearchQuery";
import Error from "@/components/common/Error";
import NoData from "@/components/common/NoData";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import CompanyPaymentViewModal from "@/components/company-payment/modal/CompanyPaymentViewModal";

const CompanyPayment = () => {
  // const [selectedPayment, setSelectedPayment] = useState(null);
  // const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const navigate = useNavigate();
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
  } = usePaginatedSearchQuery(useGetAllCompanyPaymentQuery, { resultsKey: "company" });


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
          <Title title="Company Payment" />
          <div className="flex flex-col md:flex-row md:items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:fit">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search payment..."
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
            <Error msg="Failed to load payments" />
          ) : payments?.length > 0 ? (
            <CompanyPaymentTable
              data={payments}
              page={page}
              limit={10}
            onView={(payment) => {
              navigate(`/company-payment/${payment._id}`);
            }}
            />
          ) : (
            <NoData msg="No payments found" />
          )
        }
      </PageLayout>
      {/* 
      <CompanyPaymentViewModal
        selectedPayment={selectedPayment}
        isOpen={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
      /> */}
    </Suspense>
  );
};

export default CompanyPayment;