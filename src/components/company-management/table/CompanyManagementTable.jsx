import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash } from "lucide-react";


const CompanyManagementTable = ({ data, onEdit, onDelete, updateLoading, deleteLoading, page, limit, isActionButton = true }) => {
    return (
        <ScrollArea className="w-[calc(100vw-32px)] overflow-hidden overflow-x-auto md:w-full rounded-lg whitespace-nowrap">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>S.No</TableHead>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Plants</TableHead>
                        <TableHead>Status</TableHead>
                        {isActionButton && <TableHead className="text-right">Action</TableHead>}
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
                                <Badge variant="outline">{item.plants || "N/A"}</Badge>
                            </TableCell>
                            <TableCell><Badge variant="outline">{item.status}</Badge></TableCell>
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