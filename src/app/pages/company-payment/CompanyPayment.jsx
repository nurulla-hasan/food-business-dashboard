import { Suspense, useState } from "react";
import Title from "@/components/ui/Title";
import PageLayout from "@/components/main-layout/PageLayout";
import CustomPagination from "@/components/common/CustomPagination";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AdminTable from "@/components/admin/table/AdminTable";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { Button } from "@/components/ui/button";
import { useAddAdminMutation, useDeleteAdminMutation, useGetAllAdminQuery, useUpdateAdminMutation } from "@/redux/feature/admin/adminApi";
import AddAdminModal from "@/components/admin/modal/AddAdminModal";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import EditAdminModal from "@/components/admin/modal/EditAdminModal";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import usePaginatedSearchQuery from "@/hooks/usePaginatedSearchQuery";
import Error from "@/components/common/Error";
import NoData from "@/components/common/NoData";

const CompanyPayment = () => {
  const {
          searchTerm,
          setSearchTerm,
          currentPage,
          setCurrentPage,
          items: admins,
          totalPages,
          page,
          isLoading,
          isError,
        } = usePaginatedSearchQuery(useGetAllAdminQuery);

  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [addAdminMutation, { isLoading: addLoading, isSuccess: addSuccess }] = useAddAdminMutation();
  const [updateAdminMutation, { isLoading: updateLoading, isSuccess: updateSuccess }] = useUpdateAdminMutation();
  const [deleteAdminMutation, { isLoading: deleteLoading, isSuccess: deleteSuccess }] = useDeleteAdminMutation();

  // Handlers
  const handleAddAdmin = async (data) => {
    try {
      await addAdminMutation(data).unwrap();
      if (addSuccess) {
        setAddOpen(false);
        SuccessToast("Admin added successfully")
      }
    } catch (err) {
      ErrorToast(err?.data?.message)
    }
  }

  const handleEditAdmin = async (data) => {
    try {
      await updateAdminMutation({ id: selectedAdmin._id, data }).unwrap();
      if (updateSuccess) {
        setEditOpen(false);
        setSelectedAdmin(null);
        SuccessToast("Admin updated successfully")
      }
    } catch (err) {
      ErrorToast(err?.data?.message)
    }
  }

  const handleDeleteAdmin = async () => {
    try {
      await deleteAdminMutation(selectedAdmin._id).unwrap();
      if (deleteSuccess) {
        setConfirmOpen(false);
        setSelectedAdmin(null);
        SuccessToast("Admin deleted successfully")
      }
    } catch (err) {
      ErrorToast(err?.data?.message)
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
          <Title title="Company Payment" />
          <div className="flex flex-col md:flex-row md:items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search payment..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={() => setAddOpen(true)}>
              <Plus />
              Add Payment
            </Button>
          </div>
        </div>

        {/* Table */}
        {
          isLoading ? (
            <TableSkeleton />
          ) : isError ? (
            <Error msg="Failed to load payments"/>
          ) : admins?.length > 0 ? (
            <AdminTable
              admins={admins}
              page={page}
              limit={10}
              updateLoading={updateLoading}
              deleteLoading={deleteLoading}
              onEdit={(admin) => {
                setSelectedAdmin(admin);
                setEditOpen(true);
              }}
              onDelete={(admin) => {
                setSelectedAdmin(admin);
                setConfirmOpen(true);
              }}
            />
          ) : (
            <NoData msg="No payments found"/>
          )
        }
      </PageLayout>
      
      {/* Add Admin Modal */}
      <AddAdminModal
        isOpen={addOpen}
        onOpenChange={setAddOpen}
        loading={addLoading}
        onSubmit={handleAddAdmin}
      />
      {/* Edit Admin Modal */}
      <EditAdminModal
        isOpen={editOpen}
        onOpenChange={setEditOpen}
        loading={updateLoading}
        onSubmit={handleEditAdmin}
        admin={selectedAdmin}
      />
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmOpen}
        onOpenChange={setConfirmOpen}
        loading={deleteLoading}
        title="Delete Payment"
        description="Are you sure you want to delete this payment?"
        confirmText="Delete"
        onConfirm={handleDeleteAdmin}
      />
    </Suspense>
  );
};

export default CompanyPayment;