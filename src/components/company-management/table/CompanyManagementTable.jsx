import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash } from "lucide-react";
import { useTranslation } from "react-i18next";


const CompanyManagementTable = ({ data, onEdit, onDelete, updateLoading, deleteLoading, page, limit, isActionButton = true }) => {
    const { t } = useTranslation('company_management');
    return (
        <ScrollArea className="w-[calc(100vw-32px)] overflow-hidden overflow-x-auto md:w-full rounded-lg whitespace-nowrap">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('sn')}</TableHead>
                        <TableHead>{t('company_name')}</TableHead>
                        <TableHead>{t('email')}</TableHead>
                        <TableHead>{t('phone')}</TableHead>
                        <TableHead>{t('plants')}</TableHead>
                        <TableHead>{t('status')}</TableHead>
                        {isActionButton && <TableHead className="text-right">{t('action')}</TableHead>}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((item, index) => (
                        <TableRow key={item._id}>
                            <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.phone_number}</TableCell>
                            <TableCell>
                                <Badge variant="outline">{item.plants || t('not_available')}</Badge>
                            </TableCell>
                            <TableCell><Badge variant="outline" className="capitalize">{item.status}</Badge></TableCell>
                            {isActionButton && (
                                <TableCell className="text-right space-x-2">
                                    <>
                                        <Button onClick={() => onEdit?.(item)} variant="outline" size="icon" disabled={updateLoading}>
                                            <SquarePen />
                                        </Button>
                                        <Button onClick={() => onDelete?.(item)} variant="outline" size="icon" className="text-red-500" disabled={deleteLoading}>
                                            <Trash />
                                        </Button>
                                    </>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </ScrollArea>
    );
};

export default CompanyManagementTable;