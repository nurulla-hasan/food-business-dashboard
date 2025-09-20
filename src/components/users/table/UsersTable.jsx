import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Ban } from 'lucide-react';

const UsersTable = ({ data, page, limit, onBlock }) => {
    return (
        <>
            <ScrollArea className="w-[calc(100vw-32px)] overflow-hidden overflow-x-auto md:w-full rounded-lg whitespace-nowrap">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>S.N</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone Number</TableHead>
                            <TableHead>Company ID</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map((user, index) => (
                            <TableRow key={user._id}>
                                <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="border">
                                            <AvatarImage src={user.profile_image || ''} alt={user.name} />
                                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium">{user.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone_number || 'N/A'}</TableCell>
                                <TableCell className="font-mono text-xs">{user.company_id}</TableCell>
                                <TableCell>
                                    <Badge 
                                        variant={
                                            user.status === 'active' ? 'default' : 
                                            user.status === 'pending' ? 'warning' : 'destructive'
                                        }
                                    >
                                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button disabled={user.status === 'pending'} onClick={() => onBlock(user)} variant="outline" size="icon" className="text-red-500">
                                        <Ban className="h-5 w-5" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollArea>
        </>
    );
};

export default UsersTable;