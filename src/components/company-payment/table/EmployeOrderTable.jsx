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

const EmployeOrderTable = ({ data, page, limit }) => {
    return (
        <ScrollArea className="w-[calc(100vw-32px)] overflow-hidden overflow-x-auto md:w-full rounded-lg whitespace-nowrap border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>S.N</TableHead>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Meal Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
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
                            <TableCell className="text-right">৳{order.menuPrice.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </ScrollArea>
    );
};

export default EmployeOrderTable;