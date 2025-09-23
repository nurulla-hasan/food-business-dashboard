import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatDate, getStatusVariant } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const EmployeOrderTable = ({ data, page, limit }) => {
    const { t } = useTranslation('company_payment');
    return (
        <ScrollArea className="w-[calc(100vw-32px)] overflow-hidden overflow-x-auto md:w-full rounded-lg whitespace-nowrap border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('table.sn')}</TableHead>
                        <TableHead>{t('table.order_id')}</TableHead>
                        <TableHead>{t('table.meal_type')}</TableHead>
                        <TableHead>{t('table.date')}</TableHead>
                        <TableHead>{t('table.order_status')}</TableHead>
                        <TableHead>{t('table.payment_status')}</TableHead>
                        <TableHead className="text-right">{t('table.amount')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((order, index) => (
                        <TableRow key={order._id}>
                            <TableCell className="font-medium">{(page - 1) * limit + index + 1}</TableCell>
                            <TableCell>{order._id.slice(-6).toUpperCase()}</TableCell>
                            <TableCell>{order.mealType}</TableCell>
                            <TableCell>{formatDate(order.date)}</TableCell>
                            <TableCell>
                                <Badge variant={getStatusVariant(order.status)} className="capitalize">
                                    {order.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge variant={getStatusVariant(order.paymentStatus)} className="capitalize">
                                    {order.paymentStatus}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">৳{order.menuPrice.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </ScrollArea>
    );
};

export default EmployeOrderTable;