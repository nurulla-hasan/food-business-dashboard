import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash2 } from "lucide-react";

const AdminTable = ({ admins, page, limit, onEdit, onDelete, updateLoading, deleteLoading }) => {
    return (
        <ScrollArea className="w-[calc(100vw-32px)] overflow-hidden overflow-x-auto md:w-full rounded-lg whitespace-nowrap">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>S.N</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {admins.map((admin, index) => (
                        <TableRow key={`${admin.email}-${index}`}>
                            <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                            <TableCell className="font-medium">{admin.name}</TableCell>
                            <TableCell>{admin.email}</TableCell>
                            <TableCell>{admin.phoneNumber}</TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button onClick={() => onEdit?.(admin)} variant="outline" size="icon" disabled={updateLoading}>
                                    <SquarePen />
                                </Button>
                                <Button onClick={() => onDelete?.(admin)} variant="outline" size="icon" className="text-red-500 hover:text-red-600" disabled={deleteLoading}>
                                    <Trash2 className="h-5 w-5" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </ScrollArea>
    );
};

export default AdminTable;