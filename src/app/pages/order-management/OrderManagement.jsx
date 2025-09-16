import { Suspense, useState } from "react";
import PageLayout from "@/components/main-layout/PageLayout";
import CustomPagination from "@/components/common/CustomPagination";
import Title from "@/components/ui/Title";
import { useDeleteReportMutation, useGetAllReportQuery } from "@/redux/feature/report/reportApi";
import ReportTable from "@/components/report/table/ReportTable";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import usePaginatedSearchQuery from "@/hooks/usePaginatedSearchQuery";
import Error from "@/components/common/Error";
import NoData from "@/components/common/NoData";
const OrderManagement = () => {
  const {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    items: reports,
    totalPages,
    page,
    isLoading,
    isError,
  } = usePaginatedSearchQuery(useGetAllReportQuery);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [deleteReport, { isLoading: deleteLoading, isSuccess: deleteSuccess }] = useDeleteReportMutation();

  // Handler
  const handleDelete = async () => {
    try {
      await deleteReport(selectedReport._id).unwrap();
      if (deleteSuccess) {
        SuccessToast("Report deleted successfully");
      }
    } catch (err) {
      ErrorToast(err?.data?.message);
    }
  };

  return (
    <Suspense fallback={<div className="flex items-center justify-center h-64">Loading Report...</div>}>
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
        {/* Title and Search */}
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
          <Title title="Order Management" />
          <div className="flex flex-col md:flex-row md:items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search order..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        {
          isLoading ? (
            <TableSkeleton />
          ) : isError ? (
            <Error msg="Failed to load orders"/>
          ) : reports?.length > 0 ? (
            <ReportTable
              reports={reports}
              page={page}
              limit={10}
              deleteLoading={deleteLoading}
              onDelete={(report) => {
                setConfirmOpen(true);
                setSelectedReport(report);
              }}
            />
          ) : (
            <NoData msg="No orders found"/>
          )
        }
      </PageLayout>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmOpen}
        onOpenChange={setConfirmOpen}
        title={"Confirm Delete Order"}
        description={"Are you sure you want to delete this order?"}
        confirmText={"Delete"}
        loading={deleteLoading}
        onConfirm={handleDelete}
      />
    </Suspense>
  );
};

export default OrderManagement;