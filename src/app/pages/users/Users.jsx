import { Suspense, useState } from "react";
import Title from "@/components/ui/Title";
import { Input } from "@/components/ui/input";
import CustomPagination from "@/components/common/CustomPagination";
import PageLayout from "@/components/main-layout/PageLayout";
import { useActivateUserMutation, useBlockUserMutation, useGetAllUserQuery } from "@/redux/feature/user/userApi";
import UsersTable from "@/components/users/table/UsersTable";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { Search } from "lucide-react";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import NoData from "@/components/common/NoData";
import Error from "@/components/common/Error";
import usePaginatedSearchQuery from "@/hooks/usePaginatedSearchQuery";
import { useTranslation } from "react-i18next";

const Users = () => {
    const { t } = useTranslation('users');
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmActivateOpen, setConfirmActivateOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const {
        searchTerm,
        setSearchTerm,
        currentPage,
        setCurrentPage,
        items: users,
        totalPages,
        page,
        isLoading: usersLoading,
        isError: usersError,
    } = usePaginatedSearchQuery(useGetAllUserQuery, { resultsKey: "employers" });

    const [toggleBanUser, { isLoading: banLoading }] = useBlockUserMutation();
    const [activateUser, { isLoading: activateLoading }] = useActivateUserMutation();

    const handleToggleBanUser = async (selectedUser) => {
        const payload = {
            role: "EMPLOYER",
            email: selectedUser.email,
            is_block: !selectedUser?.authId?.is_block
        }
        try {
            const response = await toggleBanUser(payload).unwrap();
            SuccessToast(response?.message);
            setConfirmOpen(false);
        } catch (error) {
            ErrorToast(error?.data?.message);
        }
    };

    const handleActivateUser = async (selectedUser) => {
        try {
            const response = await activateUser(selectedUser._id).unwrap();
            SuccessToast(response?.message);
            setConfirmActivateOpen(false);
        } catch (error) {
            ErrorToast(error?.data?.message);
        }
    };

    return (
        <Suspense
            fallback={
                <TableSkeleton />
            }
        >
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
                    <div className="relative w-full md:w-auto">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder={t('search_placeholder')}
                            className="pl-10 w-full md:w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                {/* Table */}
                {usersLoading ? (
                    <TableSkeleton />
                ) : usersError ? (
                    <Error msg={t('error_load')} />
                ) : users?.length > 0 ? (
                    <UsersTable
                        data={users}
                        page={page}
                        limit={10}
                        onBlock={(user) => {
                            setConfirmOpen(true);
                            setSelectedUser(user);
                        }}
                        onActivate={(user) => {
                            setConfirmActivateOpen(true);
                            setSelectedUser(user);
                        }}
                    />
                ) : (
                    <NoData msg={t('no_data')} />
                )}
            </PageLayout>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={confirmOpen}
                onOpenChange={setConfirmOpen}
                title={t(selectedUser?.authId?.is_block ? 'confirm_unblock_title' : 'confirm_block_title')}
                description={selectedUser?.name ? t(selectedUser?.authId?.is_block ? 'confirm_unblock_desc' : 'confirm_block_desc', { name: selectedUser.name }) : t(selectedUser?.authId?.is_block ? 'confirm_unblock_desc_no_name' : 'confirm_block_desc_no_name')}
                confirmText={t(selectedUser?.authId?.is_block ? 'unblock' : 'block')}
                loading={banLoading}
                onConfirm={() => handleToggleBanUser(selectedUser)}
            />

            {/* Confirmation Modal for Activate */}
            <ConfirmationModal
                isOpen={confirmActivateOpen}
                onOpenChange={setConfirmActivateOpen}
                title={t('confirm_activate_title')}
                description={selectedUser?.name ? t('confirm_activate_desc', { name: selectedUser.name }) : t('confirm_activate_desc_no_name')}
                confirmText={t('activate')}
                loading={activateLoading}
                onConfirm={() => handleActivateUser(selectedUser)}
            />
        </Suspense>
    );
};

export default Users;
