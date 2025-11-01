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
import { Ban, Check } from 'lucide-react';
import { useTranslation } from "react-i18next";

const UsersTable = ({ data, page, limit, onBlock, onActivate }) => {
    const { t } = useTranslation('users');
    return (
        <>
            <ScrollArea className="w-[calc(100vw-32px)] overflow-hidden overflow-x-auto md:w-full rounded-lg whitespace-nowrap">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t('sn')}</TableHead>
                            <TableHead>{t('name')}</TableHead>
                            <TableHead>{t('email')}</TableHead>
                            <TableHead>{t('phone_number')}</TableHead>
                            <TableHead>{t('company_id')}</TableHead>
                            <TableHead>{t('status')}</TableHead>
                            <TableHead className="text-right">{t('action')}</TableHead>
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
                                <TableCell>{user.phone_number || t('not_available_long')}</TableCell>
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
                                    {user.status === 'pending' ? (
                                        <Button onClick={() => onActivate(user)} variant="outline" size="icon" className="text-green-500">
                                            <Check className="h-5 w-5" />
                                        </Button>
                                    ) : (
                                        <Button onClick={() => onBlock(user)} variant="outline" size="icon" className="text-red-500">
                                            <Ban className="h-5 w-5" />
                                        </Button>
                                    )}
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