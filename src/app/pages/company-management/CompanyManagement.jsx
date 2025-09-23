import { Suspense, useState } from "react";
import Title from "@/components/ui/Title";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import CustomPagination from "@/components/common/CustomPagination";
import PageLayout from "@/components/main-layout/PageLayout";
import {
  useGetAllCompanyQuery,
  useAddCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} from "@/redux/feature/company/company";
import CompanyManagementTable from "@/components/company-management/table/CompanyManagementTable";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { Input } from "@/components/ui/input";
import AddCompanyModal from "@/components/company-management/modal/AddCompanyModal";
import EditCompanyModal from "@/components/company-management/modal/EditCompanyModal";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import usePaginatedSearchQuery from "@/hooks/usePaginatedSearchQuery";
import Error from "@/components/common/Error";
import NoData from "@/components/common/NoData";
import { useTranslation } from "react-i18next";

const CompanyManagement = () => {
  const { t } = useTranslation('company_management');
  const {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    items: companies,
    totalPages,
    page,
    isLoading,
    isError,
  } = usePaginatedSearchQuery(useGetAllCompanyQuery,{ resultsKey: "company" });

  // Modal & Mutation state
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const [addCompanyMutation, { isLoading: addLoading }] = useAddCompanyMutation();
  const [updateCompanyMutation, { isLoading: updateLoading }] = useUpdateCompanyMutation();
  const [deleteCompanyMutation, { isLoading: deleteLoading }] = useDeleteCompanyMutation();

  // Handlers
  const handleAddCompany = async (values) => {
    try {
      await addCompanyMutation(values).unwrap();
      setAddOpen(false);
      SuccessToast(t('toast.add_success'));
    } catch (err) {
      ErrorToast(err?.data?.message);
    }
  };

  const handleEditCompany = async (values) => {
    if (!selectedClient?._id) return;
    try {
      await updateCompanyMutation({
        id: selectedClient._id,
        data: values,
      }).unwrap();
      setEditOpen(false);
      setSelectedClient(null);
      SuccessToast(t('toast.update_success'));
    } catch (err) {
      ErrorToast(err?.data?.message);
    }
  };

  const handleDeleteCompany = async () => {
    if (!selectedClient?._id) return;
    try {
      await deleteCompanyMutation(selectedClient._id).unwrap();
      setConfirmOpen(false);
      setSelectedClient(null);
      SuccessToast(t('toast.delete_success'));
    } catch (err) {
      ErrorToast(err?.data?.message);
    }
  };

  return (
    <Suspense fallback={<TableSkeleton columns={3} rows={10} />}>
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
          <Title title={t('title')} />
          <div className="flex flex-col md:flex-row md:items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-fit">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t('search_placeholder')}
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={() => setAddOpen(true)}>
              <Plus />
              {t('add_company_button')}
            </Button>
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <TableSkeleton columns={3} rows={10} />
        ) : isError ? (
          <Error msg={t('error_load')}/>
        ) : companies?.length > 0 ? (
          <CompanyManagementTable
            data={companies}
            page={page}
            limit={10}
            onEdit={(client) => {
              setSelectedClient(client);
              setEditOpen(true);
            }}
            onDelete={(client) => {
              setSelectedClient(client);
              setConfirmOpen(true);
            }}
            updateLoading={updateLoading}
            deleteLoading={deleteLoading}
          />
        ) : (
          <NoData msg={t('no_data')}/>
        )}
      </PageLayout>

      {/* Add Skill Modal */}
      <AddCompanyModal
        isOpen={addOpen}
        onOpenChange={setAddOpen}
        loading={addLoading}
        onSubmit={handleAddCompany}
      />

      {/* Edit Skill Modal */}
      <EditCompanyModal
        isOpen={editOpen}
        onOpenChange={setEditOpen}
        company={selectedClient}
        loading={updateLoading}
        onSubmit={handleEditCompany}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmOpen}
        onOpenChange={setConfirmOpen}
        title={t('confirm_delete_title')}
        description={t('confirm_delete_desc')}
        confirmText={t('delete')}
        loading={deleteLoading}
        onConfirm={handleDeleteCompany}
      />
    </Suspense>
  );
};

export default CompanyManagement;
