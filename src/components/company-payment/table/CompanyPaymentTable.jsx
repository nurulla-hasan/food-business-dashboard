import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { CheckCheck, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getStatusVariant } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const CompanyPaymentTable = ({ data, page, limit, onCheck, onView }) => {
    const { t } = useTranslation('company_payment');
    return (
        <ScrollArea className="w-[calc(100vw-32px)] overflow-hidden overflow-x-auto md:w-full rounded-lg whitespace-nowrap">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('table.sn')}</TableHead>
                        <TableHead>{t('table.name')}</TableHead>
                        <TableHead>{t('table.total_order')}</TableHead>
                        <TableHead>{t('table.month')}</TableHead>
                        <TableHead>{t('table.total_price')}</TableHead>
                        <TableHead>{t('table.payment_status')}</TableHead>
                        <TableHead className="text-right">{t('table.action')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={`${item.email}-${index}`}>
                            <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>{item.totalOrder}</TableCell>
                            <TableCell>{item.month}</TableCell>
                            <TableCell>{item.totalPrice}</TableCell>
                            <TableCell>
                                <Badge variant={getStatusVariant(item.totalOrder === 0 ? "N/A" : item.paymentStatus)} className="capitalize">
                                    {item.totalOrder === 0 ? t('table.not_available') : item.paymentStatus}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button
                                    disabled={item.paymentStatus === "Paid"}
                                    variant="outline"
                                    size="icon"
                                    onClick={() => onCheck?.(item)}
                                >
                                    <CheckCheck />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => onView?.(item)}
                                >
                                    <Eye />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </ScrollArea>
    );
};

export default CompanyPaymentTable;