import { Suspense, useState } from "react";
import PageLayout from "@/components/main-layout/PageLayout";
import CustomPagination from "@/components/common/CustomPagination";
import Title from "@/components/ui/Title";
import { useGetAllOrderQuery, useUpdateOrderMutation } from "@/redux/feature/order/orderApi";
import OrderTable from "@/components/order/table/OrderTable";
import { Calendar as CalendarIcon, X } from "lucide-react";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import usePaginatedSearchQuery from "@/hooks/usePaginatedSearchQuery";
import Error from "@/components/common/Error";
import NoData from "@/components/common/NoData";
import { toast } from "sonner";
import useDebounce from "@/hooks/usedebounce";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn, formatDate } from "@/lib/utils";
import OrderViewModal from "@/components/order/modal/OrderViewModal";

const OrderManagement = () => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [filters, setFilters] = useState({
    status: '',
    date: '',
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === 'all' ? '' : value
    }));
  };

  const handleDateSelect = (date) => {
    setFilters(prev => ({
      ...prev,
      date: date ? formatDate(date) : ''
    }));
  };

  const debouncedFilters = useDebounce(filters, 600, () => setCurrentPage(1));
  const {
    currentPage,
    setCurrentPage,
    items: orders,
    totalPages,
    page,
    isLoading,
    isError,
  } = usePaginatedSearchQuery(useGetAllOrderQuery, { resultsKey: "orders" }, debouncedFilters);

  const [updateOrder] = useUpdateOrderMutation();

  const handleStatusChange = async (orderId, status) => {
    toast.promise(
      updateOrder({ orderId, status }).unwrap(),
      {
        loading: 'Updating status...',
        success: `Order has been marked as ${status}.`,
        error: 'Failed to update order status.',
      }
    );
  };

  return (
    <Suspense fallback={<TableSkeleton rows={10} />}>
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
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
          <Title title="Order Management" />
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto mt-2 md:mt-0">
            <Select
              value={filters.status}
              onValueChange={(value) => handleFilterChange('status', value)}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="complete">Complete</SelectItem>
                <SelectItem value="cancel">Cancel</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full sm:w-[200px] justify-start text-left font-normal",
                      !filters.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.date ? formatDate(new Date(filters.date)) : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.date ? new Date(filters.date) : null}
                    onSelect={handleDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {filters.date && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDateSelect(null)}
                >
                  <span className="sr-only">Clear date</span>
                  <X />
                </Button>
              )}
            </div>
          </div>
        </div>
        {
          isLoading ? (
            <TableSkeleton rows={10} columns={8} />
          ) : isError ? (
            <Error msg="Failed to load orders" />
          ) : orders?.length > 0 ? (
            <OrderTable
              data={orders}
              page={page}
              limit={10}
              onStatusChange={handleStatusChange}
              onView={(order) => {
                setSelectedOrder(order);
                setIsViewModalOpen(true);
              }}
            />
          ) : (
            <NoData msg="No orders found" />
          )
        }
      </PageLayout>

      <OrderViewModal isOpen={isViewModalOpen} onOpenChange={setIsViewModalOpen} order={selectedOrder} />
    </Suspense>
  );
};

export default OrderManagement;