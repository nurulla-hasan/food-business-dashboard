import { Suspense, useState } from "react";
import Title from "@/components/ui/Title";
import { Input } from "@/components/ui/input";
import CustomPagination from "@/components/common/CustomPagination";
import PageLayout from "@/components/main-layout/PageLayout";
import { useBlockUserMutation, useGetAllUserQuery } from "@/redux/feature/user/userApi";
import UsersTable from "@/components/users/table/UsersTable";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { Search } from "lucide-react";
import UserDetailsModal from "@/components/users/modal/UserDetailsModal";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import { useGetAllSkillQuery } from "@/redux/feature/client/clientApi";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import usePaginatedSearchQuery from "@/hooks/usePaginatedSearchQuery";
import NoData from "@/components/common/NoData";
import Error from "@/components/common/Error";

const Users = () => {
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
    } = usePaginatedSearchQuery(useGetAllUserQuery);

    const [selectedUser, setSelectedUser] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const { data: SkillData } = useGetAllSkillQuery();
    const skills = SkillData?.data?.result;

    const [toggleBanUser, { isLoading: banLoading }] = useBlockUserMutation();
    const handleToggleBanUser = async (userId) => {
        try {
            const response = await toggleBanUser(userId).unwrap();
            SuccessToast(response?.message);
            setConfirmOpen(false);
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
                    <Title title="Users" />
                    <div className="relative w-full md:w-auto">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search users..."
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
                    <Error msg="Failed to load users"/>
                ) : users?.length > 0 ? (
                    <UsersTable
                        users={users}
                        page={page}
                        limit={10}
                        banLoading={banLoading}
                        onDelete={(user) => {
                            setSelectedUser(user);
                            setConfirmOpen(true);
                        }}
                        onView={(user) => {
                            setSelectedUser(user);
                            setIsDetailsOpen(true);
                        }}
                    />
                ) : (
                    <NoData msg="No users found"/>
                )}
            </PageLayout>

            {/* User Details Modal */}
            <UserDetailsModal
                isOpen={isDetailsOpen}
                onOpenChange={setIsDetailsOpen}
                user={selectedUser}
                skills={skills}
            />

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={confirmOpen}
                onOpenChange={setConfirmOpen}
                title={`Confirm ${selectedUser?.user?.isBlocked ? 'Unblock' : 'Block'} User`}
                description={selectedUser?.name ? `Are you sure you want to ${selectedUser?.user?.isBlocked ? 'unblock' : 'block'} (${selectedUser.name})?` : `Are you sure you want to ${selectedUser?.user?.isBlocked ? 'unblock' : 'block'} this user?`}
                confirmText={selectedUser?.user?.isBlocked ? 'Unblock' : 'Block'}
                loading={banLoading}
                onConfirm={() => handleToggleBanUser(selectedUser.user._id)}
            />
        </Suspense>
    );
};

export default Users;
